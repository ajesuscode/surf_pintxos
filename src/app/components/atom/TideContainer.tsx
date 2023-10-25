import React from "react";
import { DateTime } from "luxon";
import { getTidesData } from "@/app/utils/surfUtils";
import TideVisualGraph from "./TideVisualGraph";

type TidesType = {
    height: number;
    id: number;
    time: number;
    type: string;
};

const TideContainer = async () => {
    const tidesData = await getTidesData();
    let newTides: TidesType[] = [];
    if (tidesData) {
        newTides = tidesData.map((item) => ({
            ...item,
            time: DateTime.fromISO(item.time).toMillis(),
        }));
    }

    return (
        <>
            <TideVisualGraph tides={newTides} />
        </>
    );
};

export default TideContainer;
