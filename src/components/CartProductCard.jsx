import { useDispatch } from "react-redux";
import { decrementQty, incrementQty } from "../store/cartSlice";
import toast from 'react-hot-toast';

const CartProductCard = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementQty(item.productId));
        toast.success(`Increased ${item.name} quantity`, {
            icon: '➕',
            duration: 1500,
            style: {
                fontSize: '14px',
            }
        });
    };

    const handleDecrement = () => {
        if (item.quantity === 1) {
            toast.error(`${item.name} removed from cart`, {
                icon: '🗑️',
                duration: 1500,
            });
        } else {
            toast.success(`Decreased ${item.name} quantity`, {
                icon: '➖',
                duration: 1500,
                style: {
                    fontSize: '14px',
                }
            });
        }
        dispatch(decrementQty(item.productId));
    };

    return (
        <div key={item.productId} className="flex justify-between gap-2 mb-5 border-b pb-4">
            <div className="w-[70%] flex justify-between gap-2">
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="font-bold text-green-600">${item.price}</p>
                </div>
                {/* quantity */}
                <div className="flex flex-col items-center justify-between h-[120px]">
                    <button
                        data-testid="cart-item-amount-increase"
                        className="border border-black w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        onClick={handleIncrement}
                    >
                        +
                    </button>
                    <span data-testid="cart-item-amount" className="font-semibold">
                        {item.quantity}
                    </span>
                    <button
                        data-testid="cart-item-amount-decrease"
                        className="border border-black w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        onClick={handleDecrement}
                    >
                        -
                    </button>
                </div>
            </div>
            <div className="w-[30%]">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-[120px] object-cover rounded"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x120?text=No+Image';
                    }}
                />
            </div>
        </div>
    );
};

export default CartProductCard;
