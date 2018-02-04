import { connect } from 'react-redux'
import Navbar from './navbar.jsx'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
        token: state.loginReducer.token,
        athlete: state.loginReducer.athlete
    }
}

export default connect(mapStateToProps)(Navbar)