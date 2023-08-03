import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import favReducer from "./slice/favSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    fav: favReducer,
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});
