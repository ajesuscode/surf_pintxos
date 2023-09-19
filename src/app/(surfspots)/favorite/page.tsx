import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { fetchSpotSurfData } from "@/app/utils/surfUtils";
import { FullSpot, SurfSpot, FavoriteSpot } from "@/app/constants/types";
import Link from "next/link";

//Components
import SpotDetails from "@/app/components/SpotDetails";
//types
import { Database } from "@/app/lib/database.types";
import { redirect } from "next/navigation";
type PintxoConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

async function getFavoriteSpots(): Promise<PintxoConditions[]> {
    const supabase = await createServerComponentClient<Database>({
        cookies,
    });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/");
    }
    try {
        if (user) {
            const { data, error } = await supabase
                .from("fav_spots")
                .select("*")
                .eq("user_id", user.id);
            if (error) {
                console.log(error.message);
            }
            const spotIds = data?.map((item) => item.spot_id) || [];
            if (spotIds.length) {
                const { data, error } = await supabase
                    .from("spot_conditions")
                    .select("*")
                    .in("spot_id", spotIds);
                return data || [];
            }
        }
    } catch (err) {
        console.log(err);
    }
    return [];
}

export default async function FavoriteSpots() {
    const favoriteSpotsData = await getFavoriteSpots();
    // let favoriteSpotsData: PintxoConditions[] = [];

    // if (favoriteSpots.length) {
    //     favoriteSpotsData = await Promise.all(
    //         favoriteSpots.map(async (spot) => {
    //             try {
    //                 return await fetchSpotSurfData(spot);
    //             } catch (error) {
    //                 console.error(
    //                     `Error fetching data for spot ${spot.name}:`,
    //                     error
    //                 );
    //                 return null; // or return a default value or error object
    //             }
    //         })
    //     );
    // }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2 ">
            {favoriteSpotsData &&
                favoriteSpotsData.map((spot) => {
                    if (spot) {
                        return (
                            <Link
                                key={spot.spot_id}
                                href={`spots/${spot.spot_id}`}
                            >
                                <SpotDetails spot={spot} />
                            </Link>
                        );
                    }
                    return null; // or render an error component
                })}
        </div>
    );
}
