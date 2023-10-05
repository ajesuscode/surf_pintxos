import pintxo from "@/app/components/pintxo_lg_logo.png";
import { StaticImageData } from "next/image";

type PintxoItem = {
    color: string;
    title: string;
    short: string;
    description: string;
    img: StaticImageData;
};

const pintxosData: PintxoItem[] = [
    {
        color: "bg-purple-400",
        title: "Empty Plate",
        short: "Unfavorable Conditions",
        description:
            "Conditions are either flat or too stormy for any kind of surfing. Better to stay out of the water.",
        img: pintxo,
    },
    {
        color: "bg-red-400",
        title: "Bread Only",
        short: "Tricky Conditions",
        description:
            "Waves are present but conditions are tricky due to onshore winds or wrong tide. Suitable for experienced surfers who don't mind the challenge.",
        img: pintxo,
    },
    {
        color: "bg-yellow-400",
        title: "Gilda",
        short: "Average Conditions",
        description:
            "Waves are moderate and conditions are surfable but not ideal. Offshore wind may be too strong or the swell direction isn't perfect.",
        img: pintxo,
    },
    {
        color: "bg-orange-400",
        title: "Txistorra",
        short: "Good Conditions",
        description:
            "Good wave height and favorable wind and tide conditions. Suitable for most surfers.",
        img: pintxo,
    },
    {
        color: "bg-green-400",
        title: "Gambas",
        short: "Great Conditions",
        description:
            "Waves are firing with light offshore winds and the tide is just right. A great day for all surfers.",
        img: pintxo,
    },
    {
        color: "bg-blue-400",
        title: "Txuleta Feast",
        short: "Epic Conditions",
        description:
            "Perfect alignment of swell, wind, and tide. These are the days you'll remember. Only for those who know how to handle such conditions.",
        img: pintxo,
    },
];

export default pintxosData;
