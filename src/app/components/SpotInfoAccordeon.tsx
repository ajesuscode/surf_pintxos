"use client";
import React, { useState } from "react";
import type { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

export default function SpotInfoAccordeon({
    spot,
}: {
    spot: PintxoConditions;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            <button
                onClick={toggleOpen}
                className="font-body text-secondary border border-secondary  hover:bg-secondary/25 flex p-1 px-2 rounded-sm text-sm mb-2"
            >
                Spot Info
            </button>
            <div
                className={`bg-light/25  transition-all duration-500 ease-in-out ${
                    isOpen
                        ? "flex-grow max-h-screen opacity-100 p-4 "
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="font-body text-light text-lg">
                    {spot.about || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Best Surf: {spot.best_surf || "N/A"}
                </div>
                {/* <div className="font-body text-light text-lg">
                    Board: {spot.board || "N/A"}
                </div> */}
                <div className="font-body text-light text-lg">
                    Crowd: {spot.crowd || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Drive: <a href={spot.drive || "#"}>Directions</a>
                </div>
                <div className="font-body text-light text-lg">
                    Seabed: {spot.seabed || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Season: {spot.season || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Spot Rating: {spot.spot_rating || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Surfer: {spot.surfer || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Swell: {spot.swell || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Swell Direction: {spot.swell_direction || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Swell Handle: {spot.swell_handle || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Water Quality: {spot.water_quality || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Wave Type: {spot.wavetype || "N/A"}
                </div>
                <div className="font-body text-light text-lg">
                    Windy: <a href={spot.windy || "#"}>Windy Forecast</a>
                </div>
            </div>
        </div>
    );
}
