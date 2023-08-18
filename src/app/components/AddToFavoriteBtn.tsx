"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AddFavoriteIcon, RemoveFavoriteIcon } from "./icons/icons";

interface AddFavoriteBtnProps {
    spotId: string;
    isFavorite: boolean;
}

export default function AddToFavoriteBtn({
    spotId,
    isFavorite,
}: AddFavoriteBtnProps) {
    const router = useRouter();
    const handleAddFavoriteSpot = async () => {
        const res = await fetch("/api/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spotId),
        });
        const json = await res.json();
        console.log(res);
        if (json.error) {
            console.log(json.error);
        }
        if (res.ok) {
            router.refresh();
        }
    };
    return (
        <div onClick={handleAddFavoriteSpot}>
            {!isFavorite ? (
                <AddFavoriteIcon size={20} color={"text-dark"} />
            ) : (
                <RemoveFavoriteIcon size={20} color={"text-dark"} />
            )}
        </div>
    );
}
