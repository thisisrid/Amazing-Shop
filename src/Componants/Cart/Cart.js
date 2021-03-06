import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  console.log("🚀 ~ file: Cart.js ~ line 5 ~ Cart ~ cart", cart)

  // let productPrice = 0;
  // cart.map((arr) => (productPrice = productPrice + arr.price * (arr.quantity || 1) ));

   //const total = cart.reduce( (total, prd) => total + prd.price , 0 )
   let productPrice = 0;
   for(let i = 0; i< cart.length; i++){
       const product = cart[i];
       productPrice = productPrice + product.price * product.quantity || 1;
   }
  
  let shipping = 0;
  if (productPrice < 35 && productPrice !== 0) {
    shipping = 4.99;
  } else if (productPrice >= 35 && productPrice < 70) {
    shipping = 12.99;
  } else {
    shipping = 0;
  }
  const tax = +(productPrice * 0.1).toFixed(2);
  const grandTotal = (productPrice + tax + shipping).toFixed(2);

  return (
    <div>
      <h4>Order Summery </h4>
      <h5>Total Ordered: {cart.length}</h5>
      <h5>Product Price: {productPrice}</h5>
      <small>Tax: {tax}</small> <br />
      <small>Shipping Charge: {shipping}</small>
      <h4>Total : ${grandTotal}</h4>
      {props.children}
    </div>
  );
};

export default Cart;
