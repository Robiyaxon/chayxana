import api from "../../utilities/api";
import { getAction } from "./readAction";
import { GET_STAFF_TYPE } from "./types";

export const deleteAction = (path, actionType, id) => async (dispatch) => {
    try {
      const res = await api.delete(`${path}/${id}/`);
      dispatch({
        type: actionType,
        payload: res.data,
      });
      if (path === "staff/type/delete") {
        dispatch(getAction("staff/type/list/", GET_STAFF_TYPE));
      }
      // dispatch(getAction("group/get/all/admin", GET_STAFF));
    } catch (error) {
      return Promise.reject(error); 
    }
  };