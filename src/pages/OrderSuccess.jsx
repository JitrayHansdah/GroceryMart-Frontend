import { Link } from "react-router-dom";

function OrderSuccess() {

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">

            <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-[500px]">

                <h1 className="text-6xl mb-4">
                    🎉
                </h1>

                <h2 className="text-4xl font-bold text-green-600">
                    Order Placed Successfully
                </h2>

                <p className="text-gray-500 mt-4 text-lg">
                    Your groceries are being prepared.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    <Link
                        to="/orders"
                        className="bg-green-600 text-white px-6 py-3 rounded-xl"
                    >
                        View Orders
                    </Link>

                    <Link
                        to="/"
                        className="bg-gray-300 px-6 py-3 rounded-xl"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;