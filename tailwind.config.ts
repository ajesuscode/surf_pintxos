import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                body: ["var(--font-millimetre)"],
                display: ["var(--font-ouroboros)"],
            },
            colors: {
                primary: "#3730a3",
                light: "#c7d2fe",
                dark: "#1e1b4b",
            },
        },
    },
    plugins: [],
};
export default config;
