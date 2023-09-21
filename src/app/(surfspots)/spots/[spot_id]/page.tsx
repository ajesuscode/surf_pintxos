import { HourlySurfData } from "@/app/constants/types";
import NotFound from "@/app/not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/lib/database.types";
import Link from "next/link";
import { AddFavoriteIcon, ArrowBackIcon } from "@/app/components/icons/icons";
import AddToFavoriteBtn from "@/app/components/AddToFavoriteBtn";
import SpotInfoAccordeon from "@/app/components/SpotInfoAccordeon";
import { PintxoRange } from "@/app/components/PintxoRange";
import { getCurrentPintxoConditions } from "@/app/utils/surfUtils";
import { DateTime } from "luxon";
import SpotConditionsWeek from "@/app/components/SpotConditionsWeek";

async function getSpotInfo(id: string) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: spot, error } = await supabase
        .from("spot_conditions")
        .select()
        .eq("spot_id", id)
        .single();
    if (error) {
        console.log("ERROR", error.message);
    }
    return spot;
}

async function isSpotFavorite(id: string) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data, error } = await supabase
        .from("fav_spots")
        .select("*")
        .eq("spot_id", id)
        .single();
    return data;
}

export default async function SpotPage({
    params,
}: {
    params: { spot_id: string };
}) {
    const id = params.spot_id;
    const spot = await getSpotInfo(id);
    const favorite = await isSpotFavorite(id);
    const isFavorite = !!favorite;
    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
    let currentPintxoCondition: { time: string; condition: string }[] = [];

    if (spot) {
        currentPintxoCondition = getCurrentPintxoConditions(spot, currentTime);
    }

    return (
        <>
            {spot && (
                <main>
                    <div className="flex flex-row justify-start gap-4 items-center mb-4">
                        <Link href="/spots">
                            <ArrowBackIcon size={18} color="text-dark" />
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center px-4 gap-2 bg-dark/25 p-2 rounded-sm">
                        <div className="flex flex-row justify-between items-center ">
                            <div className="font-body text-light text-2xl">
                                {spot.name}
                            </div>
                            <AddToFavoriteBtn
                                spotId={id}
                                isFavorite={isFavorite}
                            />
                        </div>
                        <div className="flex flex-row gap-6 justify-start  items-center ml-2 lg:m-0 overflow-y-auto mt-4">
                            {currentPintxoCondition.map((pintxo, index) => (
                                <PintxoRange
                                    key={index}
                                    pintxoCondition={pintxo}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col justify-start w-ful gap-4">
                            <SpotConditionsWeek spot={spot} />
                            <SpotInfoAccordeon spot={spot} />
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}
