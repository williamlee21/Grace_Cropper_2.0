import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class addToCart extends Component {
    constructor(){
        super()
        this.state = {}
        //this.handleAddToCart = this.handleAddToCart.bind(this)
    }

    // handleAddToCart() {
        
    // }


  render () {
    return(
        <div>
            <form>
                <button type="button">Add To Cart</button>
                <input type="number" defaultValue='1'/>
            </form>
        </div>
    )
  }
}

function mapStateToProps(storeState) {
  return {
    orders: storeState.orders
  }
}

export default connect(mapStateToProps)(addToCart);