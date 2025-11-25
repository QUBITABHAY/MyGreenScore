'use client';

import { useEffect, useState } from 'react';
import { Target, TrendingDown, Award, Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { formatCO2e } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function GoalsPage() {
    const [userId] = useState('demo-user');
    const [activeGoal, setActiveGoal] = useState<any>(null);
    const [currentEmissions, setCurrentEmissions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        target_co2e: '',
        period: 'monthly',
    });

    useEffect(() => {
        loadGoalData();
    }, []);

    const loadGoalData = async () => {
        try {
            const [goal, stats] = await Promise.all([
                api.getActiveGoal(userId),
                api.getDashboardStats(userId),
            ]);
            setActiveGoal(goal);
            setCurrentEmissions(stats.total_co2e_kg || 0);
            setShowForm(!goal);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.target_co2e || parseFloat(formData.target_co2e) <= 0) {
            toast.error('Please enter a valid target');
            return;
        }

        try {
            await api.setGoal({
                user_id: userId,
                target_co2e: parseFloat(formData.target_co2e),
                period: formData.period,
            });
            toast.success('Goal set successfully!');
            loadGoalData();
            setShowForm(false);
            setFormData({ target_co2e: '', period: 'monthly' });
        } catch (error) {
            toast.error('Failed to set goal');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading goals...</p>
                </div>
            </div>
        );
    }

    const progress = activeGoal
        ? Math.min((currentEmissions / activeGoal.target_co2e) * 100, 100)
        : 0;

    const isOnTrack = activeGoal ? currentEmissions <= activeGoal.target_co2e : false;

    return (
        <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Your{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Sustainability Goals
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Set targets and track your progress toward reducing your carbon footprint
                    </p>
                </div>

                {/* Active Goal */}
                {activeGoal && !showForm && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Active Goal</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                        {activeGoal.period} Target
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                            >
                                Update Goal
                            </button>
                        </div>

                        {/* Progress */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">Progress</span>
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                    {progress.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isOnTrack
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                                        : 'bg-gradient-to-r from-red-500 to-orange-600'
                                        }`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Emissions</div>
                                <div className="text-2xl font-bold">{formatCO2e(currentEmissions)}</div>
                            </div>
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Target</div>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatCO2e(activeGoal.target_co2e)}
                                </div>
                            </div>
                        </div>

                        {/* Status Message */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                            {isOnTrack ? (
                                <div className="flex items-center gap-3">
                                    <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    <div>
                                        <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                                            Great job! You're on track! 🎉
                                        </div>
                                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                                            Keep up the excellent work reducing your carbon footprint.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                    <div>
                                        <div className="font-semibold text-orange-700 dark:text-orange-300">
                                            You're above your target
                                        </div>
                                        <div className="text-sm text-orange-600 dark:text-orange-400">
                                            Consider reducing emissions to meet your goal.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Goal Form */}
                {showForm && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold mb-6">
                            {activeGoal ? 'Update Your Goal' : 'Set a New Goal'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Target CO2e Emissions (kg)
                                </label>
                                <input
                                    type="number"
                                    value={formData.target_co2e}
                                    onChange={(e) => setFormData({ ...formData, target_co2e: e.target.value })}
                                    placeholder="e.g., 100"
                                    min="0.01"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    required
                                />
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Set a realistic target for your carbon emissions
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Time Period</label>
                                <select
                                    value={formData.period}
                                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                {activeGoal && (
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 px-6 py-3 bg-gray-100 dark:bg-slate-700 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    {activeGoal ? 'Update Goal' : 'Set Goal'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tips */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">Tips for Success</h3>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-3xl mb-2">🌱</div>
                            <div className="font-semibold mb-1">Start Small</div>
                            <div className="text-sm text-emerald-50">
                                Set achievable goals and gradually reduce your footprint
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="font-semibold mb-1">Track Progress</div>
                            <div className="text-sm text-emerald-50">
                                Regularly monitor your emissions to stay on track
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-3xl mb-2">🎯</div>
                            <div className="font-semibold mb-1">Stay Committed</div>
                            <div className="text-sm text-emerald-50">
                                Consistency is key to achieving your sustainability goals
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
