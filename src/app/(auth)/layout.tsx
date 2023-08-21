import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Database } from "../lib/database.types";

export default async function layoutAuth({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log("USER DATA LOGIN LAYOUT", user);
    if (user) {
        redirect("/favorite");
    } 
    
    return (
        <div className="pt-20">
            <div className="flex flex-row justify-start gap-4 px-4">
                <Link href="/login">
                    <div className="font-body text-light text-xl font-light hover:text-secondary">
                        Login
                    </div>
                </Link>
                <Link
                    href="signup"
                    className="font-body text-light text-xl font-light hover:text-secondary"
                >
                    <div>SignUp</div>
                </Link>
            </div>
            <div className="flex flex-col justify-center bg-primary w-full px-4">
                {children}
            </div>
        </div>
    );
}
