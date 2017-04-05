import { strava_login_url } from '../../config/config'
import { Link } from 'react-router'
import './navbar.less'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const AppNavbar = ({athlete, isAuthenticated, onClickProfile}) => {

    let athleteInformation
    const clickProfile = () => {
        onClickProfile(athlete.id)
    }

    if (isAuthenticated) {
        const ownStyle = {
            backgroundImage: `url(${athlete.profile_medium})`
        }
        athleteInformation = (
            <div>
                <Link to={'/athlete'} onClick={clickProfile}>
                    <div style={ownStyle} className="avatar">
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <Navbar color="faded" light toggleable>
            <NavbarToggler right onClick={null/*this.toggle*/}/>
            <NavbarBrand>
                <Link to={'/'}>
                    World-Cup
                </Link>
            </NavbarBrand>
            <Collapse isOpen={false/*this.state.isOpen*/} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                            <Link to={'/timeline'}>
                                Timeline
                            </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        {!isAuthenticated && (
                            <a href={strava_login_url}>
                                <button className="btn btn-sm btn-outline-warning my-2 my-sm-0" type="submit">Connect
                                </button>
                            </a>
                        )}
                        {athleteInformation}
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default AppNavbar