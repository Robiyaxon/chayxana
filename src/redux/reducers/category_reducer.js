import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from '../actions/types';

const initialState = {
  data: [],
};

const CategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        data: payload
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        data: payload
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        data: payload
      };
      case CREATE_CATEGORY:
        return {
          ...state,
          data: payload
        };
    default:
      return state;
  }
};

export default CategoryReducer;