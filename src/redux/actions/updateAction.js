import api from "../../utilities/api";
// import { getAction } from "./readAction";
// import { GET_STAFF } from "./types";

export const updateAction = (path, actionType,data, ) => async (dispatch) => {
  try {
    const res = await api.put(`${path}`, data);

    dispatch({
      type: actionType,
      payload: res.data?.object,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err)
  }
};
