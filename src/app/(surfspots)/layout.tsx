import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Database } from "../lib/database.types";
import Link from "next/link";
import SearchPintxos from "../components/atom/SearchPintxos";

//utils
import { getTidesData, getCurrentTide } from "../utils/surfUtils";
import CurrentTide from "../components/atom/CurrentTide";

export default async function FavoriteSpotsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const tide = await getTidesData();
    let currentTide: { tide: string; time: string } | null =
        { tide: "", time: "" } || null;
    if (tide) {
        currentTide = getCurrentTide(tide);
    }

    return (
        <main className="flex flex-col p-4 pt-16 xl:p-20 h-full">
            <div className="flex flex-row justify-between gap-4 items-center sticky top-14 bg-primary py-4 z-20 w-full">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
                    <div className="flex flex-row justify-start items-center gap-4 w-full">
                        {user && (
                            <Link href="/favorite">
                                <div
                                    className={`font-body text-base lg:text-xl font-bold 
                                    text-light/50
                                    
                            `}
                                >
                                    Favorite
                                </div>
                            </Link>
                        )}
                        <Link href="/spots">
                            <div
                                className={`font-body text-base lg:text-xl font-bold 
                                    text-light/50
                                    
                            `}
                            >
                                All Pintxos
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-4 justify-end items-center">
                        <SearchPintxos />
                        <CurrentTide currentTide={currentTide} />
                    </div>
                </div>
            </div>
            {children}
        </main>
    );
}
