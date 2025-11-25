'use client';

import { useState } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { api } from '@/lib/api';
import type { Item } from '@/lib/types';
import { formatCO2e } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AssessPage() {
    const [userId] = useState('demo-user'); // In production, get from auth
    const [items, setItems] = useState<Item[]>([
        { item_name: '', quantity: 1, unit: 'kg' }
    ]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    const addItem = () => {
        setItems([...items, { item_name: '', quantity: 1, unit: 'kg' }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index: number, field: keyof Item, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        const validItems = items.filter(item => item.item_name.trim() !== '');
        if (validItems.length === 0) {
            toast.error('Please add at least one item');
            return;
        }

        setLoading(true);
        try {
            const response = await api.assessFootprint(userId, validItems);
            setResults(response);
            toast.success('Assessment completed!');
        } catch (error) {
            toast.error('Failed to assess footprint. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setItems([{ item_name: '', quantity: 1, unit: 'kg' }]);
        setResults(null);
    };

    return (
        <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Assess Your{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Carbon Footprint
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Add items and activities to calculate their environmental impact
                    </p>
                </div>

                {/* Assessment Form */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-2">Item/Activity</label>
                                    <input
                                        type="text"
                                        value={item.item_name}
                                        onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                                        placeholder="e.g.,  Flight, Electricity"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="w-full sm:w-32">
                                    <label className="block text-sm font-medium mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                                        min="0.01"
                                        step="0.01"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div className="w-full sm:w-32">
                                    <label className="block text-sm font-medium mb-2">Unit</label>
                                    <select
                                        value={item.unit}
                                        onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="g">g</option>
                                        <option value="lbs">lbs</option>
                                        <option value="km">km</option>
                                        <option value="miles">miles</option>
                                        <option value="kWh">kWh</option>
                                        <option value="liters">liters</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        disabled={items.length === 1}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Another Item
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Calculator className="w-5 h-5" />
                                {loading ? 'Calculating...' : 'Calculate Footprint'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                {results && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fadeIn">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Assessment Results</h2>
                            <button
                                onClick={resetForm}
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                New Assessment
                            </button>
                        </div>

                        {/* Total CO2e */}
                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white mb-6">
                            <div className="text-sm font-medium opacity-90 mb-2">Total Carbon Footprint</div>
                            <div className="text-4xl font-bold">{formatCO2e(results.total_co2e_kg)}</div>
                            <div className="text-sm opacity-90 mt-2">CO2e emissions</div>
                        </div>

                        {/* Item Results */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Breakdown by Item</h3>
                            {results.results && results.results.map((result: any, index: number) => (
                                <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="font-semibold">{result.item_name}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Category: {result.category || 'Unknown'}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-emerald-600 dark:text-emerald-400">
                                                {formatCO2e(result.co2e_kg)}
                                            </div>
                                        </div>
                                    </div>

                                    {result.suggestions && result.suggestions.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                                            <div className="text-sm font-medium mb-2">💡 Suggestions:</div>
                                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                                {result.suggestions.map((suggestion: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-emerald-500 mt-0.5">•</span>
                                                        <span>{suggestion}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
