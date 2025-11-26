'use client';

import { useState, useEffect } from 'react';
import { Quote, Lightbulb, MessageCircle } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { api } from '@/lib/api';


export default function SustainabilityTips() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [data, setData] = useState<{ quote: string; author: string; tip: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (isLoaded && isSignedIn) {
                try {
                    const token = await getToken();
                    if (!token) return;
                    const result = await api.getDailyQuote(token);
                    setData(result);
                } catch (error) {
                    console.error("Failed to fetch quote:", error);
                    // Fallback to static data if API fails
                    setData({
                        quote: "The greatest threat to our planet is the belief that someone else will save it.",
                        author: "Robert Swan",
                        tip: "Reduce, Reuse, Recycle."
                    });
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [isLoaded, isSignedIn, getToken]); // Added getToken to dependency array for completeness

    if (loading) {
        return <div className="mt-8 text-center text-slate-600 dark:text-slate-400">Loading daily inspiration...</div>;
    }

    if (!data) return null;

    return (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Quote Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-slate-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-24 h-24 text-emerald-600" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <MessageCircle className="w-5 h-5" />
                            Daily Inspiration
                        </h3>
                        <p className="text-xl font-medium text-slate-800 dark:text-slate-200 italic mb-4">
                            "{data.quote}"
                        </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium text-right">
                        — {data.author}
                    </p>
                </div>
            </div>

            {/* Tip Card */}
            <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb className="w-24 h-24 text-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-100">
                            <Lightbulb className="w-5 h-5" />
                            Daily Tip
                        </h3>
                        <p className="text-xl font-medium leading-relaxed">
                            {data.tip}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
