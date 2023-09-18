import { DateTime } from "luxon";
import { PointerIcon } from "./icons/icons";
import "./PintxoRange.css";

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
    const utcDateTime = DateTime.fromISO(pintxoCondition.time, { zone: "utc" });
    const localDateTime = utcDateTime.setZone("Europe/Paris").toFormat("HH:mm");
    const arrowPosition = getArrowPosition(pintxoCondition.condition);
    const arrowColor = getArrowColor(pintxoCondition.condition);

    return (
        <div className="flex flex-col gap-2 justify-center items-start mb-4">
            <div className="relative w-6 h-16 mr-2 rounded-sm  gradient-div opacity-70">
                <div
                    className={`absolute left-[-25%]  bottom-[${arrowPosition}] inset-x-0 
                `}
                >
                    <div className={`w-9 h-1 ${arrowColor} rounded-sm`}></div>
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
            return "bg-purple-300";
        case "Bread Only":
            return "bg-red-300";
        case "Gilda":
            return "bg-orange-300";
        case "Txistorra":
            return "bg-yellow-300";
        case "Gambas":
            return "bg-lime-300";
        case "Txuleta Feast":
            return "bg-green-300";
        default:
            return "bg-grey-300";
    }
}
