import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import {ProductList} from './ProductList';


class Cart extends Component {
  constructor(props){
    super(props)

    // this.handleCheckout = this.handleCheckout.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    // this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  // handleCheckout(event){

  // }

  // handleDelete(event){

  // }

  // handleQuantityChange(event){

  // }

  render () {
    var currentProduct = {};
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
          <h2>Your Cart</h2>
          {
            <ul>
              {
                this.props.orders.map(order =>{
                currentProduct = this.props.products.find( product => {
                  return product.id == order.productId
                })

                return (
                  currentProduct ?
                  <li key={currentProduct.id}>
                    {`${currentProduct.name} - ${order.quantity} - ${currentProduct.price}`}
                    <button>Delete</button>
                  </li>
                  :
                  null
                )
              })
              }
            </ul>
          }
          <h4>Subtotal: </h4>
          <button
            type='button'
            >
              Checkout
          </button>
        </div>
      )
    }
  }
}

function mapStateToProps(storeState) {
  var orderIdsArr = storeState.orders.map (order => {
    return Number(order.productId)
  }) // [1, 2, 3]

  return {
    orders: storeState.orders,
    products: storeState.products.filter(product => {
      return orderIdsArr.indexOf(product.id) > -1;
    })
  }
}

export default connect(mapStateToProps)(Cart);
