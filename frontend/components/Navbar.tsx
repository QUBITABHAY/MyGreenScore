'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/assess', label: 'Assess' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/goals', label: 'Goals' },
        { href: '/privacy', label: 'Privacy' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-emerald-100 p-1.5 rounded-lg">
                            <Leaf className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="text-xl font-bold text-slate-800">
                            MyGreen<span className="text-emerald-600">Score</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md">
                                        Sign Up
                                    </button>
                                </SignUpButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="px-4 py-2 border-t border-gray-100 mt-2 pt-4">
                            <SignedOut>
                                <div className="flex flex-col gap-2">
                                    <SignInButton mode="modal">
                                        <button className="w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="w-full text-left px-4 py-2 text-emerald-600 font-medium bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                </div>
                            </SignedOut>
                            <SignedIn>
                                <div className="px-4 py-2">
                                    <UserButton afterSignOutUrl="/" showName />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
