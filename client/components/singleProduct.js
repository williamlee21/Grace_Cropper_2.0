import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'
import {fetchReviews} from '../store'

class SingleProduct extends Component {

  componentDidMount () {
    this.props.loadReviews();
  }

  render () {
    const URLId = Number(this.props.match.params.productId);
    const product = this.props.products.find(product =>
      URLId === product.id);

      if (!product) {
        return (
          <div>
            <ErrorMessage message={`Oops...we don't have this product yet...`}/>
          </div>
        );
    } else {
      return (
        <div>
          <div>Product Name: {product.name}</div>
          <img src={product.photos[0]} style={{width: 300}} />
          <div>Categories: {product.categories.map((category) => {
            return(
              <h5 key={category.id}>{category.name}</h5>
            )
          })}</div>
          <div>Price: {product.price}</div>
          <div>Description: {product.description}</div>
          <div>
            <div>Reviews: </div>
            {this.props.reviews.map((review) => {
              return(
                <div key={review.id}>
                  <h3>USER PLACEHOLDER</h3>
                  <h4>{review.rating}</h4>
                  <p>{review.comment}</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    products: storeState.products,
    reviews: storeState.reviews
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadReviews: () => dispatch(fetchReviews(ownProps))
  }
}

export default connect(mapStateToProps, mapDispatch)(SingleProduct);
