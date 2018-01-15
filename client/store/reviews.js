import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS';
const REMOVE_REVIEWS = 'REMOVE_REVIEWS';

/**
 * DUMMY REVIEWS
 */

 //OB/AZ - remove dummy data to make call to DB
 const dummyReviews = [
  {
    comment: 'this is tasty',
    rating: 5,
    userId: 1,
    productId: 9,
    id: 1
  },
  {
    comment: 'this is not tasty',
    rating: 1,
    userId: 6,
    productId: 4,
    id: 2
  },
  {
    comment: 'this is just okay',
    rating: 2,
    userId: 8,
    productId: 12,
    id: 3
  },
 ]

/**
 * INITIAL STATE
 */
const defaultReviews = [];

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})

//OB/AZ - Only remove one review, not all
const removeReviews = () => ({type: REMOVE_REVIEWS})

/**
 * THUNK CREATORS
 */
export const fetchReviews = (ownProps) => {
  return function(dispatch){
    const productReviews = dummyReviews.filter((review) => review.productId === Number(ownProps.match.params.productId));
    dispatch(getReviews(productReviews));
    // axios.get('/api/reviews')
    //   .then( res => res.data)
    //   .then( reviews => dispatch(getReviews(reviews)))
    //   .catch(err => console.log(err))
  }
}

/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case REMOVE_REVIEWS:
      return defaultReviews
    default:
      return state
  }
}
