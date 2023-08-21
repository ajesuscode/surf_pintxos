import { Database } from "../lib/database.types";

export type SurfSpot = Database["public"]["Tables"]["surfspots"]["Row"];
export type FavSurfSpot = Database["public"]["Tables"]["fav_spots"]["Row"];
export type FullSpot =
    | (SurfSpot & { hourlySpotForecast: HourlySurfData })
    | null;

export type FavoriteSpot = {
    spot_id: string;
    name: string | null;
    lat: number | null;
    long: number | null;
};

export type IconProps = {
    size?: number;
    color?: string;
};

export type HourlySurfData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    hourly_units: {
        time: string;
        wave_height: string;
        wave_direction: string;
        wave_period: string;
        swell_wave_height: string;
        swell_wave_direction: string;
        swell_wave_period: string;
    };
    hourly: {
        time: string[];
        wave_height: number[];
        wave_direction: number[];
        wave_period: number[];
        swell_wave_height: number[];
        swell_wave_direction: number[];
        swell_wave_period: number[];
    };
};
