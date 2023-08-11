import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
    // get price max,min
    GET_MAX_MIN_PRICE: (state, action) => {
      const { products } = action.payload;
      const array = [];
      products.map((item) => {
        const price = parseFloat(item.Price);
        return array.push(price);
      });

      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_PRODUCTS, GET_MAX_MIN_PRICE } = productSlice.actions;

// specific items
export const SelectProducts = (state) => state.product.products;
export const SelectMinPrice = (state) => state.product.minPrice;
export const SelectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
