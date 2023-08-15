import { HourlySurfData } from "@/app/constants/types";
import NotFound from "@/app/not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/lib/database.types";

type SurfSpot = Database["public"]["Tables"]["surfspots"]["Row"];
type FullSpot = (SurfSpot & { hourlySpotForecast: HourlySurfData }) | null;

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

export default async function SpotDetails({
    params,
}: {
    params: { spot_id: string };
}) {
    const id = params.spot_id;
    const spot = await getSpotDetails(id);
    console.log("Full Spot", spot);

    return (
        <>
            {spot && (
                <main>
                    <div className="text-dark font-bold font-body text-md mb-8">
                        SpotDetails
                    </div>
                    <div className="font-body text-light text-2xl">
                        {spot.name}
                    </div>
                </main>
            )}
        </>
    );
}
