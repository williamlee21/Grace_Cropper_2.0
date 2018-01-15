import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS';

//OB/AZ - Add Products, edit and delete for Admins

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({type: GET_PRODUCTS, products})
//OB/AZ - To update to remove one product
export const removeProducts = () => ({type: REMOVE_PRODUCTS})

/**
 * THUNK CREATORS
 */
export const fetchProducts = (queryType, query) => {
  return function(dispatch){
    //OB/AZ - Second parameter will take an object for params
    axios.get('/api/products' +(query ? '?' + queryType + '=' + query : ''))
      .then( res => res.data)
      .then( products => dispatch(getProducts(products)))
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
    //OB/AZ - this will currently remove all products --> Filter to remove only one
    case REMOVE_PRODUCTS:
      return defaultProducts
    default:
      return state
  }
}
