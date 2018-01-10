import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS';

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const removeProducts = () => ({type: REMOVE_PRODUCTS})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return function(dispatch){
    axios.get('/api/products')
      .then( res => res.data)
      .then( products => dispatch(getProducts(products)))
      // OB/AZ: report errors to the user, not the developer, e.g. using react toastr https://tomchentw.github.io/react-toastr/
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case REMOVE_PRODUCTS:
      return defaultProducts
    default:
      return state
  }
}
