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
    assessFootprint: async (userId: string, items: AssessRequest['items']): Promise<AssessResponse> => {
        const response = await apiClient.post('/api/assess', { user_id: userId, items });
        return response.data;
    },

    // Dashboard endpoints
    getDashboardStats: async (userId: string): Promise<DashboardStats> => {
        const response = await apiClient.get('/api/dashboard/stats', { params: { user_id: userId } });
        return response.data;
    },

    getTrends: async (userId: string, days: number = 30): Promise<TrendsResponse> => {
        const response = await apiClient.get('/api/dashboard/trends', {
            params: { user_id: userId, days },
        });
        return response.data;
    },

    // Goals endpoints
    setGoal: async (data: GoalCreateRequest): Promise<UserGoal> => {
        const response = await apiClient.post('/api/goals/', data);
        return response.data;
    },

    getActiveGoal: async (userId: string): Promise<UserGoal | null> => {
        const response = await apiClient.get('/api/goals/', { params: { user_id: userId } });
        if (response.data.message) {
            return null; // No active goal
        }
        return response.data;
    },

    // Privacy endpoints
    exportData: async (userId: string): Promise<ExportData> => {
        const response = await apiClient.get('/api/privacy/export', { params: { user_id: userId } });
        return response.data;
    },

    deleteData: async (userId: string): Promise<{ status: string; message: string }> => {
        const response = await apiClient.delete('/api/privacy/data', { params: { user_id: userId } });
        return response.data;
    },
};
