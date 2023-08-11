import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
    title: "Surf Pintxos",
    description: "Surf forecast for all Basque country spots",
};

const ouroboros = localFont({
    src: "../../public/fonts/Ouroboros-Regular.woff2",
    display: "swap",
    variable: "--font-ouroboros",
});

const millimetre = localFont({
    src: [
        {
            path: "../../public/fonts/Millimetre-Regular_web.woff2",
            weight: "400",
            style: "regular",
        },
        {
            path: "../../public/fonts/Millimetre-Light_web.woff2",
            weight: "100",
            style: "light",
        },
        {
            path: "../../public/fonts/Millimetre-Bold_web.woff2",
            weight: "700",
            style: "bold",
        },
        {
            path: "../../public/fonts/Millimetre-Extrablack_web.woff2",
            weight: "900",
            style: "black",
        },
    ],
    variable: "--font-millimetre",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${ouroboros.variable} ${millimetre.variable} bg-primary`}
            >
                <Navbar />
                <main className="h-full">{children}</main>
            </body>
        </html>
    );
}
