import { useDispatch, useSelector } from "react-redux";
import { clearCart, closeCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from 'react-hot-toast';
import CartProductCard from "./CartProductCard";

const CartOverlay = ({ isCartOpen }) => {
    const cart = useSelector((state) => state.cart.items);
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const handlePlaceOrder = async () => {
        if (cart.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }

        setIsPlacingOrder(true);

        // Create order details
        const orderDetails = {
            orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
            orderDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            items: cart,
            totalItems: totalItemsCount,
            totalPrice: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save order to localStorage
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        
        // Clear cart and close cart overlay
        dispatch(clearCart());
        dispatch(closeCart());
        
        // Show success toast
        toast.success('Order placed successfully!', {
            icon: '🎉',
            duration: 2000,
        });
        
        setIsPlacingOrder(false);
        
        // Navigate to success page after a short delay
        setTimeout(() => {
            navigate('/order-success');
        }, 500);
    };

    return (
        <>
            <div
                className={`absolute px-4 py-6 top-[100%] right-[10%] shadow bg-white z-50 flex flex-col gap-4 w-[400px] ${
                    !isCartOpen && "hidden "
                }`}
                data-testid="cart-overlay"
            >
                <h3 className="font-raleway">
                    <span className="font-bold">My Bag,</span>{" "}
                    <span data-testid="cart-total">{totalItemsCount}</span>{" "}
                    {totalItemsCount === 1 ? "item" : "items"}
                </h3>
                {/* cart items */}
                <div className="max-h-[400px] overflow-auto">
                    {totalItemsCount === 0 ? (
                        <p className="font-raleway text-gray-500">Cart is empty</p>
                    ) : (
                        cart.map((item) => <CartProductCard key={item.productId} item={item} />)
                    )}
                </div>
                {/* total price  */}
                <div className="flex justify-between font-semibold">
                    <p>Total Price:</p>
                    <p>
                        $
                        {cart
                            .reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                            )
                            .toFixed(2)}
                    </p>
                </div>
                {/* place order btn  */}
                <button
                    disabled={totalItemsCount === 0 || isPlacingOrder}
                    className={`px-6 py-3 rounded w-full uppercase font-medium transition-colors duration-200 ${
                        totalItemsCount === 0 || isPlacingOrder
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-green-600 cursor-pointer"
                    }`}
                    onClick={handlePlaceOrder}
                >
                    {isPlacingOrder ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                        </div>
                    ) : (
                        "Place order"
                    )}
                </button>
            </div>
        </>
    );
};

export default CartOverlay;
