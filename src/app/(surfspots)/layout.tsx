import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Database } from "../lib/database.types";
import Link from "next/link";

//utils
import { getTidesData, getCurrentTide } from "../utils/surfUtils";
import { FallinTideIcon, RisingTideIcon } from "../components/icons/icons";
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
                <div className="flex flex-row gap-4 justify-start ">
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

                <div className="flex flex-row gap-0 justify-start items-center bg-dark/50 rounded-sm p-2">
                    {currentTide?.tide === "rising" ? (
                        <RisingTideIcon size={20} color="text-light/50" />
                    ) : (
                        <FallinTideIcon size={20} color="text-light/50" />
                    )}
                    <span className="text-light/50 font-body text-sm pr-2">
                        {currentTide?.tide || null}
                    </span>
                    <span className="text-light/50 font-body text-sm">
                        {currentTide?.time || null}
                    </span>
                </div>
            </div>
            {children}
        </main>
    );
}
