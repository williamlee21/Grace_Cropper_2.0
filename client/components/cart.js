import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import {ProductList} from './ProductList';

class Cart extends Component {

  render () {
    // return (
    //   <h1>I AM WORKING </h1>
    // )
    
    const cart = 'a'
      if (!cart) {
        return (
          <div>
            <h1>I AM BORKEN</h1>
            <ErrorMessage message={`Sorry, we can't find your cart`} />
          </div>
        );
      } else {
      return (
        <div>
          <ul>
            {console.log(this.props)}
            {this.props.orders.map(order =>{
              return (
                <li key={order.productId}>
                  {
                    order.productId
                  }
                </li>
              )
            })}
          </ul>
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