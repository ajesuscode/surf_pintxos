import Airtable from "airtable";

export const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appgMr9tYU9At0k5C"
);
