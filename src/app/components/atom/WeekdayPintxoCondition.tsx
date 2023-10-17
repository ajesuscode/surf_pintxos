import { Pintxo } from "@/app/constants/types";
import { getWeekdayPintxoCondition } from "@/app/utils/surfUtils";
import { getPintxoColor } from "@/app/utils/uiUtils";
import React from "react";

interface WekdayPintxoProps {
    pintxo: Pintxo[] | null;
}
function WeekdayPintxoCondition({ pintxo }: WekdayPintxoProps) {
    const data = getWeekdayPintxoCondition(pintxo!);
    return (
        <div className="flex flex-row justify-between gap-1 items-center mt-6">
            {Object.keys(data).map((key, index) => (
                <div
                    key={index}
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <span className="font-body text-sm text-light/50 font-bold">
                        {key}
                    </span>
                    <div
                        className={`${getPintxoColor(
                            data[key]
                        )} h-4 w-4 rounded-full`}
                    ></div>
                </div>
            ))}
        </div>
    );
}

export default WeekdayPintxoCondition;
