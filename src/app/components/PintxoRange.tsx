import { DateTime } from "luxon";
import { PointerIcon } from "./icons/icons";

interface PintxoCondition {
    time: string;
    condition: string;
}

interface PintxoRangeProps {
    pintxoCondition: PintxoCondition;
}

export const PintxoRange: React.FC<PintxoRangeProps> = ({
    pintxoCondition,
}) => {
    console.log("pintxoCondition", pintxoCondition);
    const utcDateTime = DateTime.fromISO(pintxoCondition.time, { zone: "utc" });
    const localDateTime = utcDateTime.toLocal().toFormat("HH:mm");
    const arrowPosition = getArrowPosition(pintxoCondition.condition);
    const arrowColor = getArrowColor(pintxoCondition.condition);

    return (
        <div className="flex flex-col gap-2 justify-center items-start">
            <div className="relative w-8 h-20 mr-4 rounded-sm  opacity-90">
                <div className="absolute inset-x-0 bottom-0 w-full h-1/6 bg-purple-400"></div>
                <div className="absolute inset-x-0 bottom-[16.6%] w-full h-1/6 bg-red-400"></div>
                <div className="absolute inset-x-0 bottom-[33.33%] w-full h-1/6 bg-orange-400"></div>
                <div className="absolute inset-x-0 bottom-[50%] w-full h-1/6 bg-yellow-400"></div>
                <div className="absolute inset-x-0 bottom-[66.66%] w-full h-1/6 bg-lime-400"></div>
                <div className="absolute inset-x-0 bottom-[83.33%] w-full h-1/6 bg-green-400"></div>

                <div
                    className={`absolute left-[95%]  bottom-[${arrowPosition}]
                `}
                >
                    <PointerIcon size={12} color={`${arrowColor}`} />
                </div>
            </div>
            <div className="font-body text-light/50 text-xs font-medium">
                {localDateTime}
            </div>
        </div>
    );
};

function getArrowPosition(condition: string): string {
    switch (condition) {
        case "Empty Plate":
            return "0%";
        case "Bread Only":
            return "16.6%";
        case "Gilda":
            return "33.33%";
        case "Txistorra":
            return "50%";
        case "Gambas":
            return "66.66%";
        case "Txuleta Feast":
            return "83.33%";
        default:
            return "100%";
    }
}

function getArrowColor(condition: string): string {
    switch (condition) {
        case "Empty Plate":
            return "text-purple-400";
        case "Bread Only":
            return "text-red-400";
        case "Gilda":
            return "text-orange-400";
        case "Txistorra":
            return "text-yellow-400";
        case "Gambas":
            return "text-lime-400";
        case "Txuleta Feast":
            return "text-green-400";
        default:
            return "text-grey-400";
    }
}
