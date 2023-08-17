"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";
import type { Database } from "@/app/lib/database.types";

export default function Login() {
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const handleSubmit = async (
        e: React.FormEvent,
        email: string,
        password: string
    ) => {
        e.preventDefault();
        setError("");
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (!error) {
            console.log("LOGGED IN");
            router.refresh();
            router.push("/favorite");
        }
        if (error) {
            setError(error.message);
        }
    };
    return (
        <main className="pt-12">
            <div className="flex flex-row justify-center items-center">
                <span className="text-light font-body font-light text-lg">
                    Fill the login form
                </span>
            </div>
            <AuthForm handleSubmit={handleSubmit} />
            {error && <p>{error}</p>}
        </main>
    );
}
