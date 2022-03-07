import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT'

const TOKEN = 'token';


export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};
export const _editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (product, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_editProduct(data));
      //console.log('history --->', history)
      //history.push(`/products/${product.id}`);
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
      case EDIT_PRODUCT:
        console.log('reducer--->', action.product)
        return action.product
    default:
      return state;
  }
}
