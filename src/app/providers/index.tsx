"use client";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
    children: React.ReactNode;
}
const theme = createTheme({
    palette: {
        mode: "light", // Використовуємо світлу тему
        background: {
            default: "#F5F5F7", // Світлий фон
            paper: "#ffffff", // Світлий фон для елементів
        },
        text: {
            primary: "#333333", // Темний текст для кращої видимості
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Toaster richColors />
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </div>
    );
}
