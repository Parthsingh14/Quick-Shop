import { useContext, useState } from "react"
import { productContext } from "../contexts/ProductsContext"
import { nanoid } from "nanoid"
import { useNavigate } from "react-router-dom"

function Create() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(productContext)
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        category: "",
        price: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const AddProductHandler = (e) => {
        e.preventDefault();

        if (!Object.values(formData).every(Boolean)) {
            alert("Please fill in all fields")
            return
        }

        const newProduct = {
            id: nanoid(),
            ...formData,
            price: parseFloat(formData.price)
        };

        setProducts([...products, newProduct])
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#F0E6DD] flex items-center justify-center p-4 sm:p-6">
            <form 
                onSubmit={AddProductHandler} 
                className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
            >
                <div className="mb-6 pb-4 border-b border-[#E8D9C8]">
                    <h1 className="text-2xl sm:text-3xl font-medium text-[#714329]">
                        Add New Product
                    </h1>
                    <p className="text-sm text-[#B5A192] mt-1">
                        Fill in the details below to add a new product
                    </p>
                </div>
                
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-[#714329] mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Product title"
                            className="w-full px-4 py-3 border border-[#D0B9A7] rounded-lg focus:ring-2 focus:ring-[#B9937B] focus:border-[#B9937B] transition-all duration-200"
                            onChange={handleChange}
                            value={formData.title}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#714329] mb-2">Image URL</label>
                        <div className="flex items-center space-x-3">
                            <input
                                type="url"
                                name="image"
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 px-4 py-3 border border-[#D0B9A7] rounded-lg focus:ring-2 focus:ring-[#B9937B] focus:border-[#B9937B] transition-all duration-200"
                                onChange={handleChange}
                                value={formData.image}
                                required
                            />
                            {formData.image && (
                                <div className="hidden sm:block w-12 h-12 bg-[#FAF7F2] border border-[#E8D9C8] rounded-md overflow-hidden">
                                    <img 
                                        src={formData.image} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-[#714329] mb-2">Category</label>
                            <select
                                name="category"
                                className="w-full px-4 py-3 border border-[#D0B9A7] rounded-lg focus:ring-2 focus:ring-[#B9937B] focus:border-[#B9937B] transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MTQzMjkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDEwIDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_1rem]"
                                onChange={handleChange}
                                value={formData.category}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="home">Home & Garden</option>
                                <option value="books">Books</option>
                                <option value="beauty">Beauty</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#714329] mb-2">Price ($)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#714329]">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    className="w-full pl-8 pr-4 py-3 border border-[#D0B9A7] rounded-lg focus:ring-2 focus:ring-[#B9937B] focus:border-[#B9937B] transition-all duration-200"
                                    onChange={handleChange}
                                    value={formData.price}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#714329] mb-2">Description</label>
                        <textarea
                            rows="5"
                            name="description"
                            placeholder="Detailed product description..."
                            className="w-full px-4 py-3 border border-[#D0B9A7] rounded-lg focus:ring-2 focus:ring-[#B9937B] focus:border-[#B9937B] transition-all duration-200"
                            onChange={handleChange}
                            value={formData.description}
                            required
                        ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-[#714329] to-[#B08463] hover:from-[#5A3722] hover:to-[#8B6B4A] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 border-2 border-[#B9937B] text-[#714329] font-medium py-3 px-6 rounded-lg hover:bg-[#F0E6DD] transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create