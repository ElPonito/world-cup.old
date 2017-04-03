import { connect } from 'react-redux'
import Navbar from './navbar.jsx'
import { fetchKoms } from '../../redux/Athlete'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
        athlete: state.loginReducer.athlete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickProfile: (athleteId) => dispatch(fetchKoms(athleteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)