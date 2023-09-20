import pintxo from "@/app/components/pintxo_lg_logo.png";
import { StaticImageData } from "next/image";

type PintxoItem = {
    color: string;
    title: string;
    description: string;
    img: StaticImageData;
};

const pintxosData: PintxoItem[] = [
    {
        color: "bg-purple-400",
        title: "Empty Plate",
        description: "Flat, no waves. A day for other activities.",
        img: pintxo,
    },
    {
        color: "bg-red-400",
        title: "Bread Only",
        description: "Small waves, suitable for beginners.",
        img: pintxo,
    },
    {
        color: "bg-orange-400",
        title: "Gilda",
        description: "Moderate waves. Good for intermediate surfers.",
        img: pintxo,
    },
    {
        color: "bg-yellow-400",
        title: "Txistorra",
        description: "High waves with strong currents. For the experienced.",
        img: pintxo,
    },
    {
        color: "bg-lime-400",
        title: "Gambas",
        description: "Perfect conditions. The dream of every surfer.",
        img: pintxo,
    },
    {
        color: "bg-green-400",
        title: "Txuleta Feast",
        description: "Extreme conditions. Only for the pros.",
        img: pintxo,
    },
];

export default pintxosData;
