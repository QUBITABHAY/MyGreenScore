'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function OnboardingCheck({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isLoaded, isSignedIn, getToken } = useAuth();

    useEffect(() => {
        const checkOnboarding = async () => {
            if (!isLoaded || !isSignedIn) return;
            const publicPages = ['/', '/about', '/climate-action', '/resources', '/sign-in', '/sign-up', '/onboarding'];
            if (publicPages.includes(pathname)) return;

            try {
                const token = await getToken();
                if (!token) return;

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/user/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const user = await response.json();

                    if (!user.onboarding_completed) {
                        router.push('/onboarding');
                    }
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            }
        };

        checkOnboarding();
    }, [isLoaded, isSignedIn, pathname, router, getToken]);

    return <>{children}</>;
}
