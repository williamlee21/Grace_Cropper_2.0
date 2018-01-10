import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllProducts extends Component{

  constructor(props){
    super(props)
  }

  render(){
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
          {
            // map products & render single-product
          }
        </div>
      </div>
    )
  }

}

function mapState(){
  return {}
}

export default connect(mapState)(AllProducts)
