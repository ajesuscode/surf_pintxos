import { HourlySurfData } from "@/app/constants/types";
import NotFound from "@/app/not-found";
import {
    User,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/lib/database.types";
import Link from "next/link";
import { AddFavoriteIcon, ArrowBackIcon } from "@/app/components/icons/icons";
import AddToFavoriteBtn from "@/app/components/AddToFavoriteBtn";
import SpotInfo from "@/app/components/SpotInfo";
import { PintxoRange } from "@/app/components/PintxoRange";
import { getCurrentPintxoConditions } from "@/app/utils/surfUtils";
import { DateTime } from "luxon";
import SpotConditionsWeek from "@/app/components/SpotConditionsWeek";

async function getUser(): Promise<User | null> {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: user } = await supabase.auth.getUser();
    return user ? user.user : null;
}

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
    const user = await getUser();
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
                <>
                    <div className="flex flex-col justify-start px-4 gap-2 bg-dark/25 rounded-sm md:px-8 md:py-4 p-4 h-full">
                        <div className="flex flex-row justify-between items-center md:mb-2">
                            <div className="font-body text-light text-2xl">
                                {spot.name}
                            </div>
                            <AddToFavoriteBtn
                                spotId={id}
                                isFavorite={isFavorite}
                                user={user}
                            />
                        </div>
                        <div className="flex flex-row gap-6 justify-start  items-center lg:m-0 overflow-y-auto my-4">
                            {currentPintxoCondition.map((pintxo, index) => (
                                <PintxoRange
                                    key={index}
                                    pintxoCondition={pintxo}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="font-body text-secondary p-1 rounded-sm text-xs mt-2">
                        Detailed Weekly Conditions
                    </div>
                    <div className="bg-dark/25 p-2">
                        <SpotConditionsWeek spot={spot} />
                    </div>
                    <div className="font-body text-secondary p-1 rounded-sm text-xs mt-2">
                        Spot Info
                    </div>
                    <div className="bg-dark/25 p-2 mb-4">
                        <SpotInfo spot={spot} />
                    </div>
                </>
            )}
        </>
    );
}
