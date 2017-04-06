import { Component } from 'react'
import { strava_login_url } from '../../config/config'
import { Link } from 'react-router'
import './navbar.less'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class AppNavbar extends Component {

    constructor() {
        super()
        this.state = {
            raceDropdownOpen: false
        }
    }

    toggle() {
        this.setState({raceDropdownOpen: !this.state.raceDropdownOpen})
    }

    clickProfile() {
        this.props.onClickProfile(this.props.athlete.id)
    }

    isAuthenticatedNavBarLink() {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <ButtonDropdown isOpen={this.state.raceDropdownOpen} toggle={this.toggle.bind(this)}>
                        <DropdownToggle caret>
                            Races
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem><Link to={'/'}>Create race</Link></DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem>Another Action</DropdownItem>
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
                        <Link to={'/athlete'} onClick={this.clickProfile}>
                            <div style={{backgroundImage: `url(${this.props.athlete.profile_medium})`}}
                                 className="avatar">
                            </div>
                        </Link>
                    </div>
                </NavItem>
            </Nav>
        )
    }

    isNotAuthenticatedNavBarLink() {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <a href={strava_login_url}>
                        <button className="btn btn-sm btn-outline-warning my-2 my-sm-0" type="submit">Connect
                        </button>
                    </a>
                </NavItem>
            </Nav>
        )
    }

    render() {
        return (
            <Navbar color="faded" light toggleable>
                <NavbarToggler right onClick={null/*this.toggle*/}/>
                <NavbarBrand>
                    <Link to={'/'}>
                        World-Cup
                    </Link>
                </NavbarBrand>
                <Collapse isOpen={false/*this.state.isOpen*/} navbar>
                    {this.props.isAuthenticated && this.isAuthenticatedNavBarLink() || this.isNotAuthenticatedNavBarLink()}
                </Collapse>
            </Navbar>
        )
    }
}