import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["600", "700", "800"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
    title: "Day Interpreting - Interpreter Database",
    description: "Day Interpreting Interpreter Database",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${poppins.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
