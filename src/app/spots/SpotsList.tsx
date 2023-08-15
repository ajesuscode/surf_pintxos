import React from "react";
import Link from "next/link";
import NotFound from "../not-found";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../lib/database.types";

export default async function SpotsList() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: spots } = await supabase.from("surfspots").select();

    return (
        <>
            <div className="grid grid-cols-6 gap-4">
                {spots &&
                    spots?.map((spot) => (
                        <Link key={spot.spot_id} href={`spots/${spot.spot_id}`}>
                            <div className="flex flex-col justify-start p-4 bg-dark rounded-md">
                                <span className="text-light font-body font-regular text-lg">
                                    {spot.name?.slice(0, 21) ?? ""}
                                </span>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    );
}
