import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-slate-800">
                                MyGreen<span className="text-emerald-600">Score</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track, reduce, and offset your environmental footprint with AI-powered insights.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='text-slate-600'>
                        <h3 className="font-semibold mb-4 text-slate-900">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/assess"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    Assess Footprint
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/goals"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    Set Goals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4 text-slate-900">Resources</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/climate-action"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    Climate Action
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resources"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-emerald-600 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold mb-4 text-slate-900">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-slate-500">
                    <p>© {currentYear} MyGreenScore. Built for a sustainable future. 🌍</p>
                </div>
            </div>
        </footer>
    );
}
