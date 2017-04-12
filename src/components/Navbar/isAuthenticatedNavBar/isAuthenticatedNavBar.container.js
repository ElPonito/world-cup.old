import { connect } from 'react-redux'
import IsAuthenticatedNavBar from './isAuthenticatedNavBar.jsx'
import { fetchKoms } from '../../../redux/Athlete'

const mapDispatchToProps = (dispatch, {athlete}) => {
    return {
        onClickProfile: () => {
            dispatch(fetchKoms(athlete.id))
        }
    }
}

export default connect(null, mapDispatchToProps)(IsAuthenticatedNavBar)