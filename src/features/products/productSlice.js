import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchRequest = async ({ url }) => {
  const initialRes = await fetch(url);
  const finalRes = await initialRes.json();
  return finalRes;
};

const initialState = {
  value: 0,
  getSingleProductStatus: "idle",
  getAllProductStatus: "idle",
  productList: [],
  fetchedProducts: {},
  productToDisplay: {},
};

const GET_PRODUCTS = "https://swapi.dev/api/planets";

export const findAllProducts = async () => {
  try {
    const { results } = await fetchRequest({ url: GET_PRODUCTS });
    return results;
  } catch (error) {
    return [];
  }
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/allProduct",
  async () =>
    // url, thunkAPI
    {
      const response = await findAllProducts();
      return response;
    }
);

export const fetchProductAsync = createAsyncThunk(
  "product/fetchProduct",
  async (url, thunkAPI) => {
    const cachedResponse = thunkAPI.getState()?.product?.fetchedProducts[url];
    if (!cachedResponse) {
      const response = await fetchRequest({ url });

      return response;
    }
    return cachedResponse;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.rejected, (e) => {
        console.log("product fetch rejected", e);
      })
      .addCase(fetchProductAsync.pending, (state) => {
        state.getSingleProductStatus = "loading";
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.getSingleProductStatus = "idle";
        state.fetchedProducts[action.payload.url] = action.payload;
        state.productToDisplay = action.payload;
      })
      .addCase(fetchAllProductAsync.rejected, (e) => {
        console.log("product fetch rejected", e);
      })
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.getAllProductStatus = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.getAllProductStatus = "idle";
        state.productList = action.payload;
      });
  },
});

export const getDisplayProduct = (state) => state.product.productToDisplay;
export const getSingleProductStatus = (state) => state.product.getSingleProductStatus;

export const getAllProduct = (state) => state.product.productList;
export const getAllProductStatus = (state) => state.product.getAllProductStatus;

// export const { setProductList } = productSlice.actions;

export default productSlice.reducer;
