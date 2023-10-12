import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { Database } from "@/app/lib/database.types";

export async function POST(req: NextRequest, res: NextResponse) {
    const favoriteSpotId = await req.json();
    try {
        const supabase = createRouteHandlerClient<Database>({ cookies });
        const {
            data: { session },
        } = await supabase.auth.getSession();
        // checking if the spot id is already exist in supabase
        const { data: favorite } = await supabase
            .from("fav_spots")
            .select("*")
            .eq("spot_id", favoriteSpotId)
            .single();
        // if exist delete from favorite
        if (favorite) {
            const { error } = await supabase
                .from("fav_spots")
                .delete()
                .eq("spot_id", favorite.spot_id);
            return NextResponse.json({ error, status: "200" });
        } else {
            const { data, error } = await supabase
                .from("fav_spots")
                .insert({
                    spot_id: favoriteSpotId,
                    user_id: session?.user.id,
                    favorite_id: uuidv4(),
                })
                .select()
                .single();
            return NextResponse.json({ data, error });
        }
    } catch (error) {
        return NextResponse.json({ error });
    }
}
