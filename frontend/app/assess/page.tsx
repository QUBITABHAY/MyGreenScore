'use client';

import { useState } from 'react';
import { Plus, Trash2, Calculator, Car, Zap, Utensils, Plane, Home, ShoppingBag } from 'lucide-react';
import { api } from '@/lib/api';
import type { Item } from '@/lib/types';
import { formatCO2e } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

type Category = 'transport' | 'energy' | 'food' | 'shopping' | 'other';

interface QuickTemplate {
    label: string;
    item_name: string;
    quantity: number;
    unit: string;
    icon: any;
}

const categoryTemplates: Record<Category, QuickTemplate[]> = {
    transport: [
        { label: 'Car Trip', item_name: 'Car trip', quantity: 10, unit: 'km', icon: Car },
        { label: 'Flight', item_name: 'Flight', quantity: 500, unit: 'km', icon: Plane },
        { label: 'Bus Ride', item_name: 'Bus ride', quantity: 5, unit: 'km', icon: Car },
    ],
    energy: [
        { label: 'Electricity', item_name: 'Electricity', quantity: 100, unit: 'kWh', icon: Zap },
        { label: 'Natural Gas', item_name: 'Natural gas', quantity: 10, unit: 'kg', icon: Home },
    ],
    food: [
        { label: 'Red Meat', item_name: 'Red Meat', quantity: 1, unit: 'kg', icon: Utensils },
        { label: 'Chicken', item_name: 'Chicken', quantity: 1, unit: 'kg', icon: Utensils },
        { label: 'Vegetables', item_name: 'Vegetables', quantity: 1, unit: 'kg', icon: Utensils },
    ],
    shopping: [
        { label: 'Clothing', item_name: 'Clothing', quantity: 1, unit: 'kg', icon: ShoppingBag },
        { label: 'Electronics', item_name: 'Electronics', quantity: 1, unit: 'kg', icon: ShoppingBag },
    ],
    other: []
};

export default function AssessPage() {
    const { getToken } = useAuth();
    const [activeCategory, setActiveCategory] = useState<Category>('transport');
    const [items, setItems] = useState<Item[]>([
        { item_name: '', quantity: 1, unit: 'kg' }
    ]);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    const addItem = () => {
        setItems([...items, { item_name: '', quantity: 1, unit: 'kg' }]);
    };

    const addTemplateItem = (template: QuickTemplate) => {
        setItems([...items, {
            item_name: template.item_name,
            quantity: template.quantity,
            unit: template.unit
        }]);
        toast.success(`Added ${template.label}`);
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
            const token = await getToken();
            if (!token) {
                toast.error('Please sign in to assess footprint');
                return;
            }
            const response = await api.assessFootprint(token, validItems);
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

    const categories = [
        { id: 'transport' as Category, label: 'Transportation', icon: Car, color: 'blue' },
        { id: 'energy' as Category, label: 'Energy', icon: Zap, color: 'yellow' },
        { id: 'food' as Category, label: 'Food', icon: Utensils, color: 'orange' },
        { id: 'shopping' as Category, label: 'Shopping', icon: ShoppingBag, color: 'purple' },
        { id: 'other' as Category, label: 'Other', icon: Plus, color: 'gray' },
    ];

    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">
                        Calculate Your{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Climate Impact
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                        Understanding your carbon footprint is the first step to reducing it.
                        Every activity has an environmental cost—let's measure yours.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
                        <span className="font-semibold">💡 Did you know?</span>
                        The average person emits ~4 tons of CO₂ per year. Small changes can reduce this by 20-30%.
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-gray-200 hover:border-emerald-300'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Add Templates */}
                {categoryTemplates[activeCategory].length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Add Common Items:</h3>
                        <div className="flex flex-wrap gap-2">
                            {categoryTemplates[activeCategory].map((template, idx) => {
                                const Icon = template.icon;
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => addTemplateItem(template)}
                                        className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors border border-emerald-200"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {template.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Assessment Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        {/* Item Name */}
                                        <div className="md:col-span-5">
                                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                                Item/Activity
                                            </label>
                                            <input
                                                type="text"
                                                value={item.item_name}
                                                onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                                                placeholder={
                                                    activeCategory === 'transport' ? 'e.g., Car trip, Flight, Train ride' :
                                                        activeCategory === 'energy' ? 'e.g., Electricity, Gas, Heating oil' :
                                                            activeCategory === 'food' ? 'e.g., Red Meat, Chicken, Rice' :
                                                                activeCategory === 'shopping' ? 'e.g., Clothing, Phone, Laptop' :
                                                                    'e.g., Any item or activity'
                                                }
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                                required
                                            />
                                        </div>

                                        {/* Quantity */}
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                                                min="0.01"
                                                step="0.01"
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                                required
                                            />
                                        </div>

                                        {/* Unit */}
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                                Unit
                                            </label>
                                            <select
                                                value={item.unit}
                                                onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                            >
                                                <optgroup label="Weight">
                                                    <option value="kg">kg</option>
                                                    <option value="g">g</option>
                                                    <option value="lbs">lbs</option>
                                                </optgroup>
                                                <optgroup label="Distance">
                                                    <option value="km">km</option>
                                                    <option value="miles">miles</option>
                                                </optgroup>
                                                <optgroup label="Energy">
                                                    <option value="kWh">kWh</option>
                                                </optgroup>
                                                <optgroup label="Volume">
                                                    <option value="liters">liters</option>
                                                    <option value="gallons">gallons</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="md:col-span-1 flex items-end">
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                disabled={items.length === 1}
                                                className="w-full p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5 mx-auto" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-slate-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                            >
                                <Plus className="w-5 h-5" />
                                Add Another Item
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Calculator className="w-5 h-5" />
                                {loading ? 'Calculating...' : 'Calculate Footprint'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results */}
                {results && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fadeIn border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Assessment Results</h2>
                            <button
                                onClick={resetForm}
                                className="text-sm text-slate-600 hover:text-emerald-600"
                            >
                                New Assessment
                            </button>
                        </div>

                        {/* Total CO2e */}
                        <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-xl p-6 text-white mb-6 shadow-lg shadow-emerald-500/20">
                            <div className="text-sm font-medium opacity-90 mb-2">Total Carbon Footprint</div>
                            <div className="text-4xl font-bold">{formatCO2e(results.total_co2e_kg)}</div>
                            <div className="text-sm opacity-90 mt-2">CO2e emissions</div>
                        </div>

                        {/* Item Results */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-slate-900">Breakdown by Item</h3>
                            {results.results && results.results.map((result: any, index: number) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="font-semibold text-slate-900">{result.item}</div>
                                            <div className="text-sm text-slate-600">
                                                Category: {result.category || 'Unknown'}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-emerald-600">
                                                {formatCO2e(result.co2e_kg)}
                                            </div>
                                        </div>
                                    </div>

                                    {result.suggestions && result.suggestions.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                            <div className="text-sm font-medium mb-2 text-slate-700">💡 Suggestions:</div>
                                            <ul className="text-sm text-slate-600 space-y-1">
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
