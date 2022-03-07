import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import productsReducer from "./products";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productReducer from "./singleProduct";
import addToCartReducer from "./cart";
import checkoutReducer from "./checkout";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  product: productReducer,
  itemsInCart: addToCartReducer,
  checkout: checkoutReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
// export * from './products';
