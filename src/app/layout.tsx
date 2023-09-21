import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import pintxo_lg from "@/app/components/pintxo_lg_logo.png";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./lib/database.types";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Surf Pintxos",
    description: "Community Surf forecast for all Basque country spots",
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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html lang="en">
            <body
                className={`${ouroboros.variable} ${millimetre.variable} bg-primary`}
            >
                <div>
                    <Navbar user={user} />
                </div>
                <main className="h-full w-screen">{children}</main>
            </body>
        </html>
    );
}
