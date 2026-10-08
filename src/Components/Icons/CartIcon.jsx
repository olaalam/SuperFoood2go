// import React from "react";
// import { useSelector } from "react-redux";
// import { BsCartCheck } from "react-icons/bs";

// const CartIcon = () => {
//   // Access cart items from the Redux store
//   const cartItems = useSelector((state) => state.cart);

//   // Calculate total quantity
//   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="relative">
//       <BsCartCheck color="mainColor" size={32}/>
//       {totalQuantity > 0 && (
//         <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
//           {totalQuantity}
//         </span>
//       )}
//     </div>
//   );
// };

// export default CartIcon;


import React from "react";
import { useSelector } from "react-redux";
import { BsCartCheck } from "react-icons/bs";

const CartIcon = () => {
  // Access cart items from the Redux store
// In your component (CartIcon.jsx)
const cartItems = useSelector((state) => state.cart); // Assuming you're using Redux to store the cart

// Calculate total quantity by summing the quantity of each item in the cart
const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

console.log("Total Quantity:", totalQuantity);

  return (
    <div className="relative">
      <BsCartCheck color="mainColor" size={32} />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
