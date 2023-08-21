import React from "react";
import { FullSpot } from "../constants/types";
import {
    getCurrentWaveHeightForSpot,
    getCurrentPeriodForSpot,
} from "../utils/surfUtils";

export default function SpotDetails({ spot }: { spot: FullSpot }) {
    console.log();
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
                </div>
            </div>
        </div>
    );
}
