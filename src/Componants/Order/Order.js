import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../Info/utilities/databaseManager";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import Oredereditems from "../Ordereditems/Ordereditems";
import ThankYou from "../../Images/giphy.gif";
import "./Order.css";

function Order() {
  const [cart, setCart] = useState([]);
  console.log(cart)
  useEffect(() => {
    const savedCart = getDatabaseCart();
    console.log("🚀 ~ file: Order.js ~ line 16 ~ useEffect ~ savedCart", savedCart)
    const productKeys = Object.keys(savedCart);
    console.log("🚀 ~ file: Order.js ~ line 19 ~ useEffect ~ productKeys", productKeys)

    fetch("https://emmajhon-server.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  const removeProduct = (ky) => {
    const updatedCart = cart.filter((pd) => pd.key !== ky);
    setCart(updatedCart);
    removeFromDatabaseCart(ky);
  };

  const [confirmed] = useState(false);

  const clickToConfirm = () => {
    // setCart([]);
    // processOrder();
    // setConfirmed(true);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {/* <h1>You Ordered {cart.length} product[s]</h1> */}
        {cart.map((pd) => (
          <Oredereditems
            removeProduct={removeProduct}
            product={pd}
            key={pd.key}
          />
        ))}
        {confirmed && <img src={ThankYou} alt="Thank You" />}
      </div>
      <Cart cart={cart}>
        <Link to="/shipment">
          <button onClick={clickToConfirm} className="btn-custom">
            {" "}
            Go For Shipment{" "}
          </button>
        </Link>
      </Cart>
    </div>
  );
}

export default Order;
