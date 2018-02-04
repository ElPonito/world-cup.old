import { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { fetchKoms } from '../../redux/Athlete'
import { fetchCreateRaceData } from '../../redux/CreateRace'

class Athlete extends Component {
    componentWillMount() {
        const { athleteState: { koms }, loginState, fetchAthleteKoms } = this.props
        console.log('*****', _.isEmpty(koms))
        if (_.isEmpty(koms)) {
            console.log('-----', loginState)
            loginState && fetchAthleteKoms(loginState)
        }
        console.log('++++++++', koms)
    }

    componentWillReceiveProps(newProps) {
        const { athleteState: { koms }, loginState, fetchAthleteKoms } = this.props
        console.log('*****', _.isEmpty(koms))
        if (_.isEmpty(koms)) {
            console.log('-----', loginState)
            loginState && fetchAthleteKoms(loginState)
        }
        console.log('++++++++', koms)
    }

    render() {
        return (
            <div>
                Athlete
            </div>
        )
    }
}

const mapStateToProps = state => ({
    athleteState: state.athleteReducer,
    loginState: state.loginReducer
})

const mapDispatchToProps = (dispatch, props) => ({
    fetchAthleteKoms: (loginState) => {
        console.log('loooooooool')
        dispatch(fetchKoms(loginState.athlete.id))
    },
    onClickCreateRace: (loginState) => {
        dispatch(fetchCreateRaceData(loginState.token))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Athlete)