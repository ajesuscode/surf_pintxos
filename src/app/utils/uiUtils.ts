export function getPintxoColor(condition: string): string {
    switch (condition) {
        case "Empty Plate":
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
