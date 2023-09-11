import { HourlySurfData } from "@/app/constants/types";
import NotFound from "@/app/not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/lib/database.types";
import Link from "next/link";
import { AddFavoriteIcon, ArrowBackIcon } from "@/app/components/icons/icons";
import AddToFavoriteBtn from "@/app/components/AddToFavoriteBtn";
import dynamic from "next/dynamic";

type SurfSpot = Database["public"]["Tables"]["surfspots"]["Row"];
type FullSpot = (SurfSpot & { hourlySpotForecast: HourlySurfData }) | null;

const PintxoMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
});

async function getSpotDetails(id: string) {
    try {
        const supabase = createServerComponentClient({ cookies });
        const { data: spot } = await supabase
            .from("surfspots")
            .select("*")
            .eq("spot_id", id);
        if (!spot || spot.length === 0) {
            throw new Error("Spot not found");
        }
        const lat = spot[0]?.lat;
        const long = spot[0]?.long;
        const res = await fetch(
            `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${long}&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period`
        );
        const hourlySpotForecast: HourlySurfData = await res.json();
        const fullSpot: FullSpot = { ...spot[0], hourlySpotForecast };
        return fullSpot;
    } catch (error) {
        console.log(error);
    }
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

export default async function SpotDetails({
    params,
}: {
    params: { spot_id: string };
}) {
    const id = params.spot_id;
    const spot = await getSpotDetails(id);
    const favorite = await isSpotFavorite(id);
    const isFavorite = !!favorite;

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
                    </div>

                    <PintxoMap lat={spot.lat} long={spot.long} />
                </main>
            )}
        </>
    );
}
