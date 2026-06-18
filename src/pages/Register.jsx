import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    name,
                    email,
                    password,
                }
            );

            alert("Registration Successful");

            navigate("/login");
        } catch (error) {
            console.log(error);

            alert("Registration Failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={registerHandler}
                className="bg-white shadow-lg p-8 rounded-lg w-96"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
                    Register
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-green-600 text-white w-full p-3 rounded">
                    Register
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-green-600 font-semibold hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;