import { createSlice } from "@reduxjs/toolkit";

import AddToToast from "@/utils/Toast/AddToToast";

const initialState = {
  items: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    // HF
    hydrateFav: (state, action) => {
      return action.payload;
    },
    // add to fav
    ADD_TO_FAV: (state, action) => {
      let item = { ...action.payload };
      state.items = [...state.items, item];

      if (action.payload.toast) {
        AddToToast(action.payload.imageUrl, action.payload.Name, "Favourites");
      }
    },
    // remove item from fav
    REMOVE_FROM_FAV: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      state.items = newBasket;
    },

    //empty fav
    EMPTY_FAV: (state, action) => {
      state.items = [];
    },
  },
});

export const { hydrateFav, ADD_TO_FAV, EMPTY_FAV, REMOVE_FROM_FAV } =
  favSlice.actions;

export const SelectFavItems = (state) => state.fav.items;

export default favSlice.reducer;
