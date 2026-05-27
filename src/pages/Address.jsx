import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Address() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
        district: "",
        state: "",
        zipCode: "",

    });

    const changeHandler = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });
    };

    const saveAddress = () => {

        localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(formData)
        );

        navigate("/cart");
    };

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex justify-center items-center p-6 md:p-10">

                <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 md:p-10">

                    <h1 className="text-4xl font-bold mb-8">
                        Delivery Address
                    </h1>

                    {/* NAME */}

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="font-semibold block mb-2">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={changeHandler}
                                className="border w-full p-4 rounded-xl"
                            />

                        </div>

                        <div>

                            <label className="font-semibold block mb-2">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={changeHandler}
                                className="border w-full p-4 rounded-xl"
                            />

                        </div>

                    </div>

                    {/* MOBILE */}

                    <div className="mt-6">

                        <label className="font-semibold block mb-2">
                            Mobile Number
                        </label>

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            value={formData.mobile}
                            onChange={changeHandler}
                            className="border w-full p-4 rounded-xl"
                        />

                    </div>

                    {/* ADDRESS */}

                    <div className="mt-6">

                        <label className="font-semibold block mb-2">
                            Full Address
                        </label>

                        <textarea
                            rows="4"
                            name="address"
                            placeholder="House No, Street, Area..."
                            value={formData.address}
                            onChange={changeHandler}
                            className="border w-full p-4 rounded-xl"
                        />

                    </div>

                    {/* DISTRICT + STATE */}

                    <div className="grid md:grid-cols-2 gap-6 mt-6">

                        <div>

                            <label className="font-semibold block mb-2">
                                District
                            </label>

                            <input
                                type="text"
                                name="district"
                                placeholder="Enter District"
                                value={formData.district}
                                onChange={changeHandler}
                                className="border w-full p-4 rounded-xl"
                            />

                        </div>

                        <div>

                            <label className="font-semibold block mb-2">
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                placeholder="Enter State"
                                value={formData.state}
                                onChange={changeHandler}
                                className="border w-full p-4 rounded-xl"
                            />

                        </div>

                    </div>

                    {/* ZIP */}

                    <div className="mt-6">

                        <label className="font-semibold block mb-2">
                            ZIP Code
                        </label>

                        <input
                            type="text"
                            name="zipCode"
                            placeholder="Enter ZIP Code"
                            value={formData.zipCode}
                            onChange={changeHandler}
                            className="border w-full p-4 rounded-xl"
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        onClick={saveAddress}
                        className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-xl text-xl font-semibold mt-8"
                    >
                        Save Address
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Address;