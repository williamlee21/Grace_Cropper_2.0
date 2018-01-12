import React, { Component } from 'react';

const ProductList = (props) => {
  return (
    <div>
      {
        props.cart.products.map(product => {
          return (
            <div>
              <div>Product Name: {product.name}</div>
              <img src={product.photos[0]} style={{width: 100}} />
              <div>Category: {product.category}</div>
              <div>Price: {product.price}</div>
              <div>Description: {product.description}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductList;
