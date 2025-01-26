import { CREATE_PRODUCTS, DELETE_PRODUCTS, GET_PRODUCTS, UPDATE_PRODUCTS } from '../actions/types';

const initialState = {
  data: [],
};

const ProductsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        data: payload
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        data: payload
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        data: payload
      };
      case CREATE_PRODUCTS:
        return {
          ...state,
          data: payload
        };
    default:
      return state;
  }
};

export default ProductsReducer;