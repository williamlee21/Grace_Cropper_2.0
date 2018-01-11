import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'

class SingleProduct extends Component {

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
          <div>Category: {product.category}</div>
          <div>Price: {product.price}</div>
          <div>Description: {product.description}</div>
          <div>Reviews: </div>
        </div>
      )
    }
  }
}

function mapStateToProps(storeState) {
  return {
    products: storeState.products
  }
}

export default connect(mapStateToProps)(SingleProduct);