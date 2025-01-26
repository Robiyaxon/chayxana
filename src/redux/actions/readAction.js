import api from "../../utilities/api";

export const getAction = (path, actionType) => async (dispatch) => {
    try {
      const res = await api.get(path);
      dispatch({
        type: actionType,
        payload: res.data,
      });
    } catch (error) {
      console.error(`Error fetching ${path}:`, error);
      dispatch({
        type: `${actionType}_FAILURE`,
        payload: error.response?.data || error.message
      });
      throw error;
  }
  };