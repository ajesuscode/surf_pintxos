"use client";
import React, { useState } from "react";
import { RisingTideIcon, FallinTideIcon } from "../icons/icons";

interface CurrentTideProps {
    currentTide: { tide: string; time: string } | null;
}

const CurrentTide = ({ currentTide }: CurrentTideProps) => {
    return (
        <div className="flex flex-row gap-0 justify-start items-center bg-dark/50 rounded-sm p-2">
            {currentTide?.tide === "rising" ? (
                <RisingTideIcon size={20} color="text-light/50" />
            ) : (
                <FallinTideIcon size={20} color="text-light/50" />
            )}
            <span className="text-light/50 font-body text-sm pr-2">
                {currentTide?.tide || null}
            </span>
            <span className="text-light/50 font-body text-sm">
                {currentTide?.time || null}
            </span>
        </div>
    );
};

export default CurrentTide;
