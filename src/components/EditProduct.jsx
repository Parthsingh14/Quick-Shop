import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { productContext } from "../contexts/ProductsContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    const product = products.find((p) => p.id == id);
    if (product) {
      setProductData(product);
    }
  }, [id, products]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = products.map((p) =>
      p.id == id ? { ...p, ...productData } : p
    );
    setProducts(updatedProducts);
    navigate(`/details/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F0] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 space-y-4"
      >
        <h2 className="text-xl font-bold text-[#714329]">Edit Product</h2>
        {["title", "price", "category", "image"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={productData[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#714329] text-white py-2 rounded hover:bg-[#5A3722]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
