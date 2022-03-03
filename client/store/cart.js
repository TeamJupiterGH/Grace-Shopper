import axios from "axios";

//ACTION TYPE--------------
const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";

//ACTION CREATOR---------------
const _addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item,
  };
};

const getCart = (items) => {
  return {
    type: GET_CART,
    items,
  };
};

//THUNK CREATOR---------------
export const addToCart = (userId, item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${userId}/cart`, item);
      dispatch(_addToCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(getCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//INITIAL STATE--------------
const initialState = {};

//REDUCER--------------------
export default function addToCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.items;
    case ADD_TO_CART:
      return action.item;
    default:
      return state;
  }
}
