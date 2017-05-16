import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import * as _ from 'lodash'
import moment from 'moment'
import Table from '../../UiComponents/Table'

export default class CreateRace extends Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            raceName: '',
            raceDate: new Date(),
            raceAthletes: [],
            raceSegments: []
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleAthletesSelect(event, data) {
        const raceAthletes = this.state.raceAthletes
        if (event.target.checked) {
            raceAthletes.push(data)
            this.setState({raceAthletes})
        } else {
            this.setState({
                raceAthletes: _.without(raceAthletes, data)
            })
        }
    }

    handleSegmentsSelect(event, data) {
        const raceSegments = this.state.raceSegments
        if (event.target.checked) {
            raceSegments.push(data)
            this.setState({raceSegments})
        } else {
            this.setState({
                raceAthletes: _.without(raceSegments, data)
            })
        }
    }

    createRace() {
        console.log(this.state)
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
                            <FormGroup>
                                <Label for="race-name">Race Name</Label>
                                <Input type="text" name="raceName" id="raceName" placeholder="Race Name"
                                       value={this.state.raceName}
                                       onChange={this.handleChange} size="sm"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="race-date">Race Date</Label>
                                <Input type="date" name="raceDate" id="raceDate" placeholder="Race Date"
                                       value={moment(this.state.raceDate).format('YYYY-MM-DD')}
                                       onChange={this.handleChange} size="sm"/>
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