import React, { Suspense } from "react";
import SpotsList from "./SpotsList";
import Loading from "../loading";

export default function Spots() {
    return (
        <>
            <div className="font-body text-3xl font-bold text-light/75 mb-8">
                All Pintxos Spots
            </div>
            <Suspense fallback={<Loading />}>
                <SpotsList />
            </Suspense>
        </>
    );
}
