import axios from 'axios';

//ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

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
    try {
      const { data } = await axios.delete(`/auth/${id}`);
      dispatch(deleteProduct(data));
      history.push('/products')
    } catch (err) {
      console.log(err);
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
      return [...state].filter((item) => 
        item.id !== action.product.id
      );
    default:
      return state;
  }
}
