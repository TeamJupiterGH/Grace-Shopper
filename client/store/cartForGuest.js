//action type
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
//action creator
export const addItemToGuestCart = (item) => {
  return {
    type: ADD_ITEM_TO_CART,
    item,
  };
};

//initial state
const initialState = [];

//reducer
export default function addItemToGuestCartReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.item];
    default:
      return state;
  }
}
