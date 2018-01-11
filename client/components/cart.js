import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import {ProductList} from './ProductList';

class Cart extends Component {

  render () {
    const cart = ''
      if (!cart) {
        return (
          <div>
            <ErrorMessage message={`Sorry, we can't find your cart`} />
          </div>
        );
      } else {
      return (
        <div>

        </div>
      )
    }
  }
}

function mapStateToProps(storeState) {
  return {
    orders: storeState.orders
  }
}

export default connect(mapStateToProps)(Cart);