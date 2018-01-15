import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
export const getOrders = (orders) => ({type: GET_ORDERS, orders})
export const addOrder = (order) => ({type: ADD_ORDER, order})

/**
 * THUNK CREATORS
 */
// export const fetchOrders = (queryType, query) => {
//   return function(dispatch){
//     axios.post('/api/orders' +(query ? '?' + queryType + '=' + query : ''))
//       .then( res => res.data)
//       .then( orders => dispatch(getOrders(orders)))
//       .catch(err => console.log(err))
//   }
// }

export const addToOrders = (order) => {
  return function(dispatch){
    axios.post('/api/orders', order)
    .then( res => res.data)
    .tap( () => dispatch(addOrder(order)))
    .catch( err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;

    case ADD_ORDER:
      return [...state, action.order];

    default:
      return state
  }
}
