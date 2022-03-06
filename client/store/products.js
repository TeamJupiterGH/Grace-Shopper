import axios from 'axios';

const TOKEN = 'token';

//ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//ACTION CREATOR
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

//THUNK
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const _deleteProduct = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data } = await axios.delete(`/api/products/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteProduct(data));
      history.push('/products');
    } catch (err) {
      console.log(err);
    }
  };
};

export const _addProduct = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data } = await axios.post('/api/products', product, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addProduct(data));
      history.push('/products');
    } catch (error) {
      console.log(error);
    }
  };
};

export const _editProduct = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data } = await axios.put(`/api/product/${product.id}`, product, {
        headers: {
          authorization: token,
        },
      });
      dispatch(editProduct(data));
      history.push('/products');
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return [...state].filter((item) => item.id !== action.product.id);
    case ADD_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return state.map((product) => product.id === action.product.id ? action.product:product)
    default:
      return state;
  }
}
