import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, setCategory, removeCategory } from '../store/index';
import { AddToCart } from './index'
class AllProducts extends Component{

  constructor(props){
    super(props);

    this.state = {
      currentCategory: '',
      search: ''
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.searchProducts(event);
  }

  render(){
    const {categories} = this.props;
    const products = this.props.currentCategory.length ? this.props.products.filter((product) => {
      return product.categories.find((category) => {
        return category.name === this.props.currentCategory;
      });
    }) : this.props.products;

    return (
      <div>
        <h1>Buy Our Produce! :)</h1>
        <div id="all-products-menu">
          <select name="category" onChange= {this.props.refineByCategory} >
            <option default>-choose category-</option>
              {categories.map(category => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
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
                    <AddToCart
                      productId={product.id}
                      productPrice={product.price}/>
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
    categories: storeState.categories,
    currentCategory: storeState.currentCategory
  }
}

const mapDispatch = (dispatch) => {
  return {
    searchProducts: (event) => {
      event.preventDefault()
      dispatch(fetchProducts(event.target.name.id, event.target.name.value));
    },
    refineByCategory: (event) => {
      event.preventDefault()
      if(event.target.value !== '-choose category-') {
        dispatch(setCategory(event.target.value))
      } else {
        dispatch(removeCategory())
      }
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
