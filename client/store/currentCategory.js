import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const SET_CATEGORY = 'SET_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategory = '';

/**
 * ACTION CREATORS
 */
export const setCategory = category => ({type: SET_CATEGORY, category})
export const removeCategory = () => ({type: REMOVE_CATEGORY});

/**
 * REDUCER
 */
export default function (state = defaultCategory, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    case REMOVE_CATEGORY:
      return defaultCategory;
    default:
      return state;
  }
}
