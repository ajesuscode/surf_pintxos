import React from "react";
import {
    getCurrentWaveHeightForSpot,
    getCurrentPeriodForSpot,
    getTidesData,
    getCurrentTide,
} from "../utils/surfUtils";
import { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

export default async function SpotDetails({
    spot,
}: {
    spot: PintxoConditions;
}) {
    console.log("spot", spot);
    // getting curent tide to display for every spot
    let curTide = "";
    let currentPintxoCondition: string[] = [];
    const currentTime = new Date().toISOString().slice(0, 13) + ":00";
    const timeIndex =
        spot?.hourlyspotforecast?.hourly.time.indexOf(currentTime);
    try {
        const tidesData = await getTidesData();
        curTide = await getCurrentTide(tidesData);
        const pintxoCondition = spot.pintxo;
        if (
            pintxoCondition &&
            typeof timeIndex !== "undefined" &&
            timeIndex !== -1
        ) {
            currentPintxoCondition = pintxoCondition
                .slice(timeIndex, timeIndex + 3)
                .map((conditionObj) => conditionObj?.condition);
            console.log(currentPintxoCondition);
        }
    } catch (err) {
        console.log((err as Error).message);
    }

    return (
        <div className="flex flex-col justify-start p-4 bg-dark rounded-md shadow-md">
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col justify-between gap-0 ">
                    <span className="text-light font-body font-regular text-lg">
                        {spot?.name?.slice(0, 21) ?? ""}
                    </span>
                    <div className="bg-emerald-400 w-48 h-4 rounded-sm flex flex-row items-center ">
                        <span className="text-dark font-body font-light">
                            {currentPintxoCondition[0]}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-0 ">
                    <span className="text-light font-body font-regular text-2xl">
                        {getCurrentWaveHeightForSpot(spot) || null} {"m"}
                    </span>
                    <span className="text-light font-body font-light text-lg">
                        {getCurrentPeriodForSpot(spot) || null} {"sec"}
                    </span>
                </div>
            </div>
        </div>
    );
}
