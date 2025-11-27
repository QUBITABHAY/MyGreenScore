import { BookOpen, ExternalLink, Leaf, TrendingDown, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
    return (
        <div className="min-h-screen pt-24 bg-linear-to-br from-emerald-50 via-white to-green-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
                        Climate{' '}
                        <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Resources
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Learn more about climate change, carbon emissions, and how you can make a difference.
                    </p>
                </div>

                {/* Educational Resources */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Educational Resources</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <a
                            href="https://www.ipcc.ch/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">IPCC Reports</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                Scientific assessments on climate change from the Intergovernmental Panel on Climate Change
                            </p>
                        </a>

                        <a
                            href="https://climate.nasa.gov/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">NASA Climate</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                NASA's vital signs of the planet including data visualizations and evidence
                            </p>
                        </a>

                        <a
                            href="https://www.un.org/en/climatechange"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">UN Climate Action</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                United Nations resources on climate action and sustainable development
                            </p>
                        </a>

                        <a
                            href="https://www.carbonbrief.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">Carbon Brief</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                Science-based analysis of climate change and energy policy
                            </p>
                        </a>
                    </div>
                </div>

                {/* Carbon Calculators & Tools */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <TrendingDown className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Carbon Footprint Tools</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <h3 className="font-semibold text-slate-900 mb-2">Understanding Carbon Footprint</h3>
                            <p className="text-sm text-slate-700 mb-3">
                                A carbon footprint is the total greenhouse gas emissions caused by an individual, organization, or product.
                                It's measured in CO₂ equivalents (CO₂e) which includes other greenhouse gases like methane and nitrous oxide.
                            </p>
                            <ul className="text-sm text-slate-600 space-y-1 ml-4">
                                <li className="list-disc">Average global footprint: 4 tons CO₂e per year</li>
                                <li className="list-disc">Target for 1.5°C limit: Less than 2 tons CO₂e per year by 2030</li>
                                <li className="list-disc">Transportation typically accounts for 20-30% of individual footprints</li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Link
                                href="/assess"
                                className="p-4 border-2 border-emerald-500 rounded-xl hover:shadow-lg transition-all bg-emerald-50 group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-emerald-700 group-hover:text-emerald-600">MyGreenScore Calculator</h3>
                                    <Leaf className="w-5 h-5 text-emerald-500" />
                                </div>
                                <p className="text-sm text-slate-600">
                                    Our AI-powered calculator helps you track and reduce your carbon emissions
                                </p>
                            </Link>

                            <a
                                href="https://www.footprintcalculator.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">Global Footprint Calculator</h3>
                                    <ExternalLink className="w-4 h-4 text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-600">
                                    Comprehensive ecological footprint calculator
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Organizations & Initiatives */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Climate Organizations</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://www.climaterealityproject.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">Climate Reality Project</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                Al Gore's initiative to build a global movement for climate solutions
                            </p>
                        </a>

                        <a
                            href="https://www.350.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">350.org</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                Building a global grassroots climate movement
                            </p>
                        </a>

                        <a
                            href="https://www.worldwildlife.org/initiatives/climate"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">WWF Climate</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                World Wildlife Fund's climate change initiatives
                            </p>
                        </a>

                        <a
                            href="https://drawdown.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600">Project Drawdown</h3>
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-sm text-slate-600">
                                Research-based climate solutions and pathways
                            </p>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">MyGreenScore Pages</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <Link
                            href="/about"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
                        >
                            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-1">About Us</h3>
                            <p className="text-xs text-slate-600">Learn about our mission</p>
                        </Link>

                        <Link
                            href="/climate-action"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
                        >
                            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-1">Climate Action</h3>
                            <p className="text-xs text-slate-600">Practical steps to take</p>
                        </Link>

                        <Link
                            href="/privacy"
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
                        >
                            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-1">Privacy</h3>
                            <p className="text-xs text-slate-600">Your data, your control</p>
                        </Link>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 bg-linear-to-br from-emerald-600 to-green-600 rounded-2xl p-8 text-center shadow-xl">
                    <h3 className="text-2xl font-bold mb-2">Ready to Make a Difference?</h3>
                    <p className="text-emerald-50 mb-6">
                        Start tracking your carbon footprint today and join the fight against climate change.
                    </p>
                    <Link
                        href="/assess"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
