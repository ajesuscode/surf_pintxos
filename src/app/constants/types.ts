import { Database } from "../lib/database.types";

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

export type Pintxo = {
    time: string;
    condition: string;
};

export type SurfSpot = Database["public"]["Tables"]["surfspots"]["Row"];
export type FavSurfSpot = Database["public"]["Tables"]["fav_spots"]["Row"];
export type TideType = Database["public"]["Tables"]["tides"]["Row"];
export type FullSpot =
    | (SurfSpot & { hourlySpotForecast: HourlySurfData } & {
          hourlyWeatherData: HourlyWeatherData;
      })
    | null;

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

export type HourlyWeatherData = {
    time?: string[];
    temperature_2m?: number[];
    precipitation?: number[];
    visibility?: number[];
    windspeed_10m?: number[];
    winddirection_10m?: number[];
    temperature_80m?: number[];
    uv_index?: number[];
};

export type ForecastDataResponse = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: {
        time: string;
        temperature_2m: string;
        precipitation: string;
        visibility: string;
        windspeed_10m: string;
        winddirection_10m: string;
        temperature_80m: string;
        uv_index: string;
    };
    hourly: HourlyWeatherData;
};
