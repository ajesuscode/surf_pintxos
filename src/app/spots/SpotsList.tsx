import React from "react";
import Link from "next/link";
import { base } from "@/app/lib/airtable/index";
import type { SurfSpot } from "../constants/types";

async function getAllSpots() {
    const records = await base("all_spots")
        .select({
            view: "Grid view",
        })
        .firstPage();
    const res = records.map((record) => ({
        id: record.id,
        ...record.fields,
    })) as SurfSpot[];
    return res;
}

export default async function SpotsList() {
    const spots = await getAllSpots();
    return (
        <>
            <div className="grid grid-cols-6 gap-4">
                {spots &&
                    spots.map((spot) => (
                        <Link key={spot.id} href={`spots/${spot.id}`}>
                            <div className="flex flex-col justify-start p-4 bg-dark rounded-md">
                                <span className="text-light font-body font-regular text-lg">
                                    {spot.Name}
                                </span>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    );
}
