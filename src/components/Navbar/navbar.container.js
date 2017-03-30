import { connect } from 'react-redux'
import Navbar from './navbar.jsx'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
        athlete: state.loginReducer.athlete
    }
}

export default connect(mapStateToProps)(Navbar)