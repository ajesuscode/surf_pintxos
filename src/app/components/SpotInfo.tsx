"use client";
import type { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

export default function SpotInfo({ spot }: { spot: PintxoConditions }) {
    return (
        <div
            className={`flex flex-col justify-start items-center gap-2    
                `}
        >
            <div className="font-body text-light text-xs p-4 font-light border-1 border border-light/25 rounded-sm m-2 leading-relaxed">
                {spot.about || "N/A"}
            </div>
            <div className="flex flex-row justify-center mx-2 font-body text-xs text-light gap-2">
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Best Surf: {spot.best_surf || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Board: {typeof spot.board === "string" ? spot.board : "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Surfer: {spot.surfer || "N/A"}
                </div>
            </div>
            <div className="flex flex-row justify-center mx-2 font-body text-xs text-light gap-2">
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Swell Direction: {spot.swell_direction || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Swell Handle: {spot.swell_handle || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Seabed: {spot.seabed || "N/A"}
                </div>
            </div>
            <div className="flex flex-row justify-center mx-2 font-body text-xs text-light gap-2">
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Crowd: {spot.crowd || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Season: {spot.season || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Wave Type: {spot.wavetype || "N/A"}
                </div>
            </div>
            <div className="flex flex-row justify-center mx-2 font-body text-xs text-light gap-2">
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Spot Rating: {spot.spot_rating || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Water Quality: {spot.water_quality || "N/A"}
                </div>
                <div className=" border-1 border border-light/25 rounded-sm p-4">
                    Drive: <a href={spot.drive || "#"}>Directions</a>
                </div>
            </div>

            {/* <div className=" border-1 border border-light/25 rounded-sm p-4">
                Windy: <a href={spot.windy || "#"}>Windy Forecast</a>
            </div> */}
        </div>
    );
}
