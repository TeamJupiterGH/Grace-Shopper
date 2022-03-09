import axios from "axios";

//action type
const GUEST_CHECKOUT = "GUEST_CHECKOUT";

//action creator
const _guest_checkout = (item) => {
  return { type: GUEST_CHECKOUT, item };
};

//thunk creator
export const guestCheckout = (firstName, lastName, email) => {
  return async (dispatch) => {
    console.log("DATA IN CHECKOUT", firstName, lastName, email);
    let tempCart = JSON.parse(localStorage.getItem('tempCart'));
    try {
        
      const { data } = await axios.post('/api/guests/guest', {firstName, lastName, email, tempCart}
      );
      console.log(data);
      
      dispatch(_guest_checkout(data));
    } catch (error) {
      console.log('error in guestCheckout', error);
    }
  };
};

//initial state
const initialState = {};

//reducer
export default function guestCheckoutReducer(state = initialState, action) {
  switch (action.type) {
    case GUEST_CHECKOUT:
      return action.item;
    default:
      return state;
  }
}
