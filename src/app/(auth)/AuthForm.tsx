"use client";

import Link from "next/link";
import { useState } from "react";

type AuthFormProps = {
    handleSubmit: (e: React.FormEvent, email: string, password: string) => void;
};

export default function AuthForm({ handleSubmit }: AuthFormProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="">
            <form
                onSubmit={(e) => handleSubmit(e, email, password)}
                className="bg-light/50 p-8 rounded-md w-full mt-10 shadow-lg lg:max-w-md lg:mx-auto md:max-w-sm md:mx-auto"
            >
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-dark font-body mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md font-body text-dark placeholder-light"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="password"
                        className="block text-dark font-body mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md font-body text-dark placeholder-light"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full font-body bg-primary text-light px-4 py-2 rounded-md hover:bg-secondary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
