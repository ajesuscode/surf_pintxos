import { HourlySurfData, SurfSpot } from "@/app/constants/types";
import { base } from "@/app/lib/airtable/index";
import NotFound from "@/app/not-found";

type FullSpot = SurfSpot & { hourlySpotForecast: HourlySurfData };
async function getSpotDetails(id: string) {
    try {
        const record = await base("all_spots").find(id);
        const spot = record.fields as SurfSpot;
        const lat = spot.Latitude;
        const long = spot.Longitude;
        console.log(spot);
        const res = await fetch(
            `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${long}8&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period`
        );
        const hourlySpotForecast: HourlySurfData = await res.json();
        const fullSpot: FullSpot = { ...spot, hourlySpotForecast };
        return fullSpot;
    } catch (error) {
        console.log(error);
    }
}

export default async function SpotDetails({
    params,
}: {
    params: { id: string };
}) {
    const id = params.id;
    const spot = await getSpotDetails(id);

    return (
        <>
            {spot && (
                <main>
                    <div className="text-dark font-bold font-body text-md mb-8">
                        SpotDetails
                    </div>
                    <div className="font-body text-light text-2xl">
                        {spot.Name}
                    </div>
                </main>
            )}
        </>
    );
}
