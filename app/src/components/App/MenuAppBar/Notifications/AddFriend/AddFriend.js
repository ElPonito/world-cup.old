import React, { Fragment } from 'react'
import { Avatar, Icon, MenuItem } from 'material-ui'
import { POST } from '../../../../../data/request'
import config from '../../../../../app-config'

export default (key, { from, _id: notificationId, state }, styles) => () => (
    <MenuItem
        key={key}
    >
        <Avatar alt={`${from.firstname} ${from.lastname}`}
                src={from.profile_medium}
                className={styles.avatar}/>
        {
            state === 'new' && (
                <Fragment>
                    <span className='notificationContent'>
                        {`${from.firstname} ${from.lastname}`} send you a friend request
                    </span>
                    <Icon className={styles.accept}
                          onClick={() => POST(`${config.api_url}/accept-notification/${notificationId}`)}>
                        check_circle_outline
                    </Icon>
                    <Icon className={styles.decline}>
                        close
                    </Icon>
                </Fragment>
            )
        }
        {
            state === 'treated' && (
                <span className='notificationContent'>
                        You are now friend with {`${from.firstname} ${from.lastname}`}
                    </span>
            )
        }
    </MenuItem>

)