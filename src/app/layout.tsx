import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
    title: "Guess the hidden word! Type a word and see how close you are.",
    description: `Heat Word is an exciting word-guessing game that challenges your vocabulary and intuition!
Type any word and get feedback on how close it is to the hidden answer:
the more matches, the "hotter" you are.
Sharpen your word skills, challenge your brain, and beat your best score in this addictive game.`,
    verification: {
        google: "fBZWYXvg_WI9qzNW_W57ysZEx6fgxtBztasT2i-l5Zw",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
