//external libs
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { DateTime } from "luxon";
//types
import {
    FullSpot,
    SurfSpot,
    HourlySurfData,
    FavoriteSpot,
    TideType,
    HourlyWeatherData,
    ForecastDataResponse,
    Pintxo,
} from "../constants/types";
import { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];
type WeekdayPintxoCondition = {
    [weekday: string]: string;
};

//constants
const directionToDegrees: { [key: string]: number } = {
    N: 0,
    NNE: 22.5,
    NE: 45,
    ENE: 67.5,
    E: 90,
    ESE: 112.5,
    SE: 135,
    SSE: 157.5,
    S: 180,
    SSW: 202.5,
    SW: 225,
    WSW: 247.5,
    W: 270,
    WNW: 292.5,
    NW: 315,
    NNW: 337.5,
};

//helper functions
function getAverageDirection(direction: string): number {
    const parts = direction
        .split("-")
        .map((dir) => directionToDegrees[dir.trim()]);

    const radians = parts.map((deg) => (deg * Math.PI) / 180);

    const avgSin =
        radians.reduce((sum, rad) => sum + Math.sin(rad), 0) / radians.length;
    const avgCos =
        radians.reduce((sum, rad) => sum + Math.cos(rad), 0) / radians.length;

    let avgDirection = (Math.atan2(avgSin, avgCos) * 180) / Math.PI;
    if (avgDirection < 0) avgDirection += 360;

    return avgDirection;
}

export async function fetchSpotSurfData(spot: SurfSpot) {
    const marineApiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.lat}&longitude=${spot.long}&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period`;
    const forecastApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${spot.lat}&longitude=${spot.long}&hourly=temperature_2m,precipitation,visibility,windspeed_10m,winddirection_10m,temperature_80m,uv_index&models=best_match`;

    const [marineResponse, forecastResponse] = await Promise.all([
        fetch(marineApiUrl),
        fetch(forecastApiUrl),
    ]);

    if (!marineResponse.ok) {
        throw new Error(`Failed to fetch data for spot ${spot.name}`);
    }

    const hourlySurfData: HourlySurfData = await marineResponse.json();
    const forecastData: ForecastDataResponse = await forecastResponse.json();
    const hourlyWeatherData: HourlyWeatherData = forecastData.hourly;

    return {
        ...spot,
        hourlySpotForecast: hourlySurfData,
        hourlyWeatherData: hourlyWeatherData,
    };
}

export function getCurrentWaveHeightForSpot(
    spot: PintxoConditions
): string | null {
    if (!spot) return null; // Check if spot is null

    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
    const timeIndex = spot.hourlyspotforecast?.hourly.time.indexOf(currentTime);

    if (timeIndex !== undefined && timeIndex !== -1) {
        const currentWaveHeight =
            spot.hourlyspotforecast?.hourly.wave_height[timeIndex];
        return currentWaveHeight ? currentWaveHeight.toFixed(1) : null;
    } else {
        return null;
    }
}

export function getCurrentPeriodForSpot(spot: PintxoConditions): string | null {
    if (!spot) return null; // Check if spot is null

    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
    const timeIndex = spot.hourlyspotforecast?.hourly.time.indexOf(currentTime);

    if (timeIndex !== undefined && timeIndex !== -1) {
        const currentPeriod =
            spot.hourlyspotforecast?.hourly.wave_period[timeIndex];
        return currentPeriod ? currentPeriod.toFixed(0) : null;
    } else {
        return null;
    }
}

export function getCurrentWind(spot: PintxoConditions): string | null {
    if (!spot || !spot.hourlyweatherdata) return null; // Check if spot or hourlyweatherdata is null

    const currentTime = DateTime.now()
        .setZone("Europe/Paris")
        .startOf("hour")
        .toUTC()
        .toFormat("yyyy-MM-dd'T'HH:mm");
    const timeIndex = spot.hourlyweatherdata.time?.indexOf(currentTime);

    if (
        timeIndex !== undefined &&
        timeIndex !== -1 &&
        spot.hourlyweatherdata.winddirection_10m &&
        spot.hourlyweatherdata.windspeed_10m
    ) {
        const windDirection =
            spot.hourlyweatherdata.winddirection_10m[timeIndex];
        const windSpeed = spot.hourlyweatherdata.windspeed_10m[timeIndex];
        const optimalSwellDirection = getAverageDirection(
            spot.swell_direction ?? ""
        );

        let windType = "Crossshore"; // Default to cross-shore

        const directionDifference = Math.abs(
            windDirection - optimalSwellDirection
        );

        if (directionDifference >= 135 && directionDifference <= 225) {
            windType = "Offshore";
        } else if (directionDifference <= 45 || directionDifference >= 315) {
            windType = "Onshore";
        }

        return `${windType}`;
    }
    return null;
}

export async function getTidesData(): Promise<TideType[]> {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: tides, error } = await supabase.from("tides").select("*");
    if (!tides) {
        throw new Error(error.message);
    } else {
        return tides as TideType[];
    }
}

export function getCurrentTide(
    tides: TideType[]
): { tide: string; time: string } | null {
    // Get the current time in UTC for comparisons
    const currentTimeUTC = DateTime.now().toUTC();

    // Find the most recent tide event before the current time
    const pastTide = tides.reduce((prev, curr) => {
        if (DateTime.fromISO(curr.time) < currentTimeUTC) {
            return Math.abs(
                DateTime.fromISO(prev.time).diff(currentTimeUTC).as("minutes")
            ) <
                Math.abs(
                    DateTime.fromISO(curr.time)
                        .diff(currentTimeUTC)
                        .as("minutes")
                )
                ? prev
                : curr;
        }
        return prev;
    });

    // Find the next upcoming tide event after the current time
    const nextTide = tides.find(
        (tide) => DateTime.fromISO(tide.time) > currentTimeUTC
    );

    // If there's no past tide or next tide, return a message
    if (!pastTide || !nextTide) {
        return null;
    }

    // If the next tide is very close to the current time (e.g., within 1 hour and 30 minutes)
    if (
        DateTime.fromISO(nextTide.time).diff(currentTimeUTC).as("minutes") <= 90
    ) {
        return {
            tide: nextTide.type === "low" ? "rising" : "falling",
            // Convert the time to Europe/Paris timezone for the final response
            time: DateTime.fromISO(nextTide.time)
                .setZone("Europe/Paris")
                .toFormat("HH:mm"),
        };
    }

    // Otherwise, determine the tide status based on the past tide
    return {
        tide: pastTide.type === "low" ? "rising" : "falling",
        // Convert the time to Europe/Paris timezone for the final response
        time: DateTime.fromISO(nextTide.time)
            .setZone("Europe/Paris")
            .toFormat("HH:mm"),
    };
}

export function getCurrentPintxoConditions(
    spot: PintxoConditions,
    currentTime: string,
    sliceCount?: number
): { time: string; condition: string }[] {
    const timeIndex =
        spot?.hourlyspotforecast?.hourly.time.indexOf(currentTime);
    let currentPintxoCondition: { time: string; condition: string }[] = [];

    if (
        spot &&
        spot.pintxo &&
        typeof timeIndex !== "undefined" &&
        timeIndex !== -1
    ) {
        const endIndex = sliceCount ? timeIndex + sliceCount : undefined;
        currentPintxoCondition = spot!.pintxo
            .slice(timeIndex, endIndex)
            .map((conditionObj) => ({
                time: conditionObj?.time,
                condition: conditionObj?.condition,
            }));
    }

    return currentPintxoCondition;
}

export function getWeekdayPintxoCondition(
    data: Pintxo[]
): WeekdayPintxoCondition {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdayConditions: {
        [weekday: string]: { [condition: string]: number };
    } = {};
    console.log("data", data);

    for (const item of data) {
        const date = DateTime.fromISO(item.time, { zone: "UTC" })
            .setZone("Europe/Paris")
            .startOf("hour");
        const weekday = weekdays[date.weekday - 1];

        weekdayConditions[weekday] = weekdayConditions[weekday] || {};
        weekdayConditions[weekday][item.condition] =
            (weekdayConditions[weekday][item.condition] || 0) + 1;
    }

    const averageConditions: WeekdayPintxoCondition = {};

    for (const weekday in weekdayConditions) {
        let maxCount = 0;
        let mostFrequentCondition = "";

        for (const condition in weekdayConditions[weekday]) {
            if (weekdayConditions[weekday][condition] > maxCount) {
                maxCount = weekdayConditions[weekday][condition];
                mostFrequentCondition = condition;
            }
        }

        averageConditions[weekday] = mostFrequentCondition;
    }

    return averageConditions;
}
