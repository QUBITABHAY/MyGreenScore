'use client';

import { useEffect, useState } from 'react';
import { Target, TrendingDown, Award, Plus, Leaf, Recycle, Users, Lightbulb, AlertTriangle, Zap, Droplets } from 'lucide-react';
import { api } from '@/lib/api';
import { formatCO2e } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

export default function GoalsPage() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [activeGoal, setActiveGoal] = useState<any>(null);
    const [currentEmissions, setCurrentEmissions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        target_co2e: '',
        period: 'monthly',
    });

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            loadGoalData();
        }
    }, [isLoaded, isSignedIn]);

    const loadGoalData = async () => {
        try {
            const token = await getToken();
            if (!token) return;

            const [goal, stats] = await Promise.all([
                api.getActiveGoal(token),
                api.getDashboardStats(token),
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
            const token = await getToken();
            if (!token) return;

            await api.setGoal(token, {
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
            <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-700">Loading goals...</p>
                </div>
            </div>
        );
    }

    const progress = activeGoal
        ? Math.min((currentEmissions / activeGoal.target_co2e) * 100, 100)
        : 0;

    const isOnTrack = activeGoal ? currentEmissions <= activeGoal.target_co2e : false;

    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">
                        Your{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Climate Commitment
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                        Set ambitious targets to reduce your carbon footprint. Every goal is a promise to protect our planet.
                        <span className="font-semibold text-emerald-600"> Your commitment matters.</span>
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-semibold">Urgent:</span> We have less than 7 years to halve global emissions and avoid climate catastrophe.
                    </div>
                </div>

                {/* Active Goal */}
                {activeGoal && !showForm && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Active Goal</h2>
                                    <p className="text-sm text-slate-600 capitalize">
                                        {activeGoal.period} Target
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                                Update Goal
                            </button>
                        </div>

                        {/* Progress */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-slate-800">Progress</span>
                                <span className="text-sm font-bold text-emerald-600">
                                    {progress.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isOnTrack
                                        ? 'bg-linear-to-r from-emerald-500 to-green-600'
                                        : 'bg-linear-to-r from-red-500 to-orange-600'
                                        }`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="text-sm text-slate-600 mb-1">Current Emissions</div>
                                <div className="text-2xl font-bold text-slate-900">{formatCO2e(currentEmissions)}</div>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <div className="text-sm text-slate-600 mb-1">Target</div>
                                <div className="text-2xl font-bold text-emerald-600">
                                    {formatCO2e(activeGoal.target_co2e)}
                                </div>
                            </div>
                        </div>

                        {/* Status Message */}
                        <div className="mt-6 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                            {isOnTrack ? (
                                <div className="flex items-center gap-3">
                                    <Award className="w-6 h-6 text-emerald-600" />
                                    <div>
                                        <div className="font-semibold text-emerald-700">
                                            Great job! You're on track!
                                        </div>
                                        <div className="text-sm text-emerald-600">
                                            Keep up the excellent work reducing your carbon footprint.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <TrendingDown className="w-6 h-6 text-orange-600" />
                                    <div>
                                        <div className="font-semibold text-orange-700">
                                            You're above your target
                                        </div>
                                        <div className="text-sm text-orange-600">
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
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">
                            {activeGoal ? 'Update Your Goal' : 'Set a New Goal'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-800">
                                    Target CO2e Emissions (kg)
                                </label>
                                <input
                                    type="number"
                                    value={formData.target_co2e}
                                    onChange={(e) => setFormData({ ...formData, target_co2e: e.target.value })}
                                    placeholder="e.g., 100"
                                    min="0.01"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                    required
                                />
                                <p className="mt-2 text-sm text-slate-600">
                                    Set a realistic target for your carbon emissions
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-800">Time Period</label>
                                <select
                                    value={formData.period}
                                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
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
                                        className="flex-1 px-6 py-3 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-slate-700"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    {activeGoal ? 'Update Goal' : 'Set Goal'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tips */}
                <div className="bg-linear-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white text-center shadow-xl shadow-emerald-500/20">
                    <h3 className="text-2xl font-bold mb-6">Actionable Steps to Reduce Impact</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors">
                            <div className="mb-3 p-2 bg-white/20 w-fit rounded-lg">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold mb-2 text-lg">Sustainable Transport</div>
                            <div className="text-sm text-emerald-50 leading-relaxed">
                                Opt for walking, cycling, or public transit whenever possible. Carpooling significantly reduces individual carbon footprints.
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors">
                            <div className="mb-3 p-2 bg-white/20 w-fit rounded-lg">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold mb-2 text-lg">Energy Efficiency</div>
                            <div className="text-sm text-emerald-50 leading-relaxed">
                                Switch to LED bulbs, unplug unused electronics, and use energy-efficient appliances to lower household consumption.
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors">
                            <div className="mb-3 p-2 bg-white/20 w-fit rounded-lg">
                                <Recycle className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold mb-2 text-lg">Reduce & Reuse</div>
                            <div className="text-sm text-emerald-50 leading-relaxed">
                                Minimize waste by choosing reusable items over single-use plastics. Recycle paper, glass, and metals correctly.
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors">
                            <div className="mb-3 p-2 bg-white/20 w-fit rounded-lg">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold mb-2 text-lg">Plant-Based Diet</div>
                            <div className="text-sm text-emerald-50 leading-relaxed">
                                Reducing meat consumption, especially red meat, can drastically lower your carbon footprint. Support local farmers.
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors">
                            <div className="mb-3 p-2 bg-white/20 w-fit rounded-lg">
                                <Droplets className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold mb-2 text-lg">Water Conservation</div>
                            <div className="text-sm text-emerald-50 leading-relaxed">
                                Fix leaks promptly and install water-saving fixtures. Conserving water also saves the energy used to process it.
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors">
                            <div className="mb-3 p-2 bg-white/20 w-fit rounded-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div className="font-bold mb-2 text-lg">Spread Awareness</div>
                            <div className="text-sm text-emerald-50 leading-relaxed">
                                Educate your community about climate change. Collective action is essential for meaningful global impact.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
