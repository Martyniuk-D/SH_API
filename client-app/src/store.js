import RootReducer from "./Redusers/RootReducer"
import { createStore/* , applyMiddleware */ } from "redux";
/* import thunk from "redux-thunk"; */

/* let createStoreWithMiddleware = applyMiddleware(thunk)(createStore); */
let store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;