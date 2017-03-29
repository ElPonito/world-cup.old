import { strava_login_url } from '../../config/config'

const Navbar = () => {
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            {/*<a className="navbar-brand" href="#">World Cup</a>*/}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <a href={strava_login_url}>
                    <button className="btn btn-sm btn-outline-warning my-2 my-sm-0" type="submit">Connect</button>
                </a>
            </div>
        </nav>
    )
}

export default Navbar