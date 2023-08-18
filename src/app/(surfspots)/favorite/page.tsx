import { Database } from "@/app/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

async function getFavoriteSpots() {
    try {
        const supabase = await createServerComponentClient<Database>({
            cookies,
        });
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase
                .from("fav_spots")
                .select("*")
                .eq("user_id", user.id);
            if (error) {
                console.log(error.message);
            }
            const spotIds = data?.map((item) => item.spot_id);
            if (spotIds) {
                const { data, error } = await supabase
                    .from("surfspots")
                    .select("spot_id, name, lat, long")
                    .in("spot_id", spotIds);
                return data;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export default async function FavoriteSpots() {
    const favoriteSpots = await getFavoriteSpots();
    console.log(favoriteSpots);

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-2 ">
            {favoriteSpots &&
                favoriteSpots?.map((spot) => (
                    <Link key={spot.spot_id} href={`spots/${spot.spot_id}`}>
                        <div className="flex flex-col justify-start p-4 bg-dark rounded-md">
                            <span className="text-light font-body font-regular text-lg">
                                {spot.name?.slice(0, 21) ?? ""}
                            </span>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
