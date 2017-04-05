import { strava_login_url } from '../../config/config'
import { Link } from 'react-router'
import './navbar.less'

const Navbar = ({athlete, isAuthenticated, onClickProfile}) => {

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
                    {athlete.firstname}&nbsp;{athlete.lastname}
                    <div style={ownStyle} className="avatar">
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            {/*<a className="navbar-brand" href="#">World Cup</a>*/}
            <a href="/">Home</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {!isAuthenticated && (
                    <a href={strava_login_url}>
                        <button className="btn btn-sm btn-outline-warning my-2 my-sm-0" type="submit">Connect</button>
                    </a>
                )}
                {athleteInformation}
            </div>
        </nav>
    )
}

export default Navbar