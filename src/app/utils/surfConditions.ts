//TODO move this function to edgefunctions in Supabase to run onece a day and store result in db for each spot

export type SurfCondition = {
    time: string;
    condition: Condition;
};

export type Condition =
    | "Empty Plate"
    | "Bread Only"
    | "Gilda"
    | "Txistorra"
    | "Gambas"
    | "Txuleta Feast";

import type { FullSpot, TideType } from "../constants/types";

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

export default function getSurfConditions(
    spotData: FullSpot,
    tideData: TideType[]
): SurfCondition[] {
    if (!spotData) return [];
    const hourlyForecast = spotData.hourlySpotForecast.hourly;
    const hourlyWeather = spotData.hourlyWeatherData;
    const bestSurfTide = spotData.best_surf;
    const swellHandleRange =
        spotData.swell_handle
            ?.split("-")
            .map((s: string) => parseFloat(s.trim()) * 0.3048) ?? [];

    const optimalSwellDirection = getAverageDirection(
        spotData.swell_direction ?? ""
    );

    const getWaveHeightScore = (waveHeight: number): number => {
        if (
            waveHeight >= swellHandleRange[0] &&
            waveHeight <= swellHandleRange[1]
        )
            return 3;
        return 0;
    };

    const getWavePeriodScore = (wavePeriod: number): number => {
        if (wavePeriod >= 10 && wavePeriod <= 14) return 2;
        if (wavePeriod > 14) return 3;
        return 1;
    };

    const getSwellDirectionScore = (swellDirection: number): number => {
        return Math.abs(swellDirection - optimalSwellDirection) <= 45 ? 3 : 1;
    };

    const getTideScore = (time: string): number => {
        const currentTime = new Date(time);
        const currentHour = currentTime.getHours();
        const currentTide = tideData.find(
            (tide) => new Date(tide.time).getHours() === currentHour
        );
        const nextTide = tideData.find(
            (tide) => new Date(tide.time).getHours() > currentHour
        );

        if (bestSurfTide === "All Tides") return 2;

        if (currentTide && nextTide) {
            const midpointTime =
                new Date(currentTide.time).getTime() +
                (new Date(nextTide.time).getTime() -
                    new Date(currentTide.time).getTime()) /
                    2;

            let transition = "";
            if (currentTime.getTime() < midpointTime) {
                transition =
                    currentTide.type === "low" ? "low to mid" : "high to mid";
            } else {
                transition =
                    currentTide.type === "low" ? "mid to high" : "mid to low";
            }

            if (bestSurfTide && bestSurfTide.includes(transition)) return 2;
        }
        return 0;
    };

    function getWindEffect(
        windSpeed: number,
        windDirection: number,
        optimalSwellDirection: number
    ): number {
        // Calculate the difference between wind direction and optimal swell direction
        const directionDifference = Math.abs(
            windDirection - optimalSwellDirection
        );

        // Offshore wind
        if (directionDifference <= 45) {
            if (windSpeed < 5) return 2; // Light offshore wind is ideal
            if (windSpeed < 15) return 1; // Moderate offshore wind is still good but can make conditions a bit challenging
            return -1; // Strong offshore wind can be dangerous
        }

        // Onshore wind
        if (directionDifference >= 135 && directionDifference <= 225) {
            if (windSpeed < 5) return -1; // Light onshore wind makes conditions less desirable
            return -2; // Strong onshore wind makes conditions unsurfable
        }

        // Cross-shore wind or other directions
        if (windSpeed < 5) return 1; // Light cross-shore wind is neutral
        return 0; // Moderate to strong cross-shore wind can make conditions tricky
    }

    return hourlyForecast.time.map((time: string, index: number) => {
        const windEffect = getWindEffect(
            hourlyWeather?.windspeed_10m
                ? hourlyWeather.windspeed_10m[index]
                : 0,
            hourlyWeather?.winddirection_10m
                ? hourlyWeather.winddirection_10m[index]
                : 0,
            optimalSwellDirection
        );
        const score =
            getWaveHeightScore(hourlyForecast.wave_height[index]) +
            getWavePeriodScore(hourlyForecast.wave_period[index]) +
            getSwellDirectionScore(hourlyForecast.swell_wave_direction[index]) +
            getTideScore(time) +
            windEffect;

        if (score <= 2)
            return {
                time: hourlyForecast.time[index],
                condition: "Empty Plate",
            }; //Just like an empty plate with no pintxos, the surf is unsatisfying. This could be due to extremely flat conditions or stormy, chaotic waves.
        if (score <= 4)
            return {
                time: hourlyForecast.time[index],
                condition: "Bread Only",
            }; // There's a base, but it's not quite fulfilling. The waves are there, but they're tricky and challenging.
        if (score <= 6)
            return { time: hourlyForecast.time[index], condition: "Gilda" }; //Named after the classic pintxo made of an olive, anchovy, and pepper on a stick. It's a simple yet satisfying wave condition, not perfect but definitely surfable.
        if (score <= 8)
            return { time: hourlyForecast.time[index], condition: "Txistorra" }; // A spicy sausage pintxo. The waves are getting spicy, conditions are good and there's some excitement in the water.
        if (score <= 10)
            return { time: hourlyForecast.time[index], condition: "Gambas" }; //Grilled prawns on a skewer. A treat for many, the waves are firing and conditions are near-perfect.
        return { time: hourlyForecast.time[index], condition: "Txuleta Feast" }; //Named after the Basque grilled steak, this is the crème de la crème of pintxos and represents epic surf conditions. It's a feast out there!
    });
}
