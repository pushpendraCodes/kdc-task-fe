import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCombinedProduct, EditDetailsProduct, fetchCombinedProducts, fetchGrades, fetchMaterials, fetchProducts, quickEditProduct, SearchFilterProduct } from "./ProductApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  products: [],
  combinedProducts: [],
  materials: [],
  grades: [],
};

export const fetchCombinedProductsAsync = createAsyncThunk(
  "product/fetchCombinedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCombinedProducts();
      return response.combinedProduct;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);
export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProducts();
      return response;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);

export const fetchMaterialssAsync = createAsyncThunk(
  "product/fetchMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMaterials();
      console.log(response,"dfv")
      return response;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);
export const fetchGradesAsync = createAsyncThunk(
  "product/fetchGradesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchGrades();
      return response;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);
export const addCombinedProductAsync = createAsyncThunk(
  "product/addCombinedProductAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addCombinedProduct(data);
      return response.product;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);

export const quickEditProductAsync = createAsyncThunk(
  "product/quickEditProductAsync",
  async ({id,updates}, { rejectWithValue }) => {
    try {
      const response = await quickEditProduct({id,updates});
      return response.product;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);
export const EditDetailsProductAsync = createAsyncThunk(
  "product/EditDetailsProductAsync",
  async ({id,updates}, { rejectWithValue }) => {
    try {
      const response = await EditDetailsProduct({id,updates});
      return response.product;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);
export const SearchFilterProductAsync = createAsyncThunk(
  "product/SearchFilterProductAsync",
  async (query, { rejectWithValue }) => {
    try {
      const response = await SearchFilterProduct(query);
      return response.product;
    } catch (error) {
      console.error(error); // Log the error for debugging
      return rejectWithValue(error.message.msg || "Failed to fetch");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addCombinedProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCombinedProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        console.log(action.payload, "state.combinedProducts");

        if (Array.isArray(action.payload) && action.payload.length > 0) {
            state.combinedProducts.push(action.payload[0]); // This is fine with Immer
        }
    })
      .addCase(addCombinedProductAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(fetchCombinedProductsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCombinedProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.combinedProducts = action.payload;
      })
      .addCase(fetchCombinedProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(fetchProductsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.products = action.payload.products;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(fetchMaterialssAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMaterialssAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.materials = action.payload.materials;
      })
      .addCase(fetchMaterialssAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(fetchGradesAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGradesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.grades = action.payload.grades;
      })
      .addCase(fetchGradesAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(quickEditProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(quickEditProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.combinedProducts = state.combinedProducts.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(quickEditProductAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(EditDetailsProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(EditDetailsProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.combinedProducts = state.combinedProducts.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(EditDetailsProductAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
    builder
      .addCase(SearchFilterProductAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(SearchFilterProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.combinedProducts = action.payload;
      })
      .addCase(SearchFilterProductAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload, "action.payload");
        state.error = action.payload;
      });
  },
});

export const selectCombinedProducts = (state) => state.product.combinedProducts;
export const selectProducts = (state) => state.product.products;
export const selectMaterial = (state) => state.product.materials;
export const selectGrades = (state) => state.product.grades;
export const productError = (state) => state.product?.error;
export const productStatus = (state) => state.product?.status;

export default productSlice.reducer;
