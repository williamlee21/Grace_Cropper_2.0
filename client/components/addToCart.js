import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToOrders } from '../store'

class addToCart extends Component {
    constructor(props){
        super(props)
        this.state = {
          quantity: '1'
        }

        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
    }

    handleAddToCart(event){
      // console.log('order info: ', event.target.id, '--', this.state.quantity, '--', event.target.attributes.getNamedItem('price').value)

      const productInfo = {
        productId : event.target.id,
        quantity : Number(this.state.quantity),
        price : Number(event.target.attributes.getNamedItem('price').value)
      }

      this.props.addProductToCart(productInfo)
    }

    handleQuantityChange(event){
      this.setState({
        quantity: event.target.value
      })
    }


  render () {
    return(
        <div>
            <form>
                <button
                  id={this.props.productId}
                  price={this.props.productPrice}
                  type="button"
                  onClick={this.handleAddToCart}>
                    Add To Cart
                </button>
                <input
                  type="number"
                  defaultValue='1'
                  onChange={this.handleQuantityChange}
                />
            </form>
        </div>
    )
  }
}

function mapStateToProps(storeState) {
  return {}
}

function mapDispatchToProps(dispatch){
  return {
    addProductToCart : order => dispatch(addToOrders(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addToCart);
