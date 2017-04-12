import { connect } from 'react-redux'
import CreateRace from './CreateRace.jsx'
import FriendListToDisplay from '../../data/Cooked/Athlete/FriendsListToDisplay'

const mapStateToProps = (state) => {
    return {
        athlete: state.loginReducer.athlete,
        athleteFriends: new FriendListToDisplay(state.athleteReducer.friends).listToTableDisplay()
    }
}

export default connect(mapStateToProps)(CreateRace)
