'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { ChevronRight, ChevronLeft, Check, Car, Home, Utensils, ShoppingBag, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

type Step = 'welcome' | 'transport' | 'energy' | 'food' | 'lifestyle' | 'processing';

interface OnboardingData {
    // Transport
    carType: string;
    kmDriven: number;
    flights: number;

    // Energy
    houseSize: string;
    householdMembers: number;
    energySource: string;

    // Food
    dietType: string;

    // Lifestyle
    shoppingHabits: string;
}

const INITIAL_DATA: OnboardingData = {
    carType: 'petrol',
    kmDriven: 10000,
    flights: 1,
    houseSize: 'medium',
    householdMembers: 2,
    energySource: 'grid',
    dietType: 'average',
    shoppingHabits: 'average'
};

export default function OnboardingPage() {
    const router = useRouter();
    const { getToken } = useAuth();
    const [step, setStep] = useState<Step>('welcome');
    const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);

    const updateData = (field: keyof OnboardingData, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        const steps: Step[] = ['welcome', 'transport', 'energy', 'food', 'lifestyle', 'processing'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            setStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps: Step[] = ['welcome', 'transport', 'energy', 'food', 'lifestyle', 'processing'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex > 0) {
            setStep(steps[currentIndex - 1]);
        }
    };

    const finishOnboarding = async () => {
        setStep('processing');
        setLoading(true);

        try {
            const token = await getToken();
            if (!token) {
                toast.error('Please sign in to save your results');
                return;
            }

            // Convert onboarding answers to assessable items
            const items = [
                // Transport
                { item_name: `${data.carType} car driving`, quantity: data.kmDriven, unit: 'km' },
                { item_name: 'Short haul flight', quantity: data.flights * 1000, unit: 'km' }, // Approx 1000km per flight

                // Energy (Rough estimates based on house size)
                {
                    item_name: `${data.energySource} electricity`,
                    quantity: data.houseSize === 'small' ? 2000 : data.houseSize === 'large' ? 6000 : 4000,
                    unit: 'kWh'
                },

                // Food (Annual estimate)
                { item_name: `${data.dietType} diet`, quantity: 365, unit: 'days' },

                // Lifestyle
                { item_name: `${data.shoppingHabits} consumer lifestyle`, quantity: 1, unit: 'year' }
            ];

            // Filter out zero quantities
            const validItems = items.filter(i => i.quantity > 0);

            await api.assessFootprint(token, validItems);

            // Mark onboarding as complete
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/user/complete-onboarding`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success('Profile created successfully!');
            router.push('/dashboard');

        } catch (error) {
            console.error('Onboarding error:', error);
            toast.error('Something went wrong. Please try again.');
            setStep('lifestyle'); // Go back
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-green-50 pt-20 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Progress Bar */}
                {step !== 'welcome' && step !== 'processing' && (
                    <div className="mb-8">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                                style={{
                                    width: step === 'transport' ? '25%' :
                                        step === 'energy' ? '50%' :
                                            step === 'food' ? '75%' : '100%'
                                }}
                            />
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 min-h-[400px] flex flex-col justify-center relative overflow-hidden">

                    {/* Welcome Step */}
                    {step === 'welcome' && (
                        <div className="text-center space-y-6 animate-fadeIn">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🌍</span>
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900">Welcome to MyGreenScore</h1>
                            <p className="text-lg text-slate-600">
                                Let's create your environmental profile. It only takes a minute to calculate your baseline carbon footprint.
                            </p>
                            <button
                                onClick={nextStep}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-200"
                            >
                                Start Assessment <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Transport Step */}
                    {step === 'transport' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Car className="w-6 h-6" /></div>
                                <h2 className="text-2xl font-bold text-slate-900">Transportation</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">What do you drive?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'None'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => updateData('carType', type.toLowerCase())}
                                                className={`p-3 rounded-lg border text-left transition-all ${data.carType === type.toLowerCase()
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500'
                                                    : 'border-gray-200 hover:border-emerald-200'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Annual driving distance (km)</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="50000"
                                        step="1000"
                                        value={data.kmDriven}
                                        onChange={(e) => updateData('kmDriven', parseInt(e.target.value))}
                                        className="w-full accent-emerald-600"
                                    />
                                    <div className="text-right font-semibold text-emerald-600">{data.kmDriven.toLocaleString()} km</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Flights per year</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateData('flights', Math.max(0, data.flights - 1))}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                        >-</button>
                                        <span className="text-xl font-bold w-8 text-center">{data.flights}</span>
                                        <button
                                            onClick={() => updateData('flights', data.flights + 1)}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Energy Step */}
                    {step === 'energy' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Home className="w-6 h-6" /></div>
                                <h2 className="text-2xl font-bold text-slate-900">Home & Energy</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">House Size</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Small', 'Medium', 'Large'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => updateData('houseSize', size.toLowerCase())}
                                                className={`p-3 rounded-lg border text-center transition-all ${data.houseSize === size.toLowerCase()
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500'
                                                    : 'border-gray-200 hover:border-emerald-200'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">People in household</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => updateData('householdMembers', Math.max(1, data.householdMembers - 1))}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                        >-</button>
                                        <span className="text-xl font-bold w-8 text-center">{data.householdMembers}</span>
                                        <button
                                            onClick={() => updateData('householdMembers', data.householdMembers + 1)}
                                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                        >+</button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Primary Energy Source</label>
                                    <select
                                        value={data.energySource}
                                        onChange={(e) => updateData('energySource', e.target.value)}
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                                    >
                                        <option value="grid">Grid Electricity (Standard)</option>
                                        <option value="green">Green/Renewable Energy</option>
                                        <option value="gas">Natural Gas</option>
                                        <option value="solar">Solar Panels</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Food Step */}
                    {step === 'food' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Utensils className="w-6 h-6" /></div>
                                <h2 className="text-2xl font-bold text-slate-900">Diet & Food</h2>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Which best describes your diet?</label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'meat-heavy', label: 'Meat Lover', desc: 'Meat in almost every meal' },
                                        { id: 'average', label: 'Average', desc: 'Meat a few times a week' },
                                        { id: 'vegetarian', label: 'Vegetarian', desc: 'No meat, but eat eggs/dairy' },
                                        { id: 'vegan', label: 'Vegan', desc: 'No animal products at all' }
                                    ].map(diet => (
                                        <button
                                            key={diet.id}
                                            onClick={() => updateData('dietType', diet.id)}
                                            className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${data.dietType === diet.id
                                                ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                                : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-semibold ${data.dietType === diet.id ? 'text-emerald-800' : 'text-slate-800'}`}>
                                                    {diet.label}
                                                </div>
                                                <div className="text-sm text-slate-500">{diet.desc}</div>
                                            </div>
                                            {data.dietType === diet.id && <Check className="w-5 h-5 text-emerald-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lifestyle Step */}
                    {step === 'lifestyle' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><ShoppingBag className="w-6 h-6" /></div>
                                <h2 className="text-2xl font-bold text-slate-900">Lifestyle</h2>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">How would you describe your shopping habits?</label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'minimalist', label: 'Minimalist', desc: 'I only buy what I strictly need' },
                                        { id: 'average', label: 'Average', desc: 'I buy new things occasionally' },
                                        { id: 'frequent', label: 'Frequent Shopper', desc: 'I love shopping and buying new things' }
                                    ].map(habit => (
                                        <button
                                            key={habit.id}
                                            onClick={() => updateData('shoppingHabits', habit.id)}
                                            className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${data.shoppingHabits === habit.id
                                                ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                                : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-semibold ${data.shoppingHabits === habit.id ? 'text-emerald-800' : 'text-slate-800'}`}>
                                                    {habit.label}
                                                </div>
                                                <div className="text-sm text-slate-500">{habit.desc}</div>
                                            </div>
                                            {data.shoppingHabits === habit.id && <Check className="w-5 h-5 text-emerald-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Processing Step */}
                    {step === 'processing' && (
                        <div className="text-center py-12 animate-fadeIn">
                            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Calculating your footprint...</h2>
                            <p className="text-slate-600">Analyzing your lifestyle and generating your dashboard.</p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {step !== 'welcome' && step !== 'processing' && (
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 px-6 py-2.5 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>

                            {step === 'lifestyle' ? (
                                <button
                                    onClick={finishOnboarding}
                                    className="flex items-center gap-2 px-8 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                                >
                                    Finish <Check className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={nextStep}
                                    className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
