"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/app/lib/database.types";
import Link from "next/link";
import { useClickAway } from "@uidotdev/usehooks";

type SpotConditions = Database["public"]["Tables"]["spot_conditions"]["Row"];

const SearchPintxos = () => {
    const [pintxos, setPintxos] = useState<SpotConditions[] | null>(null);
    const [search, setSearch] = useState<string>("");
    const supabase = createClientComponentClient<Database>();
    const ref = useClickAway(() => {
        setPintxos(null);
        setSearch("");
    });

    useEffect(() => {
        async function searchPintxos() {
            if (search.trim() === "") {
                setPintxos(null);
                return;
            }
            const { data, error } = await supabase
                .from("spot_conditions")
                .select("*")
                .like("name", `%${search}%`);

            if (error) {
                console.log("ERROR", error.message);
            }
            setPintxos(data);
        }
        searchPintxos();
    }, [search]);

    const handlePintxoClick = (): void => {
        setPintxos(null);
        setSearch("");
    };

    console.log("SEARCH", search);
    console.log("PINTXO", pintxos);

    return (
        <div className="">
            <div
                className="relative"
                ref={ref as React.RefObject<HTMLDivElement>}
            >
                <input
                    type="text"
                    placeholder="Search pintxos"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-secondary/50 rounded-md p-2 !bg-transparent font-body text-md font-light text-secondary ring-0 focus:ring-secondary focus:outline-none"
                />
                {pintxos && pintxos.length > 0 && (
                    <div className="absolute top-12 left-0 bg-light/100 rounded-md p-2 flex flex-col justify-start items-start gap-2 w-full">
                        {pintxos?.map((pintxo) => (
                            <div
                                key={pintxo.spot_id}
                                onClick={() => handlePintxoClick()}
                                className="w-full"
                            >
                                <Link
                                    href={`/spots/${pintxo.spot_id}`}
                                    className="flex flex-row justify-between items-center w-full"
                                >
                                    <div className="text-dark font-body tracking-wider text-lg grow">
                                        {pintxo.name}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPintxos;
