import { connect } from 'react-redux'
import IsAuthenticatedNavBar from './isAuthenticatedNavBar.jsx'
import { fetchKoms } from '../../../redux/Athlete'
import { createRace } from '../../../redux/CreateRace'

const mapDispatchToProps = (dispatch, {athlete, token}) => {
    return {
        onClickProfile: () => {
            dispatch(fetchKoms(athlete.id))
        },
        onClickCreateRace: () => {
            dispatch(createRace(token))
        }
    }
}

export default connect(null, mapDispatchToProps)(IsAuthenticatedNavBar)