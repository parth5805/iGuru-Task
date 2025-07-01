import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const apiUrl = import.meta.env.PROD ? '/api/products' : 'http://localhost:3099/api/products';
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                const data = await response.json();
                
                if (data.success) {
                    setProducts(data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch products');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-10">
                <div className="container flex justify-center items-center min-h-[400px]">
                    <Spinner loading={loading} />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-10">
                <div className="container">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Oops! Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-primary text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <section className="py-10">
                <div className="container">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4">
                            No Products Found
                        </h2>
                        <p className="text-gray-500">
                            We couldn't find any products at the moment. Please try again later.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10">
            <div className="container">
                <h1 className="text-4xl mb-8 font-bold text-gray-800">ALL PRODUCTS</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePage;
