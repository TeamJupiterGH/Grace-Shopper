import axios from 'axios';

//ACTION TYPE--------------
const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const DELETE_ITEM_IN_CART = 'DELETE_ITEM_IN_CART';

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

const _deleteItemInCart = (item) => {
  return {
    type: DELETE_ITEM_IN_CART,
    item,
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

export const deleteItemInCart = (userId, item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/${userId}/cart/${item.id}`);
      dispatch(_deleteItemInCart(data));
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
    case DELETE_ITEM_IN_CART:
    console.log('this is state!!', {...state, products: state.products.filter((item) => item.id !== action.item.id)});
      return {...state, products: state.products.filter((item) => {console.log('this is item.id',item.id); console.log('this is action.item', action.item);
      return(item.id !== action.item.id)})};
    default:
      return state;
  }
}
