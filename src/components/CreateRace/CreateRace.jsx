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
            raceAthletes: []
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSelect(event, data) {
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

    render() {
        const friendsListTableData = {
            config: {
                avatar: '',
                firstName: 'First Name',
                lastName: 'Last Name'
            }, data: this.props.athleteFriends
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
                                <Label for="race-date">Race Name</Label>
                                <Input type="date" name="raceDate" id="raceDate" placeholder="Race Date"
                                       value={moment(this.state.raceDate).format('YYYY-MM-DD')}
                                       onChange={this.handleChange} size="sm"/>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Col>

                    <Col md={9}>
                        <h2>Choose your segments</h2>
                        <h2>Invite friends</h2>
                        <Table config={friendsListTableData.config } data={friendsListTableData.data} checkbox={true}
                               handleSelect={this.handleSelect.bind(this)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}