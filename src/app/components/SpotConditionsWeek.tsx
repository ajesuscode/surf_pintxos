"use client";
import React, { useState } from "react";
import { DateTime } from "luxon";
import type { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

export default function SpotConditionsWeek({
    spot,
}: {
    spot: PintxoConditions;
}) {
    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
    const timeIndex =
        spot?.hourlyspotforecast?.hourly.time.indexOf(currentTime);
    console.log("TIMEINDEX", timeIndex);
    const utcDateTimes = spot.hourlyspotforecast?.hourly.time
        .slice(timeIndex)
        .map((t) => {
            return DateTime.fromISO(t, {
                zone: "utc",
            });
        });
    const localDateTimes = utcDateTimes?.map((locTime) => {
        return locTime.setZone("Europe/Paris").toFormat("ccc d HH:mm");
    });

    return (
        <div className="overflow-y-auto">
            <table className="table-auto border-separate border-spacing-2 items-center">
                <tbody className="">
                    <tr>
                        <th className="bg-primeshade w-48 sticky left-0"></th>
                        {localDateTimes?.map((item, index) => (
                            <td
                                key={index}
                                className="border border-light/5 text-xs text-light/50 font-body text-center bg-primeshade"
                            >
                                {item.split(" ")[0]}
                                <br />
                                {item.split(" ")[1]}
                                <br />
                                {item.split(" ")[2]}
                            </td>
                        )) ?? <></>}
                    </tr>
                    <tr>
                        <th className=" text-xs text-light font-body font-light  bg-primeshade p-2 sticky left-0">
                            Wave (m)
                        </th>
                        {spot.hourlyspotforecast?.hourly.wave_height
                            .slice(timeIndex)
                            .map((wave, index) => (
                                <td
                                    key={index}
                                    className="border border-light/5 p-1 text-light/50 font-body text-xs"
                                >
                                    {wave}
                                </td>
                            ))}
                    </tr>
                    <tr>
                        <th className="text-xs text-light font-body font-light bg-primeshade p-2 sticky left-0">
                            Period
                        </th>
                        {spot.hourlyspotforecast?.hourly.wave_period
                            .slice(timeIndex)
                            .map((period, index) => (
                                <td
                                    key={index}
                                    className="border border-light/5 p-1 text-light/50 font-body text-xs "
                                >
                                    {Math.round(period)}
                                </td>
                            ))}
                    </tr>
                    <tr>
                        <th className="text-xs text-light font-body font-light bg-primeshade p-2 sticky left-0">
                            Wave dir.
                        </th>
                        {spot.hourlyspotforecast?.hourly.wave_direction
                            .slice(timeIndex)
                            .map((wave, index) => (
                                <td
                                    key={index}
                                    className="border border-light/5 p-1 text-light/50 font-body text-xs "
                                >
                                    {wave}
                                </td>
                            ))}
                    </tr>

                    <tr>
                        <th className="text-xs text-light font-body font-light bg-primeshade p-2 sticky left-0">
                            Wind (km/h)
                        </th>
                        {spot.hourlyweatherdata?.windspeed_10m
                            ?.slice(timeIndex)
                            ?.map((wind, index) => (
                                <td
                                    key={index}
                                    className="border border-light/5 p-1 text-light/50 font-body text-xs "
                                >
                                    {wind}
                                </td>
                            )) ?? <></>}
                    </tr>
                    <tr>
                        <th className="text-xs text-light font-body font-light bg-primeshade p-2 sticky left-0">
                            Wind dir.
                        </th>
                        {spot.hourlyweatherdata?.winddirection_10m
                            ?.slice(timeIndex)
                            ?.map((winddir, index) => (
                                <td
                                    key={index}
                                    className="border border-light/5 p-1 text-light/50 font-body text-xs "
                                >
                                    {winddir}
                                </td>
                            ))}
                    </tr>
                    <tr>
                        <th className="text-xs text-light font-body font-light bg-primeshade p-2 sticky left-0">
                            Temp. (°C)
                        </th>
                        {spot.hourlyweatherdata?.temperature_2m
                            ?.slice(timeIndex)
                            ?.map((temp, index) => (
                                <td
                                    key={index}
                                    className="border border-light/5 p-1 text-light/50 font-body text-xs"
                                >
                                    {temp}
                                </td>
                            )) ?? <></>}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
