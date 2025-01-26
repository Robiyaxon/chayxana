import { CREATE_ORDER, DELETE_ORDER, GET_ORDER, UPDATE_ORDER } from '../actions/types';

const initialState = {
  data: [],
};

const OrderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        data: payload
      };
    case UPDATE_ORDER:
      return {
        ...state,
        data: payload
      };
    case DELETE_ORDER:
      return {
        ...state,
        data: payload
      };
      case CREATE_ORDER:
        return {
          ...state,
          data: payload
        };
    default:
      return state;
  }
};

export default OrderReducer;