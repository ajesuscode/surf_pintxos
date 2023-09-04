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
} from "../constants/types";
import { Database } from "../lib/database.types";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

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

        return `${windType} ${windSpeed} m/s`;
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

export function getCurrentTide(tides: TideType[]): string {
    // Sort the tides based on time
    const sortedTides = [...tides].sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    const now = new Date().getTime();

    // Find the most recent tide event before the current time
    let mostRecentTide: TideType | null = null;
    let nextTide: TideType | null = null;
    for (let i = sortedTides.length - 1; i >= 0; i--) {
        if (new Date(sortedTides[i].time).getTime() <= now) {
            mostRecentTide = sortedTides[i];
            nextTide = sortedTides[i + 1] || null;
            break;
        }
    }

    // If there's no tide event before the current time or it's the last event in the array
    if (!mostRecentTide || !nextTide) {
        return "Cannot determine tide status";
    }

    const twoHoursInMillis = 2 * 60 * 60 * 1000;
    const threeHoursInMillis = 3 * 60 * 60 * 1000;

    const timeSinceLastTide = now - new Date(mostRecentTide.time).getTime();
    const timeUntilNextTide = new Date(nextTide.time).getTime() - now;

    if (
        timeSinceLastTide <= twoHoursInMillis ||
        timeUntilNextTide <= threeHoursInMillis
    ) {
        return "midtide";
    }

    // Check the tide status based on the most recent tide event
    return mostRecentTide.type === "low" ? "rising" : "falling";
}
