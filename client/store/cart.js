import axios from 'axios';

//ACTION TYPE--------------
const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const GET_GUEST_CART = 'GET_GUEST_CART';
const DELETE_ITEM_IN_CART = 'DELETE_ITEM_IN_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const TOKEN = 'token';
const token = window.localStorage.getItem(TOKEN);

//ACTION CREATOR---------------
const _addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    item,
  };
};

export const getCart = (items) => {
  return {
    type: GET_CART,
    items,
  };
};

export const getGuestCart = (items) => {
  return {
    type: GET_GUEST_CART,
    items,
  };
};

const _deleteItemInCart = (item) => {
  return {
    type: DELETE_ITEM_IN_CART,
    item,
  };
};

const _updateQuantity = (item) => {
  return {
    type: UPDATE_QUANTITY,
    item,
  };
};

//THUNK CREATOR---------------
export const addToCart = (userId, item) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      //req.body = {firstName: "Sara", lastName:"S", email:"ss@gmail.com", tempCart: [localStorage]}
      //item => {...item, tempCart: [localStorage]}
      const { data } = await axios.post(`/api/users/${userId}/cart`, item, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_addToCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/users/${userId}/cart`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(getCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchGuestCart = (guestId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/guests/${guestId}/cart`);
      console.log('this is fetch guest cart data!!!--->', data);
      dispatch(getGuestCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteItemInCart = (userId, item) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(
        `/api/users/${userId}/cart/${item.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_deleteItemInCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatedQuantity = (userId, item) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.put(
        `/api/users/${userId}/cart/${item.productId}`,
        item,
        { headers: { authorization: token } }
      );

      dispatch(_updateQuantity(data));
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
    case GET_GUEST_CART:
      console.log('get guest cart state-----', action.items);
      return action.items;
    case ADD_TO_CART:
      return action.item;
    case DELETE_ITEM_IN_CART:
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.item.productId
        ),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.item.productId
            ? { ...item, order_details: action.item }
            : item
        ),
      };

    default:
      return state;
  }
}
