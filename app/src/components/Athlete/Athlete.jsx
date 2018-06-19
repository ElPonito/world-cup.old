import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import { fetchKoms } from '../../redux/Athlete'
import { fetchCreateRaceData } from '../../redux/CreateRace'

class Athlete extends Component {
    componentWillMount() {
        const { athleteState: { koms }, loginState, fetchAthleteKoms } = this.props
        if(_.isEmpty(koms)) {
            loginState && fetchAthleteKoms(loginState)
        }
    }

    componentWillReceiveProps(newProps) {
        const { athleteState: { koms }, loginState, fetchAthleteKoms } = this.props
        if(_.isEmpty(koms)) {
            loginState && fetchAthleteKoms(loginState)
        }
    }

    render() {
        const { athleteState } = this.props
        return (
            <div>
                Athlete
                Koms: {athleteState.koms.length}
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
        dispatch(fetchKoms(loginState.athlete.id))
    },
    onClickCreateRace: (loginState) => {
        dispatch(fetchCreateRaceData(loginState.token))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Athlete)