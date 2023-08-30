import React from "react";
//external libs
import { DateTime } from "luxon";
import {
    getCurrentWaveHeightForSpot,
    getCurrentPeriodForSpot,
    getTidesData,
    getCurrentTide,
} from "../utils/surfUtils";
import { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];
type PintxoName =
    | "Empty Plate"
    | "Bread Only"
    | "Gilda"
    | "Txistorra"
    | "Gambas"
    | "Txuleta Feast";

// Render pintxo color based on a name from condition
function getPintxoColor(condition: PintxoName): string {
    switch (condition) {
        case "Empty Plate":
            console.log("condition", condition);
            return "bg-purple-400";
        case "Bread Only":
            return "bg-red-400";
        case "Gilda":
            return "bg-orange-400";
        case "Txistorra":
            return "bg-yellow-400";
        case "Gambas":
            return "bg-lime-400";
        case "Txuleta Feast":
            return "bg-green-400";
        default:
            return "bg-gray-400";
    }
}

export default async function SpotDetails({
    spot,
}: {
    spot: PintxoConditions;
}) {
    // getting curent tide to display for every spot
    let curTide = "";
    let currentPintxoCondition: string[] = [];
    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
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
                <div className="flex flex-col justify-between gap-0">
                    <span className="text-light font-body font-regular text-lg">
                        {spot?.name?.slice(0, 21) ?? ""}
                    </span>
                    <div className="flex flex-row gap-1 justify-start w-54">
                        {currentPintxoCondition.map((condition, index) => (
                            <div
                                key={index}
                                className={`${getPintxoColor(
                                    condition as PintxoName
                                )} p-1 rounded-sm flex flex-row justify-start items-center w-8`}
                            ></div>
                        ))}
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
