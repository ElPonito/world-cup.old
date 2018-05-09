import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'material-ui/Icon'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import { ClickAwayListener, } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { getNotifications } from '../../../../data/rest/Athlete'
import notificationComponentMap from './notificationComponentMap'
import './Notifications.css'

const styles = {
    avatar: {
        width: '30px',
        height: '30px'
    },
    accept: {
        color: 'darkgreen'
    },
    decline: {
        color: 'red'
    }
}

class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNotificationsOpen: false,
            notifications: []
        }
        this.getNotifications(props.athlete.id)
        // TODO replace by SSE
        setInterval(this.getNotifications, 1000)
    }

    getNotifications = async () => {
        const { athlete: { id: athleteId } } = this.props
        const notifications = JSON.parse(await getNotifications(athleteId))
        this.setState({ notifications })
    }

    render() {
        const { classes } = this.props
        const { isNotificationsOpen, notifications } = this.state
        return (
            <div style={{ position: 'relative' }}>
                <IconButton
                    onClick={() => this.setState(prevState => ({ isNotificationsOpen: !prevState.isNotificationsOpen }))}
                    color='inherit'
                >

                    {notifications.length > 0 && (
                        <Badge badgeContent={notifications.length} color='secondary'>
                            <Icon>
                                notifications
                            </Icon>
                        </Badge>
                    )}
                    {notifications.length === 0 && (
                        <Icon>
                            notifications
                        </Icon>
                    )}
                </IconButton>
                {
                    isNotificationsOpen && (
                        <ClickAwayListener onClickAway={() => this.setState({ isNotificationsOpen: false })}>
                            <div className='notificationsContainer'>
                                {
                                    notifications.map((notification, i) => {
                                        console.log(notification)
                                        const Component = notificationComponentMap[notification.type](i, notification, classes)
                                        return <Component key={i}/>
                                    })
                                }
                                {
                                    notifications.length === 0 && (
                                        <div className='notificationNothingToShow'>
                                            Nothing to show
                                        </div>
                                    )
                                }
                            </div>
                        </ClickAwayListener>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        athlete: state.loginReducer.athlete,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Notifications))