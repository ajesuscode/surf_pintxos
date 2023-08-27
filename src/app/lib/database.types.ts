export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            fav_spots: {
                Row: {
                    created_at: string;
                    favorite_id: string;
                    spot_id: string;
                    user_id: string | null;
                };
                Insert: {
                    created_at?: string;
                    favorite_id: string;
                    spot_id: string;
                    user_id?: string | null;
                };
                Update: {
                    created_at?: string;
                    favorite_id?: string;
                    spot_id?: string;
                    user_id?: string | null;
                };
                Relationships: [];
            };
            surfspots: {
                Row: {
                    about: string | null;
                    best_surf: string | null;
                    board: Json | null;
                    crowd: string | null;
                    drive: string | null;
                    lat: number | null;
                    long: number | null;
                    name: string | null;
                    seabed: string | null;
                    season: string | null;
                    spot_id: string;
                    spot_rating: string | null;
                    surfer: string | null;
                    swell: string | null;
                    swell_direction: string | null;
                    swell_handle: string | null;
                    water_quality: string | null;
                    wavetype: string | null;
                    windy: string | null;
                };
                Insert: {
                    about?: string | null;
                    best_surf?: string | null;
                    board?: Json | null;
                    crowd?: string | null;
                    drive?: string | null;
                    lat?: number | null;
                    long?: number | null;
                    name?: string | null;
                    seabed?: string | null;
                    season?: string | null;
                    spot_id: string;
                    spot_rating?: string | null;
                    surfer?: string | null;
                    swell?: string | null;
                    swell_direction?: string | null;
                    swell_handle?: string | null;
                    water_quality?: string | null;
                    wavetype?: string | null;
                    windy?: string | null;
                };
                Update: {
                    about?: string | null;
                    best_surf?: string | null;
                    board?: Json | null;
                    crowd?: string | null;
                    drive?: string | null;
                    lat?: number | null;
                    long?: number | null;
                    name?: string | null;
                    seabed?: string | null;
                    season?: string | null;
                    spot_id?: string;
                    spot_rating?: string | null;
                    surfer?: string | null;
                    swell?: string | null;
                    swell_direction?: string | null;
                    swell_handle?: string | null;
                    water_quality?: string | null;
                    wavetype?: string | null;
                    windy?: string | null;
                };
                Relationships: [];
            };
            tides: {
                Row: {
                    height: number;
                    id: number;
                    time: string;
                    type: string;
                };
                Insert: {
                    height: number;
                    id?: number;
                    time: string;
                    type: string;
                };
                Update: {
                    height?: number;
                    id?: number;
                    time?: string;
                    type?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
