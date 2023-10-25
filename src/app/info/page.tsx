import React from "react";
import pintxosData from "@/app/constants/pintxosData";
import Image from "next/image";
import Link from "next/link";

const Info = () => {
    return (
        <div className="text-light rounded-lg shadow-lg relative overflow-hidden lg:p-20 h-full px-4 pt-20">
            <h1 className="text-4xl md:text-6xl mb-4 text-purple-400 font-display">
                What is Surf Pintxos?
            </h1>
            <p className="text-md md:text-xl mb-10 text-red-400  font-normal font-body">
                Surf Pintxos is a community-driven digital surf forecast bar,
                serving up wave conditions on a skewer for all Basque Country
                spots. Pick your pintxo, ride your wave, and share the stoke!
            </p>

            <h2 className="text-2xl md:text-4xl mb-4 text-orange-400 font-display">
                Surf Pintxos Guide
            </h2>
            <p className="text-md md:text-xl mb-4 text-gray-300 font-normal font-body">
                There are six surf conditions with corresponding pintxo name and
                brand color. You can learn them below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full my-8">
                {pintxosData.map((item, index) => (
                    <div
                        className={`${item.color} rounded-lg overflow-hidden flex flex-row self-center justify-between opacity-80 h-full`}
                        key={index}
                    >
                        <div className="h-full">
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={150}
                                height={150}
                                style={{ objectFit: "contain" }}
                                className="opacity-50 object-center p-8"
                            />
                        </div>
                        <div className="flex flex-col justify-start items-start gap-2 flex-grow w-3/4 pr-4">
                            <div className="text-dark font-bold text-lg font-body pt-4">
                                {item.title}
                            </div>
                            <div className="text-dark text-sm font-body">
                                {item.short}
                            </div>
                            <div className="text-dark text-xs font-body flex-wrap font-light">
                                {item.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mx-auto mb-8 lg:flex lg:justify-center lg:items-center md:mt-20">
                <Link href="/spots">
                    <button className=" p-4 rounded-md bg-secondary text-primary hover:bg-light hover:text-dark font-body w-full md:px-12">
                        Go to Pintxos
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Info;
