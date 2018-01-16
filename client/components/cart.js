import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import {ProductList} from './ProductList';


class Cart extends Component {

  render () {
    var currentProduct;
    const cart = 'a'
      if (!cart) {
        return (
          <div>
            <ErrorMessage message={`Sorry, we can't find your cart`} />
          </div>
        );
      } else {
      return (
        <div>
      {console.log(this.props)}
          <h2>Your Cart</h2>
          {/*
            <ul>
              {
                this.props.orders.map(order =>{
                currentProduct = this.props.products.find( product => {
                  return product.id == order.productId
                })
                // console.log(currentProduct ? currentProduct.name : 'hello', order.quantity)
                currentProduct === 'undefined' ?
                console.log('currentProduct: ', currentProduct)

                :
                <li>{order.quantity}</li>

              })

              }
            {console.log(currentProduct)}
            </ul>
          */}
        </div>
      )
    }
  }
}

function mapStateToProps(storeState) {
  var orderIdsArr = storeState.orders.map (order => {
    return Number(order.productId)
  })

  return {
    orders: storeState.orders,
    products: storeState.products.filter(product => {
      return orderIdsArr.indexOf(product.id) > -1;
    })
  }
}

export default connect(mapStateToProps)(Cart);
