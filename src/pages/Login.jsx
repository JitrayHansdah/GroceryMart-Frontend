import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", res.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Successful");

            navigate("/");
        } catch (error) {
            console.log(error);

            alert("Invalid Credentials");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">

            <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

                <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
                    Login
                </h1>

                <form
                    onSubmit={loginHandler}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="border w-full p-4 rounded-lg"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="border w-full p-4 rounded-lg"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-lg text-lg font-semibold"
                    >
                        Login
                    </button>

                </form>

                {/* REGISTER LINK */}

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-green-600 font-bold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;