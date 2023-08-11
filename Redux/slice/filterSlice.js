import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    FILTER_BY_SEARCH: (state, action) => {
      const { products, search } = action.payload;
      // handle search/filter
      const FilteredItems = products.filter(
        (item) =>
          item.Name.toLowerCase().includes(search.toLowerCase()) ||
          item.Category.toLowerCase().includes(search.toLowerCase()) ||
          item.Description.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = FilteredItems;
    },
    // sorting
    SORT_PRODUCTS: (state, action) => {
      const { products, sort } = action.payload;

      let Items = [];

      if (sort === "latest") {
        Items = products;
      }

      if (sort === "lowest_Price") {
        Items = products.slice().sort((a, b) => {
          return a.Price - b.Price;
        });
      }

      if (sort === "highest_Price") {
        Items = products.slice().sort((a, b) => {
          return b.Price - a.Price;
        });
      }

      if (sort === "a-z") {
        Items = products.slice().sort((a, b) => {
          return a.Name.localeCompare(b.Name);
        });
      }

      if (sort === "z-a") {
        Items = products.slice().sort((a, b) => {
          return b.Name.localeCompare(a.Name);
        });
      }
      state.filteredProducts = Items;
    },
    // filter by category
    FILTER_BY_CATEGORY: (state, action) => {
      const { products, category } = action.payload;

      let FilteredItems = [];
      if (category === "All") {
        FilteredItems = products;
      } else {
        FilteredItems = products.filter(
          (product) => product.Category === category
        );
      }

      state.filteredProducts = FilteredItems;
    },
    // filter by brand
    FILTER_BY_BRAND: (state, action) => {
      const { products, brand } = action.payload;

      let FilteredItems = [];
      if (brand === "All") {
        FilteredItems = products;
      } else {
        FilteredItems = products.filter((product) => product.Brand === brand);
      }

      state.filteredProducts = FilteredItems;
    },
    // filter by price
    FILTER_BY_PRICE: (state, action) => {
      const { products, price } = action.payload;
      let FilteredItems = [];

      FilteredItems = products.filter((product) => product.Price <= price);
      state.filteredProducts = FilteredItems;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const SelectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
