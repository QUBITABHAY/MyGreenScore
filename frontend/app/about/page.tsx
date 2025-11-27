import { Leaf, Target, Users, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
                        About{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            MyGreenScore
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Empowering individuals to understand and reduce their environmental impact through AI-powered insights and actionable guidance.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-4">
                        Climate change is the defining challenge of our time. At MyGreenScore, we believe that individual action, when multiplied across millions of people, can create meaningful change.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Our mission is to make carbon footprint tracking simple, accessible, and actionable. We use artificial intelligence to help you understand your environmental impact and provide personalized recommendations to reduce it.
                    </p>
                </div>

                {/* What We Do */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">What We Do</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="border-l-4 border-emerald-500 pl-4">
                            <h3 className="font-semibold text-slate-900 mb-1">Track Your Impact</h3>
                            <p className="text-slate-600 text-sm">
                                Easily log your daily activities and see their carbon footprint in real-time.
                            </p>
                        </div>
                        <div className="border-l-4 border-emerald-500 pl-4">
                            <h3 className="font-semibold text-slate-900 mb-1">AI-Powered Insights</h3>
                            <p className="text-slate-600 text-sm">
                                Our intelligent system categorizes activities and provides accurate CO₂ calculations.
                            </p>
                        </div>
                        <div className="border-l-4 border-emerald-500 pl-4">
                            <h3 className="font-semibold text-slate-900 mb-1">Personalized Recommendations</h3>
                            <p className="text-slate-600 text-sm">
                                Get tailored suggestions to reduce your environmental footprint based on your lifestyle.
                            </p>
                        </div>
                        <div className="border-l-4 border-emerald-500 pl-4">
                            <h3 className="font-semibold text-slate-900 mb-1">Set and Track Goals</h3>
                            <p className="text-slate-600 text-sm">
                                Define reduction targets and monitor your progress toward a sustainable future.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why It Matters */}
                <div className="bg-linear-to-br from-emerald-600 to-green-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart className="w-8 h-8" />
                        <h2 className="text-2xl font-bold">Why It Matters</h2>
                    </div>
                    <p className="text-emerald-50 leading-relaxed mb-4">
                        The average person emits approximately 4 tons of CO₂ per year. To limit global warming to 1.5°C, we need to reduce global emissions by 45% before 2030.
                    </p>
                    <p className="text-emerald-50 leading-relaxed">
                        Every kilogram of CO₂ you reduce contributes to a healthier planet. Small changes in daily habits—choosing sustainable transport, reducing meat consumption, conserving energy—add up to significant impact when adopted by millions.
                    </p>
                </div>

                {/* Our Commitment */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Our Commitment</h2>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-4">
                        We are committed to transparency, privacy, and continuous improvement. Your data belongs to you—you can export or delete it anytime.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        We continuously update our carbon calculation models using the latest scientific research to ensure accuracy. Together, we can create a sustainable future for generations to come.
                    </p>
                </div>
            </div>
        </div>
    );
}
