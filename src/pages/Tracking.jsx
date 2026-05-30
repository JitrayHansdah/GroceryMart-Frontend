import {
    GoogleMap,
    LoadScript,
    Marker,
} from "@react-google-maps/api";

import { useEffect, useState } from "react";

import io from "socket.io-client";

import Navbar from "../components/Navbar";

const socket = io(import.meta.env.VITE_API_URL);
function Tracking() {

    const [location, setLocation] = useState({
        lat: 22.5726,
        lng: 88.3639,
    });

    useEffect(() => {

        // RECEIVE LIVE LOCATION

        socket.on(
            "receive-location",
            (data) => {

                setLocation(data);
            }
        );

        // FAKE RIDER MOVEMENT

        let lat = 22.5726;

        let lng = 88.3639;

        const interval = setInterval(() => {

            lat += 0.0005;

            lng += 0.0005;

            socket.emit(
                "send-location",
                {
                    lat,
                    lng,
                }
            );

        }, 2000);

        return () => {

            socket.off("receive-location");

            clearInterval(interval);
        };

    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Live Order Tracking
                </h1>

                <div className="rounded-2xl overflow-hidden shadow-lg">

                    <LoadScript
                        googleMapsApiKey="AIzaSyAqg_KgWeSqzv8I5HCOs-2ttIHZBaeZZaA"
                    >

                        <GoogleMap
                            mapContainerStyle={{
                                width: "100%",
                                height: "600px",
                            }}
                            center={location}
                            zoom={15}
                        >

                            <Marker position={location} />

                        </GoogleMap>

                    </LoadScript>

                </div>

            </div>

        </div>
    );
}

export default Tracking;