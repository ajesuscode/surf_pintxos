import {
    FullSpot,
    SurfSpot,
    HourlySurfData,
    FavoriteSpot,
} from "../constants/types";

export async function fetchSpotSurfData(spot: SurfSpot) {
    const response = await fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.lat}&longitude=${spot.long}&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_direction,swell_wave_period`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch data for spot ${spot.name}`);
    }

    const data: HourlySurfData = await response.json();
    return {
        ...spot,
        hourlySpotForecast: data,
    };
}
export function getCurrentWaveHeightForSpot(spot: FullSpot): string | null {
    if (!spot) return null; // Check if spot is null

    const currentTime = new Date().toISOString().slice(0, 13) + ":00";
    const timeIndex = spot.hourlySpotForecast?.hourly.time.indexOf(currentTime);

    if (timeIndex !== undefined && timeIndex !== -1) {
        const currentWaveHeight =
            spot.hourlySpotForecast?.hourly.wave_height[timeIndex];
        return currentWaveHeight ? currentWaveHeight.toFixed(1) : null;
    } else {
        return null;
    }
}

export function getCurrentPeriodForSpot(spot: FullSpot): string | null {
    if (!spot) return null; // Check if spot is null

    const currentTime = new Date().toISOString().slice(0, 13) + ":00";
    const timeIndex = spot.hourlySpotForecast?.hourly.time.indexOf(currentTime);

    if (timeIndex !== undefined && timeIndex !== -1) {
        const currentPeriod =
            spot.hourlySpotForecast?.hourly.wave_period[timeIndex];
        return currentPeriod ? currentPeriod.toFixed(0) : null;
    } else {
        return null;
    }
}
