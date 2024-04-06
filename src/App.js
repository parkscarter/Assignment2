import React, { useState, useEffect } from "react";
import { Browse } from "./Browse";
import { Cart } from "./Cart";

export function App() {
  const [page, changePage] = useState("Browse");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productPrices, setProductPrices] = useState([]);

  useEffect(() => {
    fetch("./products.json")
      .then((response) => response.json())
      .then((json) => {
        json = json.products;
        setProducts(json);
        setCart(Object.fromEntries(json.map((product) => [product.name, 0])));
        setProductPrices(
          Object.fromEntries(
            json.map((product) => [product.name, product.price])
          )
        );
      });
  }, []);

  function removeFromCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: Math.max(0, cart[productName] - 1),
    }));
  }
  function addToCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: cart[productName] + 1,
    }));
  }

  function resetCart() {
    const updatedCart = {};
    Object.keys(cart).forEach((key) => {
      updatedCart[key] = 0; // Set the quantity of each item to zero
    });
    setCart(updatedCart); // Update the cart state with the modified cart
  }

  return (
    <div className="screen" style={{ backgroundColor: "grey" }}>
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Popular Cartoons</h1>
      </header>
      <Browse
        isActive={page === "Browse"}
        changePage={changePage}
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        productPrices={productPrices}
        products={products}
      />
      <Cart
        isActive={page === "Cart"}
        changePage={changePage}
        addToCart={addToCart}
        resetCart={resetCart}
        cart={cart}
        productPrices={productPrices}
      />
    </div>
  );
}
