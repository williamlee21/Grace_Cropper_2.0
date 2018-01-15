import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const REMOVE_CATEGORIES = 'REMOVE_CATEGORIES';

/**
 * INITIAL STATE
 */
const defaultCategories = [];

/**
 * ACTION CREATORS
 */
export const getCategories = categories => ({type: GET_CATEGORIES, categories})
export const removeCategories = () => ({type: REMOVE_CATEGORIES})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => {
  return function(dispatch){
    axios.get('/api/categories')
      .then( res => res.data)
      .then( categories => dispatch(getCategories(categories)))
      .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    case REMOVE_CATEGORIES:
      return defaultCategories
    default:
      return state
  }
}
