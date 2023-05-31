import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createForm,
  deleteForm,
  getForm,
  getFormsById,
  getSingleForm,
} from "../../api/formApi";

export const submitForm = createAsyncThunk("form/create", async (formData) => {
  try {
    const { data } = await createForm(formData);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getFormData = createAsyncThunk("form/get", async () => {
  try {
    const { data } = await getForm();
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const deleteFormData = createAsyncThunk("form/delete", async (id) => {
  try {
    const { data } = await deleteForm(id);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getSingleFormData = createAsyncThunk("form/single", async (id) => {
  try {
    const { data } = await getSingleForm(id);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

export const getUserForms = createAsyncThunk("form/users", async (id) => {
  try {
    const { data } = await getFormsById(id);
    return data;
  } catch (error) {
    return error.response.data.msg;
  }
});

const formSlice = createSlice({
  name: "form",
  initialState: {
    formMsg: "",
    submitted: false,
    data: [],
    userForms: [],
    singleForm: {},
    search: "",
  },
  reducers: {
    setFormMsg: (state, action) => {
      state.formMsg = action.payload;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.fulfilled, (state, action) => {
      state.formMsg = action.payload;
      state.submitted = true;
    });
    builder.addCase(getFormData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getSingleFormData.fulfilled, (state, action) => {
      state.singleForm = action.payload;
    });
    builder.addCase(getUserForms.fulfilled, (state, action) => {
      state.userForms = action.payload;
    });
  },
});

export const { setFormMsg, setSubmitted, setSearch } = formSlice.actions;
export default formSlice.reducer;
