// // redux/slices/cartSlice.jsx
// import { createSlice } from '@reduxjs/toolkit';

// // Helper function to load cart from localStorage
// const loadCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   return savedCart ? JSON.parse(savedCart) : [];  // Default to empty array if no cart found
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: loadCartFromLocalStorage(), // Initialize from localStorage
//   reducers: {
//     // addToCart: (state, action) => {
//     //   const existingItem = state.find(item => item.id === action.payload.id);
//     //   if (!existingItem) {
//     //     state.push({ ...action.payload, quantity: 1 });
//     //   } else {
//     //     existingItem.quantity += 1;
//     //   }
//     //   // Save the updated cart to localStorage
//     //   localStorage.setItem('cart', JSON.stringify(state));
//     //   console.log("Updated Cart:", state);  // Log cart to console for debugging
//     // },
//     addToCart: (state, action) => {
//       const existingItem = state.find(
//         item => item.id === action.payload.id && item.type === action.payload.type
//       );
    
//       if (!existingItem) {
//         state.push({ ...action.payload, quantity: 1 });
//       } else {
//         existingItem.quantity += 1;
//       }
    
//       localStorage.setItem('cart', JSON.stringify(state));
//     },    
//     // removeFromCart: (state, action) => {
//     //   const updatedCart = state.filter(item => item.id !== action.payload.id);
//     //   // Save the updated cart to localStorage
//     //   localStorage.setItem('cart', JSON.stringify(updatedCart));
//     //   return updatedCart;
//     // },
//     removeFromCart: (state, action) => {
//       const updatedCart = state.filter(
//           item => !(item.id === action.payload.id && item.type === action.payload.type)
//       );
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//   },
  
//     updateQuantity: (state, action) => {
//       const item = state.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//       // Save the updated cart to localStorage
//       localStorage.setItem('cart', JSON.stringify(state));
//     },
//     clearCart: () => {
//       // Clear cart from Redux state and localStorage
//       localStorage.removeItem('cart');
//       localStorage.removeItem('selectedPlanId');
//       localStorage.removeItem('selectedDomainId');
//       localStorage.removeItem('selectedProductId');
//       return [];
//     }
//   }
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// // Helper function to load cart from localStorage
// const loadCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   return savedCart ? JSON.parse(savedCart) : []; // Default to empty array if no cart found
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: loadCartFromLocalStorage(), // Initialize from localStorage
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.find(item => item.id === action.payload.id);
//       if (!existingItem) {
//         state.push({ ...action.payload, quantity: 1 });
//       } else {
//         existingItem.quantity += 1;
//       }
//       // Save the updated cart to localStorage
//       localStorage.setItem('cart', JSON.stringify(state));
//       console.log("Updated Cart:", state);  // Log cart to console for debugging
//     },
//     removeFromCart: (state, action) => {
//       const updatedCart = state.filter(item => item.id !== action.payload.id);
//       // Save the updated cart to localStorage
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     },
    // updateQuantity: (state, action) => {
    //   const item = state.find(item => item.id === action.payload.id);
    //   if (item) {
    //     item.quantity = action.payload.quantity;
    //   }
    //   // Save the updated cart to localStorage
    //   localStorage.setItem('cart', JSON.stringify(state));
    // },
    // updateCartItem: (state, action) => {
    //   const { id, updatedItem } = action.payload;
    //   const itemIndex = state.findIndex((item) => item.id === id);
    //   if (itemIndex !== -1) {
    //     state[itemIndex] = { ...state[itemIndex], ...updatedItem };
    //     localStorage.setItem('cart', JSON.stringify(state)); // Save updated cart to localStorage
    //   }
    // },
//     clearCart: () => {
//       // Clear cart from Redux state and localStorage
      // localStorage.removeItem('cart');
      // localStorage.removeItem('selectedPlanId');
      // localStorage.removeItem('selectedDomainId');
      // localStorage.removeItem('selectedProductId');
//       return [];
//     }
//   }
// });

// export const { addToCart, removeFromCart, updateQuantity, updateCartItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// // redux/slices/cartSlice.jsx
// import { createSlice } from '@reduxjs/toolkit';

// // Helper function to load cart from localStorage
// const loadCartFromLocalStorage = () => {
//   const savedCart = localStorage.getItem('cart');
//   try {
//     const parsedCart = savedCart ? JSON.parse(savedCart) : [];
//     // Ensure all cart items are valid objects with the required fields
//     return parsedCart.filter(item => item && item.id && typeof item.quantity === 'number' && item.quantity > 0);
//   } catch (e) {
//     console.error("Error parsing cart from localStorage:", e);
//     return [];
//   }
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: loadCartFromLocalStorage(), // Initialize from localStorage
//   reducers: {
//     // Add item to cart
// // Redux slice reducer (cartSlice.jsx)
// addToCart: (state, action) => {
//   const existingItem = state.find(
//     item => item.id === action.payload.id && item.type === action.payload.type
//   );

//   if (!existingItem) {
//     state.push({ ...action.payload, quantity: 1 });
//   } 
//   // else {
//   //   existingItem.quantity += 1;
//   // }

//   // Save to localStorage
//   localStorage.setItem('cart', JSON.stringify(state));
// }
// ,
    
//     // Remove item from cart
//     removeFromCart: (state, action) => {
//       const updatedCart = state.filter(
//         item => !(item.id === action.payload.id && item.type === action.payload.type)
//       );
      
//       // Save the updated cart to localStorage
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     },

//     // Update item quantity
//     updateQuantity: (state, action) => {
//       const item = state.find(item => item.id === action.payload.id);
//       if (item && Number.isInteger(action.payload.quantity) && action.payload.quantity > 0) {
//         item.quantity = action.payload.quantity;
//       } else {
//         console.warn("Invalid quantity value:", action.payload.quantity);
//       }

//       localStorage.setItem('cart', JSON.stringify(state));
//     },

//     // Clear the entire cart
//     clearCart: () => {
//       // Clear cart from Redux state and localStorage
//       localStorage.removeItem('cart');
//       localStorage.removeItem('selectedPlanId');
//       localStorage.removeItem('selectedDomainId');
//       localStorage.removeItem('selectedProductId');
//       return [];
//     }
//   }
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// redux/slices/cartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  try {
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    // Ensure all cart items are valid objects with the required fields
    return parsedCart.filter(item => item && item.id && typeof item.quantity === 'number' && item.quantity > 0);
  } catch (e) {
    console.error("Error parsing cart from localStorage:", e);
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(), // Initialize from localStorage
  reducers: {
  addToCart: (state, action) => {
  const existingItem = state.find(
    item => item.id === action.payload.id && item.type === action.payload.type
  );

  if (!existingItem) {
    state.push({ ...action.payload, quantity: 1 });
  } 
  // else {
  //   existingItem.quantity += 1;
  // }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(state));
}
,
    // Remove item from cart
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(
        item => !(item.id === action.payload.id && item.type === action.payload.type)
      );

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);

      if (item && Number.isInteger(action.payload.quantity) && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      } else {
        console.warn("Invalid quantity value:", action.payload.quantity);
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    // Clear the entire cart
    clearCart: () => {
      // Clear cart from Redux state and localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('selectedPlanId');
      localStorage.removeItem('selectedDomainId');
      localStorage.removeItem('selectedProductIds');
      return [];
    },

    // Update cart item with new properties (e.g., price change or billing period)
    // updateCartItem: (state, action) => {
      // const { id, updatedItem } = action.payload;
      // const index = state.findIndex(item => item.id === id);

    //   if (index !== -1) {
    //     // Update the item with new properties
    //     state[index] = { ...state[index], ...updatedItem };
    //   }

    //   // Save the updated cart to localStorage
    //   localStorage.setItem('cart', JSON.stringify(state));
    // }
    updateCartItem: (state, action) => {
      const { id, type, updatedItem } = action.payload; // Destructure id, type, and updatedItem from payload
    
      // Find the index of the item matching the id and type
      const index = state.findIndex(item => item.id === id && item.type === type);
    
      if (index !== -1) {
        // Update the item with new properties
        state[index] = { ...state[index], ...updatedItem };
        
        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      } else {
        console.warn(`Cart item with id "${id}" and type "${type}" not found.`);
      }
    }
      
    
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
