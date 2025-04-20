import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductContext from "./contexts/ProductsContext.jsx";
import { CartProvider } from './contexts/CartContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductContext>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </ProductContext>
);
