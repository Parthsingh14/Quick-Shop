import { useContext } from "react";
import { productContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";

const Recommended = ({ currentProductId, category }) => {
  const [products] = useContext(productContext);

  // Hardcoded AI-like filter logic based on category
  const recommended = products
    .filter(
      (p) =>
        p.category === category &&
        p.id !== currentProductId // exclude current product
    )
    .slice(0, 4); // limit to 4 suggestions

  return (
    <div className="mt-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-[#714329]">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommended.map((item) => (
          <Link
            to={`/details/${item.id}`}
            key={item.id}
            className="bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-contain p-4"
            />
            <div className="p-4">
              <h3 className="text-md font-medium text-[#714329] mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#5A4A3A]">${item.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
        {recommended.length === 0 && (
          <p className="text-[#999] col-span-full">No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default Recommended;
