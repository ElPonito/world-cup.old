import { Component } from 'react'
import { Link } from 'react-router'
import { Nav, NavItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Avatar from '../../../UiComponents/Avatar'

export default class isAuthenticatedNavBar extends Component {
    constructor() {
        super()
        this.state = {
            raceDropdownOpen: false
        }
    }

    toggle() {
        this.setState({raceDropdownOpen: !this.state.raceDropdownOpen})
    }

    render() {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <ButtonDropdown isOpen={this.state.raceDropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>
                            Races
                        </DropdownToggle>
                        <DropdownMenu>
                            <Link to={'/create-race'} className="link" onClick={this.props.onClickCreateRace}>
                                <DropdownItem>Create race</DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </ButtonDropdown>
                </NavItem>
                <NavItem>
                    <Link to={'/timeline'}>
                        Timeline
                    </Link>
                </NavItem>
                < NavItem >
                    <div>
                        <Link to={'/athlete'} onClick={this.props.onClickProfile}>
                            <Avatar url={this.props.athlete.profile_medium}/>
                        </Link>
                    </div>
                </NavItem>
            </Nav>
        )
    }
}