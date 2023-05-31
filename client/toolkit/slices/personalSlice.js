import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPersonal,
  getPersonal,
  getPersonalById,
} from "../../api/personalApi";

export const submitPersonal = createAsyncThunk(
  "personal/create",
  async (formData) => {
    try {
      const { data } = await createPersonal(formData);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

export const getPersonalData = createAsyncThunk("personal/get", async () => {
  try {
    const { data } = await getPersonal();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getUserPersonalData = createAsyncThunk(
  "personal/user",
  async (id) => {
    try {
      const { data } = await getPersonalById(id);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

const personalSlice = createSlice({
  name: "personal",
  initialState: {
    personalData: {},
    userPersonalData: {},
    personalMsg: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getPersonalData.fulfilled, (state, action) => {
      state.personalData = action.payload?.[0];
    });
    builder.addCase(submitPersonal.fulfilled, (state, action) => {
      state.personalMsg = action.payload;
    });
    builder.addCase(getUserPersonalData.fulfilled, (state, action)=> {
      state.userPersonalData = action.payload
    })
  },
});

export default personalSlice.reducer;
