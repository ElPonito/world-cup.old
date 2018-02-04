import { browserHistory } from 'react-router'
import { Component } from 'react'
import { connect } from 'react-redux'

export default function requireAuthentication(Component) {

    class Authenticated extends Component {

        componentWillMount() {
            this.checkAuth()
        }

        checkAuth() {
            !this.props.isAuthenticated && browserHistory.push('/')
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.loginReducer.isAuthenticated,
        }
    }

    return connect(mapStateToProps)(Authenticated)
}