import { Nav, NavItem } from 'reactstrap'
import { strava_login_url } from '../../../config/config'

const isNotAuthenticatedNavBar = () => {
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

export default isNotAuthenticatedNavBar