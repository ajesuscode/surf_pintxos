export type IconProps = {
    size?: number;
    color?: string;
};

export type SurfSpot = {
    id?: string;
    Name: string;
    "About Spot": string;
    Board: string;
    Seabed: string;
    Swell: string;
    "Best Surf": string;
    WINDY: string;
    "Swell handle": string;
    "Swell direction": string;
    Wavetype: string;
    Surfer: string;
    Latitude: string;
    Longitude: string;
    "Spot rating": string;
    image_03: string;
    image_04: string;
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
