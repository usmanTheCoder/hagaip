import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChaps, getLekium, getSubChaps, lekium } from "../../api/lekiumApi";

export const createLekium = createAsyncThunk(
  "lekium/create",
  async (formData) => {
    try {
      const { data } = await lekium(formData);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

export const getLekiumData = createAsyncThunk("lekium/get", async () => {
  try {
    const { data } = await getLekium();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getChapsData = createAsyncThunk("lekium/chaps", async () => {
  try {
    const { data } = await getChaps();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getSubChapsData = createAsyncThunk(
  "lekium/subChaps",
  async (chapterName) => {
    try {
      const { data } = await getSubChaps(chapterName);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

const lekiumSlice = createSlice({
  name: "lekium",
  initialState: {
    lekiumData: [],
    lekiumMsg: "",
    chaps: [],
    subChaps: [],
    lekiumImg: "",
  },
  reducers: {
    setLekiumMsg: (state, action) => {
      state.lekiumMsg = action.payload;
    },
    setLekiumImg: (state, action) => {
      state.lekiumImg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createLekium.fulfilled, (state, action) => {
      state.lekiumMsg = action.payload;
    });
    builder.addCase(getLekiumData.fulfilled, (state, action) => {
      state.lekiumData = action.payload;
    });
    builder.addCase(getChapsData.fulfilled, (state, action) => {
      state.chaps = action.payload;
    });
    builder.addCase(getSubChapsData.fulfilled, (state, action) => {
      state.subChaps = action.payload;
    });
  },
});

export const { setLekiumMsg, setLekiumImg } = lekiumSlice.actions;
export default lekiumSlice.reducer;
