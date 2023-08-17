"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ExitIcon } from "./icons/icons";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const handleSignOut = async () => {
        const supabase = createClientComponentClient();
        const { error } = await supabase.auth.signOut();
        if (!error) {
            router.refresh();
            router.push("/login");
        }
        if (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={handleSignOut}>
            <ExitIcon size={30} color="text-light" />
        </button>
    );
}
