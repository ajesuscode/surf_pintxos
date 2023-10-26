import React from "react";
import Link from "next/link";
import NotFound from "../../not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/app/lib/database.types";

import SpotDetails from "@/app/components/SpotDetails";

export default async function SpotsList() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: allSpotsData, error } = await supabase
        .from("spot_conditions")
        .select();
    if (error) {
        console.log("ERROR", error.message);
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4  md:grid-cols-2">
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
