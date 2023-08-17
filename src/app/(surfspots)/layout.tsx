import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Database } from "../lib/database.types";
import Link from "next/link";
export default async function FavoriteSpotsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log("USER DATA favorite LAYOUT", user);

    return (
        <main className="p-4 pt-20 xl:p-24">
            <div className="flex flex-row justify-start gap-4">
                {user && (
                    <Link href="/favorite">
                        <div className="font-body text-xl lg:text-3xl font-bold text-light/75 mb-8">
                            Favorite
                        </div>
                    </Link>
                )}
                <Link href="/spots">
                    <div className="font-body text-xl lg:text-3xl font-bold text-light/75 mb-8">
                        All Pintxos Spots
                    </div>
                </Link>
            </div>
            {children}
        </main>
    );
}
