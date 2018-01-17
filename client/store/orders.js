import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultOrders = {products:[]};


/**
 * ACTION CREATORS
 */
export const getOrder = (order) => {

  return {type: GET_ORDER, order}
}

export const addOrder = (order) => ({type: ADD_ORDER, order})

export const deleteProduct = (productId) => ({type: DELETE_PRODUCT, productId})

/**
 * THUNK CREATORS
 */
export const fetchOrder = (query) => {
  return function(dispatch){
    axios.get('/api/orders?status=created')
      .then( res => res.data)
      .then( order => {
        dispatch(getOrder(order))
      })
      .catch(err => console.log(err))
  }
}

export const addToOrders = (order) => {
  return function(dispatch){
    axios.post('/api/orders', order)
    .then( res => res.data)
    .catch( err => console.log(err))
  }
}

export const removeProduct = (productId) => {
  return function(dispatch){
    axios.delete(`/api/orders/product/${productId}`)
    .then(() => {
      return dispatch(fetchOrder())
    })
    .catch( err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case GET_ORDER:
      return action.order;

    case DELETE_PRODUCT:
      return state.products.filter(product => {
        return product.id !== action.productId
      });

    default:
      return state
  }
}
