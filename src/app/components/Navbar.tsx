import Link from "next/link";
import React from "react";
import Image from "next/image";
import pintxo_lg from "./pintxo_lg_logo.png";
import { SurferProfileIcon } from "@/app/components/icons/icons";

export default function Navbar() {
    return (
        <div className="fixed w-full h-16 flex flex-row justify-between items-center px-12">
            <Link href="/">
                <Image
                    src={pintxo_lg}
                    width={24}
                    alt="surf_pintxos_logo"
                    quality={100}
                    placeholder="blur"
                />
            </Link>
            <Link href="/login">
                <div>
                    <SurferProfileIcon size={30} color="text-light" />
                </div>
            </Link>
        </div>
    );
}
