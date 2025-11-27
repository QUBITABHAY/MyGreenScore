'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { api } from '@/lib/api';

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

                const user = await api.getUserProfile(token);

                if (!user.onboarding_completed) {
                    router.push('/onboarding');
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            }
        };

        checkOnboarding();
    }, [isLoaded, isSignedIn, pathname, router, getToken]);

    return <>{children}</>;
}
