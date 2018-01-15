import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import products from './products';
import reviews from './reviews';
import categories from './categories';
import currentCategory from './currentCategory';
import orders from './orders';

const reducer = combineReducers({user, products, reviews, categories, currentCategory, orders});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './reviews';
export * from './categories';
export * from './currentCategory';
export * from './orders';
