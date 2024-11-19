import { configureStore } from "@reduxjs/toolkit"
import authslice from "./slice/auth/authslice.js"
import { apiSlice } from "./slice/auth/apislice.js"
import cartSlice  from "./slice/cart/cartSlice.js"

const store = configureStore({
    reducer: {
        auth: authslice,
        cart: cartSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store