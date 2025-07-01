import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            selectedAttributes: {}
        }));
        
        // Show success toast
        toast.success(`${product.name} added to cart!`, {
            icon: '🛒',
            duration: 1000,
            style: {
                borderRadius: '10px',
                background: '#10B981',
                color: '#fff',
            },
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-square overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-xl font-bold text-green-600 mb-3">
                    ${product.price}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 font-medium"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
