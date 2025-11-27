// API client for backend communication
import axios, { AxiosError } from 'axios';
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
    timeout: 30000, // 30 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            // Request made but no response received
            console.error('Network Error: No response from server');
        } else {
            // Something else happened
            console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
    }
);

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
        try {
            const response = await apiClient.get('/api/goals/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.message) {
                return null; // No active goal
            }
            return response.data;
        } catch (error) {
            // Return null if no goal found instead of throwing
            return null;
        }
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

    // Health check endpoint
    healthCheck: async (): Promise<{ status: string; service: string }> => {
        const response = await apiClient.get('/health');
        return response.data;
    },
};
