import React from "react";
import SpotsList from "./SpotsList";

export default function Spots() {
    return (
        <>
            <div className="font-body text-3xl font-bold text-light/75 mb-8">
                All Pintxos Spots
            </div>
            <SpotsList />
        </>
    );
}
