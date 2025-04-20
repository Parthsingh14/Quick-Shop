import axios from "../utils/Axios";
import { createContext, useEffect, useState } from "react";

export const productContext = createContext();
function ProductContext(props) {
  const [products, setproducts] = useState(null);

  const getproducts = async () => {
    try {
      const { data } = await axios("/products");
      setproducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products)

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <productContext.Provider value={[products, setproducts]}>
      {props.children}
    </productContext.Provider>
  );
}

export default ProductContext;
