import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

export default function requireAuthentication(Component) {
    class Authenticated extends Component {
        componentWillMount() {
            this.checkAuth()
        }

        checkAuth() {
            !this.props.isAuthenticated && this.props.history.push('/')
        }

        render() {
            return <Component {...this.props}/>
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.loginReducer.isAuthenticated,
        }
    }

    return connect(mapStateToProps)(Authenticated)
}