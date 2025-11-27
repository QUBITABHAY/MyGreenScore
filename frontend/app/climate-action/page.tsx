import { Leaf, Zap, Droplets, Recycle, Users, TrendingDown, AlertTriangle } from 'lucide-react';

export default function ClimateActionPage() {
    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
                        Take{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Climate Action
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Practical steps you can take today to reduce your carbon footprint and fight climate change.
                    </p>
                </div>

                {/* Urgency Banner */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-amber-900 mb-2">The Time to Act is Now</h3>
                            <p className="text-sm text-amber-800">
                                We have less than 7 years to halve global emissions and avoid catastrophic climate change.
                                Every action counts, and your choices today shape tomorrow's world.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Categories */}
                <div className="space-y-6">
                    {/* Transportation */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Sustainable Transportation</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Transportation accounts for about 29% of global greenhouse gas emissions.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Walk or bike</span> for short distances instead of driving
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Use public transit</span> when possible to reduce individual emissions
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Carpool</span> to cut emissions by sharing rides
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Consider electric vehicles</span> for your next car purchase
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Energy */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Energy Conservation</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Reduce energy consumption and transition to renewable sources.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Switch to LED bulbs</span> which use 75% less energy
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Unplug devices</span> when not in use to eliminate phantom power draw
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Use programmable thermostats</span> to optimize heating and cooling
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Install solar panels</span> if feasible for renewable energy
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Food & Diet */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Sustainable Diet</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Food production contributes 26% of global greenhouse gas emissions.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Reduce meat consumption</span>, especially red meat
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Buy local and seasonal</span> produce to reduce transportation emissions
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Minimize food waste</span> by planning meals and composting
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Choose plant-based options</span> more frequently
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Waste Reduction */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Recycle className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Reduce, Reuse, Recycle</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Minimize waste and embrace circular economy principles.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Avoid single-use plastics</span> by using reusable bags and bottles
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Recycle properly</span> following local guidelines for materials
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Repair instead of replace</span> to extend product lifespans
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Buy secondhand</span> when possible to reduce manufacturing demand
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Water Conservation */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Droplets className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Water Conservation</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Conserving water also saves the energy used to process and deliver it.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Fix leaks promptly</span> to prevent water waste
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Install low-flow fixtures</span> in showers and faucets
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Take shorter showers</span> to reduce water and energy use
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Community Action */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Spread Awareness</h2>
                        </div>
                        <p className="text-slate-600 mb-4">
                            Individual action multiplied creates massive change.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Educate others</span> about climate change and solutions
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Support climate-friendly businesses</span> with your purchases
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                <div>
                                    <span className="font-semibold text-slate-900">Advocate for policy change</span> at local and national levels
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 bg-linear-to-br from-emerald-600 to-green-600 rounded-2xl p-8 text-center shadow-xl">
                    <TrendingDown className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Start Tracking Your Impact</h3>
                    <p className="text-emerald-50 mb-6">
                        Use MyGreenScore to measure your carbon footprint and track your progress as you implement these actions.
                    </p>
                    <a
                        href="/assess"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                        Calculate My Footprint
                    </a>
                </div>
            </div>
        </div>
    );
}
