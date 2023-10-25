"use client";
import React from "react";
import { DateTime } from "luxon";
import { getTidesData } from "@/app/utils/surfUtils";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
    ReferenceLine,
    Area,
    AreaChart,
} from "recharts";

interface TideVisualGraphProps {
    tides: {
        height: number;
        id: number;
        time: number;
        type: string;
    }[];
}

const TideVisualGraph = ({ tides }: TideVisualGraphProps) => {
    let isMobile = false;
    if (typeof window !== "undefined") {
        const screenWidth = window.screen.width;
        if (screenWidth < 768) {
            isMobile = true;
        }
    }

    const firstDayTides = tides.slice(0, 5).map((tide) => {
        if (tide.height < 0) {
            return { ...tide, height: 0.2 };
        } else if (tide.height > 0) {
            return { ...tide, height: 1 };
        } else {
            return tide;
        }
    });

    const startHour = DateTime.fromMillis(firstDayTides[0].time).startOf(
        "hour"
    );
    const endHour = DateTime.fromMillis(
        firstDayTides[firstDayTides.length - 1].time
    ).endOf("hour");

    const currentTime = DateTime.local().toMillis();

    const hourlyTimestamps: number[] = [];

    for (
        let hour = startHour;
        hour <= endHour;
        hour = hour.plus({ hours: 1 })
    ) {
        hourlyTimestamps.push(hour.toMillis());
    }

    return (
        <div className="p-4 bg-light/20 rounded-md">
            <ResponsiveContainer
                width="100%"
                height={120}
                style={{ marginTop: 20 }}
            >
                <AreaChart
                    data={firstDayTides}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                    <XAxis
                        dataKey="time"
                        scale="time"
                        type="number"
                        domain={["auto", "auto"]}
                        ticks={hourlyTimestamps}
                        tick={{
                            stroke: "#c7d2fe",
                            strokeWidth: 1,
                            fontSize: 8,
                        }}
                        tickFormatter={
                            (time) => DateTime.fromMillis(time).toFormat("HH") // This will output just the hour part
                        }
                        interval={isMobile ? 2 : 1}
                        tickLine={false}
                        tickSize={5}
                        style={{ stroke: "#84cc16" }}
                    ></XAxis>
                    <YAxis type="number" hide={true} dataKey="height" />

                    {/* Add Area below Line */}
                    <Area
                        type="monotone"
                        dataKey="height"
                        fill="#1e1b4b"
                        stroke="#1e1b4b"
                    />
                    <ReferenceLine
                        x={currentTime}
                        stroke="#84cc16"
                        strokeWidth={5}
                        ifOverflow="extendDomain"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TideVisualGraph;
