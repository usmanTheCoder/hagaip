import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, updateUser } from "../../api/authApi";

export const userInfo = createAsyncThunk("user/user_info", async () => {
  try {
    const { data } = await getUser();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const userUpdate = createAsyncThunk("user/update", async (formData) => {
  try {
    const { data } = await updateUser(formData);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {},
    userUpdated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.profileData = action.payload;
    });
    builder.addCase(userUpdate.fulfilled, (state) => {
      state.userUpdated = true;
    });
  },
});

export default profileSlice.reducer;
