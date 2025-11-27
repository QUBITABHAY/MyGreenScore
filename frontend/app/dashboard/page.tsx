'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Activity, Target as TargetIcon, Car, Globe } from 'lucide-react';
import { api } from '@/lib/api';
import { formatCO2e, formatNumber } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import SustainabilityTips from '@/components/SustainabilityTips';

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

export default function DashboardPage() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [trends, setTrends] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            loadDashboardData();
        }
    }, [isLoaded, isSignedIn]);

    const loadDashboardData = async () => {
        try {
            const token = await getToken();
            if (!token) return;

            const [statsData, trendsData] = await Promise.all([
                api.getDashboardStats(token),
                api.getTrends(token, 30),
            ]);
            setStats(statsData);
            setTrends(trendsData);
        } catch (error) {
            toast.error('Failed to load dashboard data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-700">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const categoryData = stats?.by_category
        ? Object.entries(stats.by_category).map(([name, value]) => ({
            name,
            value: value as number,
        }))
        : [];

    const trendsChartData = trends?.trends || [];

    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">
                        Your{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Environmental Impact
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-4">
                        Track your carbon emissions and see how your choices affect the planet.
                        <span className="font-semibold text-emerald-600">Every reduction matters.</span>
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                        🌍 <span className="font-semibold">Remember:</span> Limiting global warming to 1.5°C requires cutting emissions by 45% before 2030.
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Total CO2e */}
                    <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-500/20">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-sm font-medium opacity-90 mb-1">Total Emissions</div>
                                <div className="text-3xl font-bold">{formatCO2e(stats?.total_co2e_kg || 0)}</div>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="text-sm opacity-90">All-time carbon footprint</div>
                    </div>

                    {/* Earths Required - Impactful Metric */}
                    <div className={`rounded-2xl p-8 shadow-xl border-2 ${(stats?.total_co2e_kg || 0) / 2000 > 1
                        ? 'bg-white border-red-200'
                        : 'bg-white border-emerald-200'
                        }`}>
                        <div className="text-center mb-6">
                            <div className="text-sm font-medium text-slate-600 mb-2 uppercase tracking-wider">
                                If Everyone Lived Like You
                            </div>
                            <div className="flex items-baseline justify-center gap-2 mb-2">
                                <div className={`text-5xl font-bold ${(stats?.total_co2e_kg || 0) / 2000 > 1 ? 'text-red-600' : 'text-emerald-600'
                                    }`}>
                                    {((stats?.total_co2e_kg || 0) / 2000).toFixed(2)}
                                </div>
                                <div className="text-2xl font-semibold text-slate-400">Earths</div>
                            </div>
                            <div className="text-sm text-slate-500">
                                would be needed to sustain the human population
                            </div>
                        </div>

                        <div className={`mt-6 p-4 rounded-xl text-sm leading-relaxed text-center ${(stats?.total_co2e_kg || 0) / 2000 > 1 ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'
                            }`}>
                            {(stats?.total_co2e_kg || 0) / 2000 > 1 ? (
                                <>
                                    <strong>Warning:</strong> Your footprint exceeds the sustainable limit of 2 tons CO₂/year.
                                    Consider taking action to reduce your impact.
                                </>
                            ) : (
                                <>
                                    <strong>Great job!</strong> Your footprint is within sustainable limits.
                                    You are living in harmony with our planet.
                                </>
                            )}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-sm font-medium text-slate-600 mb-1">
                                    Categories
                                </div>
                                <div className="text-3xl font-bold text-slate-900">
                                    {categoryData.length}
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <TargetIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                        <div className="text-sm text-slate-500">Tracked activities</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Category Breakdown */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 text-slate-900">Emissions by Category</h2>
                        {categoryData.length > 0 ? (
                            <div className="space-y-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => formatCO2e(value)} />
                                    </PieChart>
                                </ResponsiveContainer>

                                <div className="space-y-2">
                                    {categoryData.map((item, index) => (
                                        <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                ></div>
                                                <span className="font-medium text-slate-700">{item.name}</span>
                                            </div>
                                            <span className="text-emerald-600 font-semibold">
                                                {formatCO2e(item.value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                No data yet. Start by assessing your footprint!
                            </div>
                        )}
                    </div>

                    {/* Trends Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            30-Day Trends
                        </h2>
                        {trendsChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={trendsChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12, fill: '#64748b' }}
                                        tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return `${date.getMonth() + 1}/${date.getDate()}`;
                                        }}
                                        stroke="#cbd5e1"
                                    />
                                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                                    <Tooltip
                                        formatter={(value: any) => [formatCO2e(value), 'CO2e']}
                                        labelFormatter={(label) => `Date: ${label}`}
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="co2e_kg"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10b981', r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                No trend data available yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-linear-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-center shadow-xl shadow-emerald-500/20">
                    <h3 className="text-2xl font-bold mb-2">Your Planet Needs You</h3>
                    <p className="mb-6 text-emerald-50">
                        Set ambitious goals to reduce your carbon footprint. Join the global movement to stop climate change.
                        <span className="font-semibold block mt-2">Together, we can make a difference.</span>
                    </p>
                    <a
                        href="/goals"
                        className="inline-flex items-center gap-2 px-8 py-3 text-emerald-600 rounded-full font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all bg-white"
                    >
                        Commit to Climate Action
                        <TargetIcon className="w-5 h-5" />
                    </a>
                </div>

                <SustainabilityTips />
            </div>
        </div>
    );
}
