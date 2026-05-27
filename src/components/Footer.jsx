import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

function Footer() {

    return (

        <footer className="bg-black text-white mt-16">

            <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* STORE */}

                <div>

                    <h2 className="text-3xl font-bold text-green-500">
                        GroceryMart
                    </h2>

                    <p className="mt-4 text-gray-400 leading-7">
                        Fresh groceries delivered to your doorstep quickly and safely.
                    </p>

                </div>

                {/* QUICK LINKS */}

                <div>

                    <h3 className="text-2xl font-semibold mb-5">
                        Quick Links
                    </h3>

                    <ul className="space-y-3 text-gray-400">

                        <li className="hover:text-white cursor-pointer">
                            Home
                        </li>

                        <li className="hover:text-white cursor-pointer">
                            Cart
                        </li>

                        <li className="hover:text-white cursor-pointer">
                            Orders
                        </li>

                        <li className="hover:text-white cursor-pointer">
                            Contact
                        </li>

                    </ul>

                </div>

                {/* CATEGORIES */}

                <div>

                    <h3 className="text-2xl font-semibold mb-5">
                        Categories
                    </h3>

                    <ul className="space-y-3 text-gray-400">

                        <li>Fruits</li>
                        <li>Vegetables</li>
                        <li>Dairy</li>
                        <li>Groceries</li>

                    </ul>

                </div>

                {/* CONTACT */}

                <div>

                    <h3 className="text-2xl font-semibold mb-5">
                        Contact Us
                    </h3>

                    <div className="space-y-3 text-gray-400">

                        <p>Bhubaneswar, Odisha</p>

                        <p>support@grocerymart.com</p>

                        <p>+91 9937857145</p>

                    </div>

                    {/* SOCIAL ICONS */}

                    <div className="flex gap-5 mt-6 text-2xl">

                        <FaFacebook className="cursor-pointer hover:text-blue-500" />

                        <FaInstagram className="cursor-pointer hover:text-pink-500" />

                        <FaTwitter className="cursor-pointer hover:text-blue-400" />

                        <FaLinkedin className="cursor-pointer hover:text-blue-600" />

                    </div>

                </div>

            </div>

            {/* BOTTOM */}

            <div className="border-t border-gray-800 text-center py-5 text-gray-500">

                © 2026 GroceryMart. All Rights Reserved.

            </div>

        </footer>
    );
}

export default Footer;