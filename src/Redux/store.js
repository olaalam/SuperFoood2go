// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer, // Register the cart slice reducer
        // You can add other reducers here if needed
    },
});

export default store;


