import React from "react";
//external libs
import { DateTime } from "luxon";
import {
    getCurrentWaveHeightForSpot,
    getCurrentPeriodForSpot,
    getTidesData,
    getCurrentTide,
    getCurrentWind,
} from "../utils/surfUtils";
import { Database } from "../lib/database.types";
import { WaveHeightIcon, WindIcon } from "./icons/icons";
import { PintxoRange } from "./PintxoRange";
import { getCurrentPintxoConditions } from "../utils/surfUtils";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];
type PintxoName =
    | "Empty Plate"
    | "Bread Only"
    | "Gilda"
    | "Txistorra"
    | "Gambas"
    | "Txuleta Feast";

// Render pintxo color based on a name from condition
function getPintxoColor(condition: string): string {
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
    // let curTide: { tide: string; time: string } | null =
    //     { tide: "", time: "" } || null;

    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
    const currentPintxoCondition = getCurrentPintxoConditions(
        spot,
        currentTime,
        3
    );

    return (
        <div className="flex flex-col justify-start p-4 bg-dark rounded-md shadow-md">
            <div className="flex-1 flex-row justify-between gap-4">
                <div className="flex flex-col justify-start gap-4">
                    <span className="text-light font-body font-regular text-xl">
                        {spot?.name?.slice(0, 21) ?? ""}
                    </span>
                    <div className="flex flex-row gap-4 justify-start  items-start ml-2 lg:m-0 align-middle pb-4">
                        {currentPintxoCondition.map((condition, index) => (
                            <PintxoRange
                                key={index}
                                pintxoCondition={condition}
                            />
                        ))}
                        <div
                            className={`ml-4 flex w-full h-20 justify-center items-center mx-auto rounded-sm ${getPintxoColor(
                                currentPintxoCondition[0].condition
                            )} opacity-80 hover:opacity-100`}
                        >
                            <div className="font-display text-dark">
                                {currentPintxoCondition[0].condition}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-2">
                    <div className="flex flex-row gap-4  justify-start items-center bg-light/5 p-2 rounded-sm">
                        <WaveHeightIcon size={20} color="text-light" />
                        <span className="text-light font-body font-medium text-lg">
                            {getCurrentWaveHeightForSpot(spot) || null} {"m"}
                        </span>
                    </div>
                    <div className="flex flex-row gap-4  justify-start items-center bg-light/5 p-2 rounded-sm">
                        <span className="text-light font-body font-light text-lg">
                            {getCurrentPeriodForSpot(spot) || null}{" "}
                            <span className="text-xs">s.</span>
                        </span>
                    </div>
                    <div className="flex flex-row gap-4 items-center  justify-start bg-light/5 p-2 rounded-sm">
                        <WindIcon size={20} color="text-light/50" />
                        <span className="text-light font-body text-sm font-thin">
                            {getCurrentWind(spot) || null}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
