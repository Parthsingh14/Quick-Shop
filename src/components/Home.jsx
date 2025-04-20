import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/ProductsContext";
import Loading from "./Loading";
import axios from "../utils/Axios";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";

function Home() {
    const [products] = useContext(productContext);
    const { search } = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 400);

    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`);
            setFilteredProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (category !== "undefined") {
            getProductsByCategory();
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

    useEffect(() => {
        const allProducts = category !== "undefined" ? filteredProducts : products;

        const filtered = allProducts?.filter((product) =>
            product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [debouncedSearch]);

    return products ? (
        <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#F0E6DD]">
            {/* Category Header */}
            {category && category !== "undefined" && (
                <div className="w-full py-4 bg-gradient-to-r from-[#714329] to-[#B08463] text-white shadow-md">
                    <h2 className="text-center font-medium text-xl tracking-wider">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h2>
                </div>
            )}

            {/* Search Bar */}
            <div className="container mx-auto px-4 sm:px-6 pt-8">
                <SearchBar onSearch={setSearchQuery} />
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 sm:px-6 py-6">
                {filteredProducts?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredProducts.map((item, index) => (
                            <Link
                                key={index}
                                to={`/details/${item.id}`}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E8D9C8] hover:border-[#B9937B] hover:-translate-y-1"
                            >
                                {/* Product Image */}
                                <div className="w-full h-52 bg-[#FAF7F2] p-4 flex items-center justify-center relative">
                                    <div
                                        className="w-full h-full bg-contain bg-no-repeat bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-4 border-t border-[#F0ECE3] bg-white">
                                    <h3 className="text-[#5A4A3A] font-medium text-sm line-clamp-2 mb-2 group-hover:text-[#714329] transition-colors duration-200">
                                        {item.title}
                                    </h3>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[#714329] font-bold text-lg">
                                            ${item.price?.toFixed(2) || "19.99"}
                                        </p>
                                        <button className="text-xs bg-[#D0B9A7] hover:bg-[#B9937B] text-white px-2 py-1 rounded-full transition-colors duration-200">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[#714329] text-lg mt-10">No products found.</p>
                )}
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#F0E6DD] flex items-center justify-center">
            <Loading />
        </div>
    );
}

export default Home;
