import { Component } from 'react'
import { Link } from 'react-router'
import './navbar.less'
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap'
import IsAuthenticatedNavBar from './isAuthenticatedNavBar'
import IsNotAuthenticatedNavBar from './isNotAuthenticatedNavBar'

export default class AppNavbar extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <Navbar color="faded" light toggleable>
                <NavbarToggler right onClick={null/*this.toggle*/}/>
                <NavbarBrand>
                    <Link to={'/'}>
                        <i className="fa fa-trophy" aria-hidden="true"/>&nbsp;World-Cup
                    </Link>
                </NavbarBrand>
                <Collapse isOpen={false/*this.state.isOpen*/} navbar>
                    {
                        this.props.isAuthenticated &&
                        <IsAuthenticatedNavBar athlete={this.props.athlete} token={this.props.token}/> ||
                        <IsNotAuthenticatedNavBar/>
                    }
                </Collapse>
            </Navbar>
        )
    }
}