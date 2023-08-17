import Link from "next/link";

export default async function FavoriteSpots() {
    return (
        <div className="flex flex-row justify-start items-end gap-4">
            <Link href="/favorite">
                <div className="font-body text-3xl font-bold text-light/75 mb-8">
                    Favorite
                </div>
            </Link>
        </div>
    );
}
