"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

function Map({ lat, long }) {
    console.log(lat, long);
    return (
        <>
            <div className="w-72 h-72">
                <MapContainer
                    center={[lat, long]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {lat && long && <Marker position={[lat, long]} />}
                </MapContainer>
            </div>
        </>
    );
}

export default Map;
