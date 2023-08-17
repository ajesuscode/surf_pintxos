import React, { Suspense } from "react";
import SpotsList from "./SpotsList";
import Loading from "../../loading";

export default async function Spots() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <SpotsList />
            </Suspense>
        </>
    );
}
