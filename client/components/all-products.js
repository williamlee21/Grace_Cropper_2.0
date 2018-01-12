import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AllProducts extends Component{

  render(){
    const {products} = this.props;
    const categories = []
    products.map(product => {
      return (
        (!categories.includes(product.category)) ?
          categories.push(product.category)
        :
        null
      )}
    )

    return (
      <div>
        <h1>Buy Our Produce! :)</h1>
        <div id="all-products-menu">
          <select name="category" /*onChange= handleCategoryChange*/>
            <option default>-choose category-</option>
              {categories.map(category => {
                return (
                  <option key={category}
                    value={category}>{category}
                  </option>
                )
              })}

          </select>
          <input type="text" placeholder="search by name..."/>
        </div>
        <div id= "all-products-container">
          {
            products.length ?
            <div>
              {products.map(product => {
                return (
                  <div key={product.id} id={product.id} className="product-thumbnail">
                    {<Link to={`/products/${product.id}`}>
                      <div style={{backgroundImage:`url(${product.photos[0]})`}}
                      className="product-img">
                        {`${product.name}
                        ${product.price}`}
                      </div>
                    </Link>}
                  </div>
                )
              })
              }
            </div>
            :
            <h2>No products yet...</h2>
          }
        </div>
      </div>
    )
  }
}

const mapState = (storeState) => {
  return {
    products: storeState.products
  }
}



export default connect(mapState)(AllProducts)
