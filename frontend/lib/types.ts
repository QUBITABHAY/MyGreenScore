// TypeScript types matching backend models

export interface Item {
    item_name: string;
    quantity: number;
    unit: string;
}

export interface AssessRequest {
    user_id: string;
    items: Item[];
}

export interface FootprintRecord {
    id: number;
    user_id: string;
    item_name: string;
    category: string | null;
    classification_confidence: number;
    quantity: number;
    unit: string;
    co2e_kg: number;
    suggestions: string[];
    created_at: string;
}

export interface CategoryResult {
    item_name: string;
    category: string;
    co2e_kg: number;
    suggestions: string[];
}

export interface AssessResponse {
    user_id: string;
    total_co2e_kg: number;
    results: CategoryResult[];
    timestamp: string;
}

export interface DashboardStats {
    total_co2e_kg: number;
    by_category: Record<string, number>;
    equivalent_km_driven: number;
}

export interface TrendDataPoint {
    date: string;
    co2e_kg: number;
}

export interface TrendsResponse {
    trends: TrendDataPoint[];
}

export interface UserGoal {
    id: number;
    user_id: string;
    target_co2e: number;
    period: string;
    start_date: string;
    end_date: string | null;
}

export interface GoalCreateRequest {
    user_id: string;
    target_co2e: number;
    period: string;
}

export interface ExportData {
    footprints: FootprintRecord[];
    goals: UserGoal[];
    preferences: any[];
    memory_logs: any[];
}
