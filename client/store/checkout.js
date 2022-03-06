import axios from "axios";

//action type
const CHECKOUT = "CHECKOUT";

//action creator
const _checkout = (item) => {
  return { type: CHECKOUT, item };
};

//thunk creator
export const checkout = (userId, item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/checkout`, item);
      console.log("DATA IN CHECKOUT", item);
      dispatch(_checkout(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//initial state
const initialState = {};

//reducer
export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT:
      return action.item;
    default:
      return state;
  }
}
