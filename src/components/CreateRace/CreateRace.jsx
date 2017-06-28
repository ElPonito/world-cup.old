import { Component } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import * as _ from 'lodash'
import Flatpickr from 'react-flatpickr'
import Table from '../../UiComponents/Table'
import './CreateRace.less'
import '../../vendor/font-awesome/less/font-awesome.less'

export default class CreateRace extends Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            raceName: '',
            raceDate: new Date().toISOString(),
            raceAthletes: [],
            raceSegments: [],
            formValid: {
                raceName: true
            }
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onDatePickerChange = newDate => {
        this.setState({raceDate: new Date(newDate).toISOString()})
    }

    handleAthletesSelect(event, athlete) {
        const raceAthletes = this.state.raceAthletes
        if (event.target.checked) {
            raceAthletes.push(athlete.id)
            this.setState({raceAthletes})
        } else {
            this.setState({
                raceAthletes: _.without(raceAthletes, data)
            })
        }
    }

    handleSegmentsSelect(event, segment) {
        const raceSegments = this.state.raceSegments
        if (event.target.checked) {
            raceSegments.push(segment.id)
            this.setState({raceSegments})
        } else {
            this.setState({
                raceAthletes: _.without(raceSegments, data)
            })
        }
    }

    createRace() {
        if (this.isFormValid()) {
            this.props.saveRace({...this.state, raceOwner: this.props.athlete.id, token: this.props.token})
        }
    }

    isFormValid() {
        const formValid = {}
        let isValid = true
        Object.keys(this.state.formValid).forEach(formKey => {
            formValid[formKey] = !!this.state[formKey]
            isValid = !!this.state[formKey] || isValid
        })
        this.setState({formValid})
        return isValid
    }

    render() {
        const friendsListTableData = {
            config: {
                avatar: '',
                firstName: 'First Name',
                lastName: 'Last Name'
            }, data: this.props.athleteFriends
        }

        const segmentsListTableData = {
            config: {
                name: 'Segment Name'
            }, data: this.props.athleteStarredSegments
        }

        return (
            <div>
                <h1>Create Race</h1>
                <Row>
                    <Col md={3}>
                        <h2>Race Information</h2>
                        <Form>
                            <FormGroup color={!this.state.formValid.raceName && 'danger'}>
                                <Label for="race-name">Race Name</Label>
                                <Input type="text" name="raceName" id="raceName" placeholder="Race Name"
                                       value={this.state.raceName}
                                       onChange={this.handleChange} size="sm"/>
                                {!this.state.formValid.raceName && <FormFeedback>Race name is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup color={!this.state.formValid.raceDate && 'danger'}>
                                <Label for="race-date">Race Date</Label><br/>
                                <Flatpickr options={{
                                    defaultDate: this.state.raceDate,
                                    onChange: this.onDatePickerChange
                                }}/>
                            </FormGroup>
                            <Button color="primary" onClick={this.createRace.bind(this)}>Create Race!</Button>
                        </Form>
                    </Col>

                    <Col md={9}>
                        <h2>Choose your segments</h2>
                        <Table config={segmentsListTableData.config } data={segmentsListTableData.data}
                               checkbox={true} handleSelect={this.handleSegmentsSelect.bind(this)}/>
                        <h2>Invite friends</h2>
                        <Table config={friendsListTableData.config } data={friendsListTableData.data} checkbox={true}
                               handleSelect={this.handleAthletesSelect.bind(this)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}