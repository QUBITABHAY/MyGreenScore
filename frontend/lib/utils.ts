import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatCO2e(value: number): string {
    if (value < 1) {
        return `${(value * 1000).toFixed(0)} g`;
    } else if (value < 1000) {
        return `${value.toFixed(2)} kg`;
    } else {
        return `${(value / 1000).toFixed(2)} tonnes`;
    }
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
    }).format(value);
}
