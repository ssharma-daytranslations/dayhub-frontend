"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PasswordProvider } from "@/contexts/PasswordContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { PasswordLogin } from "@/components/PasswordLogin";
import { usePassword } from "@/contexts/PasswordContext";

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = usePassword();
    if (!isAuthenticated) {
        return <PasswordLogin />;
    }
    return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "/api/trpc", // This might need rewrite in next.config.ts or point to absolute URL if backend is elsewhere
                    transformer: superjson,
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="light">
                    <PasswordProvider>
                        <TooltipProvider>
                            <AuthGuard>
                                {children}
                                <Toaster />
                            </AuthGuard>
                        </TooltipProvider>
                    </PasswordProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
