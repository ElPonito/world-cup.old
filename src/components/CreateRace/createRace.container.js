import { connect } from 'react-redux'
import CreateRace from './CreateRace.jsx'
import FriendListToDisplay from '../../data/Cooked/Athlete/FriendsListToDisplay'
import SegmentsListToDisplay from '../../data/Cooked/Segment/SegmentsListToDisplay'

const mapStateToProps = (state) => {
    return {
        athlete: state.loginReducer.athlete,
        athleteFriends: new FriendListToDisplay(state.athleteReducer.friends).listToTableDisplay(),
        athleteStarredSegments: new SegmentsListToDisplay(state.athleteReducer.starredSegments).list
    }
}

export default connect(mapStateToProps)(CreateRace)
