import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Router} from 'react-router-dom';
import history from './history';
import {Navbar, Login, Signup, UserHome, AllProducts, SingleProduct, Cart} from './components';
import {me, fetchProducts, fetchCategories, setCategory, fetchOrder } from './store';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadProducts();
    this.props.loadCategories();
    // this.props.loadOrders();
  }

  render () {
    const {isLoggedIn, products} = this.props;

    return (
      <Router history={history}>
        <Navbar>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route exact path="/cart" component={Cart}/>
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/cart" component={Cart}/>
            <Route component={Login} />
          </Switch>
        </Navbar>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (storeState) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!storeState.user.id,
    // products: storeState.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(fetchProducts()),
    loadCategories: () => dispatch(fetchCategories()),
    // loadOrders: () => dispatch(fetchOrder()),
  }
}

export default connect(mapState, mapDispatch)(Routes)
