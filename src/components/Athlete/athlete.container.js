import { connect } from 'react-redux'
import Athlete from './athlete.jsx'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
        athlete: state.loginReducer.athlete
    }
}

export default connect(mapStateToProps)(Athlete)