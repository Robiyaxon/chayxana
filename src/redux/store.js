import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './reducers/products_reducer';
import CategoryReducer from './reducers/category_reducer';
// import authReducer from './reducers/authReducer'

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    products: ProductsReducer,
    category: CategoryReducer
  },
});

