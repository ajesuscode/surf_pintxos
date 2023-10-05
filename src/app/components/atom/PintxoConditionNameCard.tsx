"use client";
import React, { useState } from "react";
import { getPintxoColor } from "../../utils/uiUtils";
import pintxosData from "../../constants/pintxosData";

interface PintxoNameCardProps {
    currentPintxoCondition: {
        time: string;
        condition: string;
    }[];
}
function PintxoConditionNameCard({
    currentPintxoCondition,
}: PintxoNameCardProps) {
    const [pintxoOpen, setPintxoOpen] = useState<boolean>(false);

    const switchPintxoCard = (
        event: React.MouseEvent<HTMLDivElement>
    ): void => {
        event.preventDefault(); // Prevent the default behavior
        setPintxoOpen(!pintxoOpen);
    };

    const pintxoExplain = pintxosData.find(
        (pintxo) => pintxo.title === currentPintxoCondition[0].condition
    );
    return (
        <div onClick={switchPintxoCard} className="w-full flex">
            {pintxoOpen ? (
                <div
                    className={`ml-4 flex w-full h-20 justify-center items-center mx-auto rounded-sm ${pintxoExplain?.color} opacity-80 hover:opacity-100`}
                >
                    <div className="font-body text-xs text-dark">
                        {pintxoExplain?.short}
                    </div>
                </div>
            ) : (
                <div
                    className={`ml-4 flex w-full h-20 justify-center items-center mx-auto rounded-sm ${getPintxoColor(
                        currentPintxoCondition[0].condition
                    )} opacity-80 hover:opacity-100`}
                >
                    <div className="font-display text-dark">
                        {currentPintxoCondition[0].condition}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PintxoConditionNameCard;
