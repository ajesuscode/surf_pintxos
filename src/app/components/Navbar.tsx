import Link from "next/link";
import React from "react";
import Image from "next/image";
import pintxo_lg from "./pintxo_lg_logo.png";
import {
    RegisteredSurferIcon,
    SurferProfileIcon,
} from "@/app/components/icons/icons";
import LogoutButton from "./LogoutButton";
import { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user: User | null }) {
    return (
        <div className="fixed w-full h-16 flex flex-row justify-between items-center px-4 lg:px-12 bg-primary shadow-sm z-50">
            <Link href="/">
                <Image
                    src={pintxo_lg}
                    width={20}
                    alt="surf_pintxos_logo"
                    quality={100}
                />
            </Link>
            <div>
                <div className="flex flex-row gap-2 items-center">
                    {user ? (
                        <>
                            <RegisteredSurferIcon
                                size={30}
                                color="text-light"
                            />
                            <div className="text-light font-body text-sm">
                                {user.email}
                            </div>
                            <LogoutButton />
                        </>
                    ) : (
                        <Link href="/login">
                            <button className="p-2 px-4 rounded-md bg-light text-primary hover:bg-dark hover:text-light text-sm">
                                Login
                            </button>
                        </Link>
                    )}
                    <Link
                        href="/info
                    "
                    >
                        <div className="flex ml-2 rounded-lg border border-secondary px-2 py-1 opacity-50 ">
                            <span className="font-display text-xs font-bold text-secondary">
                                i
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
