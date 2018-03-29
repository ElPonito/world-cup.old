import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Hidden from 'material-ui/Hidden'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import MenuDrawer from './MenuDrawer/MenuDrawer'
import config from '../../../app-config'
import strava from '../../../app-config/strava'

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    title: {
        textDecoration: 'none',
        fontSize: '1.3125rem',
        fontWeight: 500,
        fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
        lineHeight: '1.16667em',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    listFull: {
        width: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        margin: 10,
    },
})

class MenuAppBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: true,
            anchorEl: null,
            isDrawerOpen: false,
        }
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    toogleDrawer = () => this.setState(prevState => ({ isDrawerOpen: !prevState.isDrawerOpen }))

    render() {
        const { classes, loginState: { isAuthenticated, athlete } } = this.props
        const { anchorEl, isDrawerOpen } = this.state
        const open = Boolean(anchorEl)

        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <Hidden mdUp>
                            {isAuthenticated && (
                                <IconButton className={classes.menuButton} onClick={this.toogleDrawer} color='inherit'
                                            aria-label='Menu'>
                                    <MenuIcon/>
                                </IconButton>
                            )}
                        </Hidden>
                        <Link to='/' className={classes.flex}>
                            <Typography className={classes.title} type='title' color='inherit'>
                                World Cup
                            </Typography>
                        </Link>

                        <Hidden smDown>
                            {isAuthenticated && (
                                <Link to='/create-race'>
                                    <Button className={classes.button}>
                                        Create Race
                                    </Button>
                                </Link>
                            )}
                        </Hidden>

                        <Hidden smDown>
                            {isAuthenticated && (
                                <div>
                                    {athlete.profile_medium !== strava.defaultAvatarUrl && (
                                        <Link to='/athlete'>
                                            <Avatar alt={`${athlete.firstname} ${athlete.lastname}`}
                                                    src={athlete.profile_medium} className={classes.avatar}/>
                                        </Link>
                                    )}
                                    {athlete.profile_medium === strava.defaultAvatarUrl && (
                                        <Link to='/athlete'>
                                            <IconButton
                                                aria-owns={open ? 'menu-appbar' : null}
                                                aria-haspopup='true'
                                                onClick={this.handleMenu}
                                                color='inherit'
                                            >
                                                <AccountCircle/>
                                            </IconButton>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </Hidden>
                        {!isAuthenticated && (
                            <Button href={config.strava_login_url} className={classes.button}>
                                Sign-In
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
                <MenuDrawer isDrawerOpen={isDrawerOpen} toogleDrawer={this.toogleDrawer} athlete={athlete}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginReducer
    }
}

export default connect(mapStateToProps)(withStyles(styles)(MenuAppBar))