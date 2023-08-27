import React from "react";
import { FullSpot, TideType } from "../constants/types";
import {
    getCurrentWaveHeightForSpot,
    getCurrentPeriodForSpot,
    getTidesData,
    getCurrentTide,
} from "../utils/surfUtils";

export default async function SpotDetails({ spot }: { spot: FullSpot }) {
    let curTide = "";
    try {
        const tidesData = await getTidesData();
        curTide = await getCurrentTide(tidesData);
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
                    <span className="bg-emerald-400 w-48 h-4 rounded-sm"></span>
                </div>

                <div className="flex flex-col justify-between gap-0 ">
                    <span className="text-light font-body font-regular text-2xl">
                        {getCurrentWaveHeightForSpot(spot) || null} {"m"}
                    </span>
                    <span className="text-light font-body font-light text-lg">
                        {getCurrentPeriodForSpot(spot) || null} {"sec"}
                    </span>
                    <span className="text-light font-body font-light  text-base">
                        {curTide}
                    </span>
                </div>
            </div>
        </div>
    );
}
