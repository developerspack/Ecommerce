import { createSlice } from "@reduxjs/toolkit";

import AddToToast from "@/utils/Toast/AddToToast";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // HF
    hydrateCart: (state, action) => {
      return action.payload;
    },
    // add to cart
    ADD_TO_CART: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (index >= 0) {
        let newCart = [...state.items];
        newCart[index] = {
          ...newCart[index],
          qty: newCart[index].qty + 1,
        };
        state.items = newCart;
      } else {
        let item = { ...action.payload };
        delete item.toast;
        state.items = [...state.items, item];
      }
      if (action.payload.toast) {
        AddToToast(action.payload.imageUrl, action.payload.Name, "Cart");
      }
    },
  },
});

export const { hydrateCart, ADD_TO_CART } = cartSlice.actions;

export default cartSlice.reducer;
