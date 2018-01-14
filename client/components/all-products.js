import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/index';

class AllProducts extends Component{

  constructor(props){
    super(props)

    this.state = {
      currentCategory: '',
      serach: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  handleCategoryChange(event){
    this.setState({
        currentCategory:
        event.target.value === '-choose category-' ?
        ''
        :
        event.target.value
    })
  }

  render(){
    const {products} = this.props;
    const categories = [];

    products.map(product => {
      return product.categories.map( category => {
        (!categories.includes(category.name)) ?
          categories.push(category.name)
        :
        null;
      })
    })

    return (
      <div>
        <h1>Buy Our Produce! :)</h1>
        <div id="all-products-menu">
          <select name="category" onChange= {this.handleCategoryChange} >
            <option default>-choose category-</option>
              {categories.map(category => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              })}

          </select>
          <form onSubmit={this.props.searchProducts}>
            <input id="name" type="text" placeholder="search by name..." value={this.search}
            onChange={this.handleSearchChange}
            />
          <button>
            <input type="submit" value="Submit" />
          </button>
          </form>
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
    products: storeState.products,
  }
}

const mapDispatch = (dispatch) => {
  return {
    searchProducts: (event) => {
      event.preventDefault()
      console.log('event', event.target.name.id)
      dispatch(fetchProducts(event.target.name.id, event.target.name.value));
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
