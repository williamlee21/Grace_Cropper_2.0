import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
// import PropTypes from 'prop-types'
import history from './history'
import {Navbar, Login, Signup, UserHome, AllProducts} from './components'
import {me, fetchProducts } from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadProducts()
  }

  render () {
    const {isLoggedIn, products} = this.props

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
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route path="/" component={AllProducts} />
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
    // loadInitialData () {
    //   dispatch(me())
    // }
    loadProducts: () => dispatch(fetchProducts()),
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
