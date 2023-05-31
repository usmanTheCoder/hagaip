import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { design, getDesign, getDesignById } from "../../api/designApi";

export const createDesign = createAsyncThunk(
  "design/create",
  async (formData) => {
    try {
      const { data } = await design(formData);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

export const getDesignData = createAsyncThunk("design/get", async () => {
  try {
    const { data } = await getDesign();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getUserDesginData = createAsyncThunk("design/user", async (id) => {
  try {
    const { data } = await getDesignById(id);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

const designSlice = createSlice({
  name: "design",
  initialState: {
    designData: {},
    userDesignData: {},
    designMsg: "",
  },
  reducers: {
    setDesignMsg: (state, action) => {
      state.designMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createDesign.fulfilled, (state, action) => {
      state.designMsg = action.payload;
    });
    builder.addCase(getDesignData.fulfilled, (state, action) => {
      state.designData = action.payload?.[0];
    });
    builder.addCase(getUserDesginData.fulfilled, (state, action)=> {
      state.userDesignData = action.payload
    })
  },
});

export const { setDesignMsg } = designSlice.actions;
export default designSlice.reducer;
