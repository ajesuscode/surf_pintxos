import Link from "next/link";
import Image from "next/image";

import pintxos_lg from "./components/pintxo_lg_logo.png";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <Image
                src={pintxos_lg}
                width={200}
                alt="surf_pintxos_logo"
                quality={100}
            />
            <h1 className="text-6xl text-light font-display">Surf Pintxos</h1>
            <p className="text-lg text-light font-body font-light mb-8">
                Open Source Surf forecast for all Pays Basque spots
            </p>
            <Link href="/spots">
                <button className="py-2 px-4 rounded-md bg-secondary text-primary hover:bg-light hover:text-dark">
                    Check the Spots
                </button>
            </Link>
        </main>
    );
}
