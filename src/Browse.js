import React, { useState, useEffect } from "react";

export function Browse({
  isActive,
  changePage,
  cart,
  removeFromCart,
  addToCart,
  productPrices,
  products,
}) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    var cartEmpty = Object.values(cart).every((item) => item === 0);
    const checkoutButton = document.getElementById("checkout-button");
    if (cartEmpty) {
      checkoutButton.classList.add("collapse");
    } else {
      checkoutButton.classList.remove("collapse");
    }
  }, [cart]);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  function handleSearchChange(event) {
    if (event) {
      let filtered = products.filter((product) =>
        product.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFiltered(filtered);
    }
  }
  function doneShopping() {
    setFiltered(products);
    changePage("Cart");
  }

  return !isActive ? (
    <></>
  ) : (
    <div className="grid grid-cols-12">
      <div className="col-span-1 p-4">
        <input
          type="text"
          name="price"
          id="price"
          className="block rounded-md border-0 py-2 pl-3 pr-10 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
          onChange={handleSearchChange}
        />
      </div>

      <div className="col-span-9 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {filtered.map((product) => (
            <div key={product.id}>
              <div className="w-full h-60 overflow-hidden rounded-md bg-gray-100 lg:h-72">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white">{product.name}</h3>
                  <p className="text-sm text-white">
                    Released: {product.release}
                  </p>
                </div>
                <p className="text-sm font-medium text-white">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <br></br>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => removeFromCart(product.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  -
                </button>
                <span style={{ color: "white" }}>
                  &emsp; {cart[product.name]} &emsp;
                </span>
                <button
                  onClick={() => addToCart(product.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 p-4 ">
        <div>
          <div className="bg-white border-white border-2 p-4 rounded">
            <h1>Cart</h1>
            <div className="text-left">
              {Object.keys(cart).map((key) =>
                cart[key] > 0 ? (
                  <div key={key}>
                    {key}: {cart[key]} x ${productPrices[key].toFixed(2)}
                  </div>
                ) : null
              )}
            </div>
            <br></br>
            <div>
              Total without Tax: $
              {Object.keys(cart)
                .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                .reduce(
                  (total, price, index) =>
                    total + price * cart[Object.keys(cart)[index]],
                  0
                )
                .toFixed(2)}
            </div>
            <br></br>
            <div>
              Tax: $
              {Object.keys(cart)
                .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                .reduce(
                  (total, price, index) =>
                    total + 0.06 * price * cart[Object.keys(cart)[index]],
                  0
                )
                .toFixed(2)}
            </div>
            <br></br>
            <div>
              Total: $
              {Object.keys(cart)
                .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                .reduce(
                  (total, price, index) =>
                    total +
                    price * cart[Object.keys(cart)[index]] +
                    0.06 * price * cart[Object.keys(cart)[index]],
                  0
                )
                .toFixed(2)}
            </div>
          </div>
        </div>

        <button
          id="checkout-button"
          onClick={() => {
            doneShopping();
          }}
          className="bg-green-500 hover:bg-green-700 py-4 px-4 border-green-700 rounded"
        >
          🛒
        </button>
      </div>
    </div>
  );
}
