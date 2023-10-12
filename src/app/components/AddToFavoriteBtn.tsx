"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AddFavoriteIcon, RemoveFavoriteIcon } from "./icons/icons";
import { User } from "@supabase/supabase-js";

interface AddFavoriteBtnProps {
    spotId: string;
    isFavorite: boolean;
    user: User | null;
}

export default function AddToFavoriteBtn({
    spotId,
    isFavorite,
    user,
}: AddFavoriteBtnProps) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const handleAddFavoriteSpot = async () => {
        console.log(user);
        if (!user) {
            console.log(user);
            setShowModal(true);
            return;
        }
        const res = await fetch("/api/favorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spotId),
        });
        const json = await res.json();
        if (json.error) {
            console.log(json.error);
        }
        if (res.ok) {
            router.refresh();
        }
    };
    return (
        <div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative bg-secondary p-8 rounded-lg shadow-lg w-2/3">
                        <button
                            className="absolute top-2 right-2 text-dark font-bold"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl mb-4 font-body font-bold text-dark">
                            Login Required
                        </h2>
                        <p className="text-gray-700">
                            Dear friend! You need to be logged in to add
                            favorites.
                        </p>
                        <div className="mt-4 flex justify-center">
                            <button
                                className="bg-red-400 text-dark px-4 py-2 rounded"
                                onClick={() => router.push("/login")}
                            >
                                Go to Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div onClick={handleAddFavoriteSpot} className="cursor-pointer">
                {!isFavorite ? (
                    <AddFavoriteIcon size={20} color={"text-dark"} />
                ) : (
                    <RemoveFavoriteIcon size={20} color={"text-dark"} />
                )}
            </div>
        </div>
    );
}
