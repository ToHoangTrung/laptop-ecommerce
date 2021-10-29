
import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from "./material/feature/category/categorySlice";
import authReducer from "./material/feature/auth/authSlice";
import cartReducer from "./material/feature/cart/cartSlice";
import breadCrumbReducer from "./material/feature/bread-crumb/breadCrumbSlice";

const store = configureStore({
    reducer: {
        category: categoryReducer,
        auth: authReducer,
        cart: cartReducer,
        breadCrumb: breadCrumbReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store;

