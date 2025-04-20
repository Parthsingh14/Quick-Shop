import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { productContext } from "../contexts/ProductsContext";

function DeleteProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);

  useEffect(() => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updatedProducts = products.filter((p) => p.id != id);
      setProducts(updatedProducts);
      navigate("/");
    } else {
      navigate(`/details/${id}`);
    }
  }, [id, products, setProducts, navigate]);

  return null;
}

export default DeleteProduct;
