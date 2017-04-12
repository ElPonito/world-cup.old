import { connect } from 'react-redux'
import IsAuthenticatedNavBar from './isAuthenticatedNavBar.jsx'
import { fetchKoms, fetchFriendsList } from '../../../redux/Athlete'

const mapDispatchToProps = (dispatch, {athlete, token}) => {
    return {
        onClickProfile: () => {
            dispatch(fetchKoms(athlete.id))
        },
        onClickCreateRace: () => {
            dispatch(fetchFriendsList(token))
        }
    }
}

export default connect(null, mapDispatchToProps)(IsAuthenticatedNavBar)