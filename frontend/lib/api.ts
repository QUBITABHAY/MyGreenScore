// API client for backend communication
import axios from 'axios';
import type {
    AssessRequest,
    AssessResponse,
    DashboardStats,
    TrendsResponse,
    UserGoal,
    GoalCreateRequest,
    ExportData,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    // Assess endpoints
    assessFootprint: async (token: string, items: AssessRequest['items']): Promise<AssessResponse> => {
        const response = await apiClient.post('/api/assess',
            { items },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    // Dashboard endpoints
    getDashboardStats: async (token: string): Promise<DashboardStats> => {
        const response = await apiClient.get('/api/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getTrends: async (token: string, days: number = 30): Promise<TrendsResponse> => {
        const response = await apiClient.get('/api/dashboard/trends', {
            params: { days },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Goals endpoints
    setGoal: async (token: string, data: Omit<GoalCreateRequest, 'user_id'>): Promise<UserGoal> => {
        const response = await apiClient.post('/api/goals/',
            data,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    getActiveGoal: async (token: string): Promise<UserGoal | null> => {
        const response = await apiClient.get('/api/goals/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.message) {
            return null; // No active goal
        }
        return response.data;
    },

    // Privacy endpoints
    exportData: async (token: string): Promise<ExportData> => {
        const response = await apiClient.get('/api/privacy/export', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteData: async (token: string): Promise<{ status: string; message: string }> => {
        const response = await apiClient.delete('/api/privacy/data', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Quotes
    getDailyQuote: async (token: string): Promise<{ quote: string; author: string; tip: string }> => {
        const response = await apiClient.get('/api/quotes/daily', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
};
