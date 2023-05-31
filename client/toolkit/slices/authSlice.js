import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJs from "crypto-js";
import {
  activate,
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  login,
  logout,
  refresh_token,
  register,
  resetPassword,
  updateRole,
} from "../../api/authApi";

export const signup = createAsyncThunk("user/register", async (formData) => {
  try {
    const { data } = await register(formData);
    return data.msg;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const verifyEmail = createAsyncThunk(
  "user/activation",
  async (activation_token) => {
    try {
      const { data } = await activate(activation_token);
      return data.msg;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refresh_token",
  async (refreshToken) => {
    try {
      const { data } = await refresh_token(refreshToken);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

export const signin = createAsyncThunk("user/login", async (formData) => {
  try {
    const { data } = await login(formData);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const signout = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await logout();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const forgot = createAsyncThunk("user/forgot", async (formData) => {
  try {
    const { data } = await forgotPassword(formData);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const reset = createAsyncThunk("user/reset", async (data) => {
  try {
    const response = await resetPassword(data);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const allUsers = createAsyncThunk("user/all", async () => {
  try {
    const { data } = await getAllUsers();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const deleteUserData = createAsyncThunk("user/delete", async (id) => {
  try {
    const { data } = await deleteUser(id);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const updateUserRole = createAsyncThunk(
  "user/role",
  async ({ id, role }) => {
    try {
      const { data } = await updateRole({ id, role });
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

export const createAdminUser = createAsyncThunk(
  "user/create_user",
  async (formData) => {
    try {
      const { data } = await createUser(formData);
      return data;
    } catch (error) {
      return error.response.data.msg;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    alertMsg: "",
    activeAlertMsg: false,
    loggedIn: false,
    disable: false,
    users: [],
    token: "",
    progress: 0,
    updateUi: false,
  },
  reducers: {
    setActiveAlertMsg: (state, action) => {
      state.activeAlertMsg = action.payload;
    },
    setAlertMsg: (state, action) => {
      state.alertMsg = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.alertMsg = action.payload;
    });
    builder.addCase(signin.pending, (state) => {
      state.progress = 50;
      state.disable = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.progress = 100;
      state.disable = false;
      state.alertMsg = action.payload;
      if (!action.payload.token) {
        return;
      }
      const data = CryptoJs.AES.encrypt(
        JSON.stringify(action.payload?.token),
        import.meta.env.VITE_REACT_APP_SECRET
      ).toString();
      if (action.payload?.msg === "Invaild email or password") {
        state.loggedIn = false;
        return;
      }
      localStorage.setItem("refreshtoken", data);
      if (localStorage.getItem("refreshtoken")) {
        state.loggedIn = true;
        localStorage.setItem("firstLogin", true);
        window.location.assign("/dashboard");
        return;
      }
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loggedIn = false;
      localStorage.clear();
      window.location.assign("/");
    });
    builder.addCase(forgot.fulfilled, (state, action) => {
      if (action.payload.msg) {
        state.alertMsg = action.payload.msg;
        return;
      } else {
        state.alertMsg = action.payload;
      }
    });
    builder.addCase(reset.pending, (state) => {
      state.disable = true;
    });
    builder.addCase(reset.fulfilled, (state, action) => {
      state.disable = false;
      state.alertMsg = action.payload;
      window.location.assign("/");
    });
    builder.addCase(allUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.updateUi = action.payload;
    });
    builder.addCase(createAdminUser.fulfilled, (state, action) => {
      state.alertMsg = action.payload;
    });
  },
});

export const {
  setActiveAlertMsg,
  setAlertMsg,
  setToken,
  setLoggedIn,
  setProgress,
} = authSlice.actions;
export default authSlice.reducer;
