import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'

import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import DraftsIcon from 'material-ui-icons/Drafts'
import StarIcon from 'material-ui-icons/Star'
import CalendarIcon from 'material-ui-icons/PermContactCalendar'
import { withStyles } from 'material-ui/styles'

const menuDrawer = ({ isDrawerOpen, toogleDrawer, classes, athlete }) => (
    <Drawer open={isDrawerOpen} onClose={toogleDrawer}>
        <div
            tabIndex={0}
            role='button'
            onClick={toogleDrawer}
            onKeyDown={toogleDrawer}
        >
            <div className={classes.list}>
                <List>
                    <div>
                        <Link to='/athlete'>
                            <ListItem button className={classes.firstRow}>
                                <ListItemIcon>
                                    {athlete && <Avatar alt={`${athlete.firstname} ${athlete.lastname}`}
                                                        src={athlete.profile_medium} className={classes.avatar}/>
                                    }

                                </ListItemIcon>
                                <ListItemText primary='Profile'/>
                            </ListItem>
                        </Link>
                        <Link to='/create-race'>
                            <ListItem button>
                                <ListItemIcon>
                                    <StarIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Create Race'/>
                            </ListItem>
                        </Link>
                        <ListItem button>
                            <ListItemIcon>
                                <CalendarIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Events'/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Drafts'/>
                        </ListItem>
                    </div>
                </List>
            </div>
        </div>
    </Drawer>
)

const styles = {
    list: {
        width: 250,
    },
    firstRow: {
        backgroundColor: '#e0e0e0'
    }
}

export default withStyles(styles)(menuDrawer)