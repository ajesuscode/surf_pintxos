import Link from "next/link";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./lib/database.types";

import pintxos_lg from "./components/pintxo_lg_logo.png";
import { redirect } from "next/navigation";
export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        redirect("/favorite");
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-2">
            <Image
                src={pintxos_lg}
                width={150}
                alt="surf_pintxos_logo"
                quality={100}
            />
            <h1 className="text-4xl xl:text-6xl text-light font-display">
                Surf Pintxos
            </h1>
            <p className="text-md lg:text-lg text-light font-body font-light mb-8  mx-auto ">
                Surf forecast for all Pays Basque spots
            </p>
            <Link href="/spots">
                <button className="w-72 p-4 rounded-md bg-secondary text-primary hover:bg-light hover:text-dark font-body">
                    Check Pintxos
                </button>
            </Link>
            <span className="text-light font-body">or</span>
            <Link href="/info">
                <button className="w-72 p-4 rounded-md border border-light text-secondary hover:bg-dark hover:text-light font-body">
                    Pintxos Guide
                </button>
            </Link>
        </main>
    );
}
