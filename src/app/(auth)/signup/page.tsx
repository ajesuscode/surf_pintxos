"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { Database } from "@/app/lib/database.types";

export default function SignUp() {
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const handleSubmit = async (
        e: React.FormEvent,
        email: string,
        password: string
    ) => {
        e.preventDefault();
        // Handle authentication logic here
        const supabase = createClientComponentClient<Database>();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        router.refresh();
        if (error) {
            setError(error.message);
        }
        if (!error) {
            router.push("/verify");
        }
    };
    return (
        <main>
            <AuthForm handleSubmit={handleSubmit} />
            {error && <p>{error}</p>}
        </main>
    );
}
