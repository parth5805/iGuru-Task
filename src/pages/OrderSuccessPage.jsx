import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSuccessPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Get order details from localStorage (simulated order data)
        const savedOrder = localStorage.getItem('lastOrder');
        if (savedOrder) {
            setOrderDetails(JSON.parse(savedOrder));
        }
    }, []);

    if (!orderDetails) {
        return (
            <section className="py-20">
                <div className="container text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">No Order Found</h1>
                    <Link to="/all" className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200">
                        Continue Shopping
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20">
            <div className="container max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-600 text-lg">Thank you for your purchase. Your order has been confirmed.</p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-left">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Order Summary</h2>
                    
                    <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-semibold">#{orderDetails.orderId}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-600">Order Date:</span>
                            <span className="font-semibold">{orderDetails.orderDate}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-600">Total Items:</span>
                            <span className="font-semibold">{orderDetails.totalItems} items</span>
                        </div>
                    </div>

                    {/* Ordered Items */}
                    <div className="space-y-4 mb-4">
                        {orderDetails.items.map((item) => (
                            <div key={item.productId} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total Amount:</span>
                            <span className="text-green-600">${orderDetails.totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <Link 
                        to="/all" 
                        className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
                    >
                        Continue Shopping
                    </Link>
                    <button 
                        onClick={() => window.print()}
                        className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                    >
                        Print Receipt
                    </button>
                </div>

                {/* Delivery Info */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">📦 What's Next?</h3>
                    <p className="text-blue-700 text-sm">
                        You will receive an email confirmation shortly. Your order will be processed and shipped within 1-2 business days.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default OrderSuccessPage;
