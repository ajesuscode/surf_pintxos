import React from "react";
import Link from "next/link";
import NotFound from "../../not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchSpotSurfData } from "@/app/utils/surfUtils";
import type { Database } from "../../lib/database.types";
import type { SurfSpot, FullSpot, HourlySurfData } from "@/app/constants/types";
import SpotDetails from "@/app/components/SpotDetails";

async function fetchAllSpotsData(spots: SurfSpot[]): Promise<FullSpot[]> {
    try {
        const results = await Promise.all(spots.map(fetchSpotSurfData));
        return results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Ensure you return an empty array in case of an error
    }
}

export default async function SpotsList() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: spots } = await supabase.from("surfspots").select("*");

    let allSpotsData: FullSpot[] = [];

    if (spots) {
        allSpotsData = await fetchAllSpotsData(spots);
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-2 ">
                {allSpotsData &&
                    allSpotsData.map((spot) => {
                        if (spot) {
                            return (
                                <Link
                                    key={spot.spot_id}
                                    href={`spots/${spot.spot_id}`}
                                >
                                    <SpotDetails spot={spot} />
                                </Link>
                            );
                        }
                        return null; // or render an error component
                    })}
            </div>
        </>
    );
}
