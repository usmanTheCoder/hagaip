import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import profileSlice from "./slices/profileSlice"
import designSlice from "./slices/designSlice"
import personalSlice from "./slices/personalSlice"
import lekiumSlice from "./slices/lekiumSlice"
import formSlice from "./slices/formSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        design: designSlice,
        personal: personalSlice,
        lekium: lekiumSlice,
        form: formSlice
    }
})

export default store