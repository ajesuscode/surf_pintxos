import React from "react";
import { FullSpot, TideType } from "../constants/types";
import {
    getCurrentWaveHeightForSpot,
    getCurrentPeriodForSpot,
    getTidesData,
    getCurrentTide,
} from "../utils/surfUtils";
import getSurfConditions from "../utils/surfConditions";

export default async function SpotDetails({ spot }: { spot: FullSpot }) {
    console.log("spot", spot);
    // getting curent tide to display for every spot
    let curTide = "";
    let currentCondition: string[] = [];
    const currentTime = new Date().toISOString().slice(0, 13) + ":00";
    const timeIndex =
        spot?.hourlySpotForecast?.hourly.time.indexOf(currentTime);
    try {
        const tidesData = await getTidesData();
        curTide = await getCurrentTide(tidesData);
        const surfConditions = getSurfConditions(spot, tidesData);
        if (
            surfConditions &&
            typeof timeIndex !== "undefined" &&
            timeIndex !== -1
        ) {
            currentCondition = surfConditions
                .slice(timeIndex, timeIndex + 3)
                .map((conditionObj) => conditionObj.condition);
            console.log(currentCondition);
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
                            {currentCondition[0]}
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
