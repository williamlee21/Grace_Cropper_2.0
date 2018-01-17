import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import {ProductList} from './ProductList';
import { removeProduct, fetchOrder } from '../store';


class Cart extends Component {
  constructor(props){
    super(props)

    // this.handleCheckout = this.handleCheckout.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentWillMount(){
    this.props.loadOrders()
  }

  handleDelete(event){
    this.props.removeProduct(Number(event.target.parentNode.id))
  }

  render () {
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
                (this.props.currentOrder && this.props.currentOrder.products) ?
                  this.props.currentOrder.products.map(
                    product => {
                      return (
                        <li key={product.id} id={product.id}>
                          {`${product.name} -
                          ${product.productOrders.quantity} - $${product.productOrders.price}`}
                            - <input defaultValue={product.productOrders.quantity} /> -
                            - <button>Update</button> -
                            - <button onClick={this.handleDelete}>Delete</button>
                        </li>
                      )
                  })
                :
                null
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
  return {
    currentOrder: storeState.orders
    }
}

function mapDispatchToProps(dispatch){
  return {
    loadOrders: () => dispatch(fetchOrder()),
    removeProduct: (id) => dispatch(removeProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
