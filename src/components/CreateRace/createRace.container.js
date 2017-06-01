import { connect } from 'react-redux'
import { createRace } from '../../redux/CreateRace'
import CreateRace from './CreateRace.jsx'
import FriendListToDisplay from '../../data/Cooked/Athlete/FriendsListToDisplay'
import SegmentsListToDisplay from '../../data/Cooked/Segment/SegmentsListToDisplay'

const mapStateToProps = state => {
    return {
        athlete: state.loginReducer.athlete,
        athleteFriends: new FriendListToDisplay(state.athleteReducer.friends).listToTableDisplay(),
        athleteStarredSegments: new SegmentsListToDisplay(state.athleteReducer.starredSegments).list
    }
}

const mapDispatchToProps = dispatch => ({
    saveRace: data => dispatch(createRace(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateRace)
