import { connect } from 'react-redux'
import Athlete from './Athlete.jsx'

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginReducer.isAuthenticated,
        athlete: state.loginReducer.athlete,
        koms: state.athleteReducer.koms
    }
}

export default connect(mapStateToProps)(Athlete)