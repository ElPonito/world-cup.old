import { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import Table from '../../UiComponents/Table'

export default class CreateRace extends Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const friendsList = {
            head: [
                {content: ''}, {content: 'First Name'}, {content: 'Last Name'}
            ],
            body: this.props.athleteFriends
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
                                <Input type="text" name="race-name" id="race-name" placeholder="Race Name"
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="race-date">Race Name</Label>
                                <Input type="date" name="race-date" id="race-date" placeholder="Race Date"
                                       onChange={this.handleChange}/>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Col>

                    <Col md={9}>
                        <h2>Choose your segments</h2>
                        <h2>Invite friends</h2>
                        <Table head={friendsList.head} body={friendsList.body}/>
                    </Col>
                </Row>
            </div>
        )
    }
}