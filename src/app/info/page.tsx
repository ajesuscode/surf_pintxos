import React from "react";
import pintxosData from "@/app/constants/pintxosData"; // Adjust the import path as needed
import Image from "next/image";

//TODO Add more description, refactor ui
const Info = () => {
    return (
        <div className="text-light rounded-lg shadow-lg relative overflow-hidden p-20 h-full">
            <h1 className="text-4xl md:text-6xl mb-4 text-purple-400 font-display">
                What is Surf Pintxos?
            </h1>
            <p className="text-lg md:text-xl mb-10 text-red-400  font-normal font-body">
                Surf Pintxos is your community-driven digital surf bar, serving
                up wave conditions on a skewer. Pick your pintxo, ride your
                wave, and share the stoke!
            </p>

            <h2 className="text-2xl md:text-4xl mb-4 text-orange-400 font-display">
                Surf Pintxos Guide
            </h2>
            <p className="text-lg md:text-xl mb-4 text-gray-300 font-normal font-body">
                Choose a spot, check the pintxos, and hit the surf. Share your
                experience and keep the community vibe alive. Its that simple!
            </p>

            {/* Grid for list items */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                {pintxosData.map((item, index) => (
                    <div
                        className={`${item.color} relative rounded-lg overflow-hidden flex self-center justify-center items-center opacity-80`}
                        key={index}
                    >
                        <Image
                            src={item.img}
                            alt={item.title}
                            height={300}
                            className="object-cover opacity-50"
                        />
                        <div className="absolute inset-y-40 p-4">
                            <h3 className="text-xl font-bold font-body text-dark">
                                {item.title}
                            </h3>
                            <p className="font-body text-dark font-normal">
                                {item.short}
                            </p>
                            <p className="font-body text-dark font-normal">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Info;
