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
    // increase and decrease items qty
    UPDATEQTY: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        if (action.payload.qty >= 1) {
          newBasket[index] = action.payload;
          state.items = newBasket;
        } else {
          newBasket.splice(index, 1);
          state.items = newBasket;
        }
      } else {
        console.log("Product Not Presesent in the cart");
      }
    },

    // remove item from cart
    REMOVE_FROM_CART: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      state.items = newBasket;
    },

    //empty cart
    EMPTY_CART: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  hydrateCart,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  UPDATEQTY,
} = cartSlice.actions;

// EXPORT SPECIFIC ITEMS
export const SelectItems = (state) => state.cart.items;
export const SelectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.Price * item.qty, 0);

export default cartSlice.reducer;
