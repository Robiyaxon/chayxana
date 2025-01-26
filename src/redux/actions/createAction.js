import api from "../../utilities/api";

export const createAction =
  (path, actionType, formData) => async (dispatch) => {
    try {
      const res = await api.post(path, formData);
      dispatch({
        type: actionType,
        payload: res.data?.object,
      });


    }catch (error) {
      return Promise.reject(error); 
    }
  };