import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer'

import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import DraftsIcon from 'material-ui-icons/Drafts'
import StarIcon from 'material-ui-icons/Star'
import SendIcon from 'material-ui-icons/Send'
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
                        <ListItem button>
                            <Link to='/athlete'>
                                <ListItemIcon>
                                    {athlete && <Avatar alt={`${athlete.firstname} ${athlete.lastname}`}
                                                        src={athlete.profile_medium} className={classes.avatar}/>
                                    }

                                </ListItemIcon>
                                <ListItemText primary='Profile'/>
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Starred'/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SendIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Send mail'/>
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
}

export default withStyles(styles)(menuDrawer)