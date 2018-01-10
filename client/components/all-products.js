import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class AllProducts extends Component{

  // OB/AZ: undead code, dispel it (cut it out before it hits master)
  // constructor(props){
  //   super(props)
  // }

  render(){
    const {products} = this.props;
    // OB/AZ: also burn your logs
    console.log(products)
    return (
      <div>
        <h1>all products</h1>
        <div id="all-products-menu">
          <select name="category" /*onChange= handleCategoryChange*/>
            <option default>-choose category-</option>
            {/* map categories */}
          </select>
          <input type="text" placeholder="search by name..."/>
        </div>
        <div id= "all-products-container">
          <ul>
            {/*
              products.map(product => {
                return (
                  <li key={product.id} id={product.id}>
                    <Link to={`/products/${product.id}`}>
                        {`${product.name} ${product.price}`}
                    </Link>
                  </li>
                )
              })
            */  }
          </ul>
        </div>
      </div>
    )
  }

}

function mapState(storeState){
  return {
    products: storeState.products,
  }
}


export default connect(mapState)(AllProducts)
