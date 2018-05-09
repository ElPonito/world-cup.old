import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import TextField from 'material-ui/TextField'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Icon from 'material-ui/Icon'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Snackbar from 'material-ui/Snackbar'

import { searchAthletes, addFriend } from '../../data/rest/Athlete'
import strava from '../../app-config/strava'

const styles = {
    icon: {
        cursor: 'pointer'
    }
}

class FriendsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            athletes: [],
            isSnackbarOpen: false
        }
    }

    debouncedSearch = _.debounce(async searchValue => {
        const athletes = await searchAthletes(searchValue)
        this.setState({ athletes })
    }, 500)

    handleSearch = ({ target: { value: searchValue } }) => {
        this.setState({ searchValue })
        this.debouncedSearch(searchValue)
    }

    handleSnackbar = isSnackbarOpen => () => this.setState({ isSnackbarOpen })

    render() {
        const { athletes, isSnackbarOpen } = this.state
        const { classes, loggedAthlete } = this.props
        return (
            <div style={{ marginTop: '10px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            id='full-width'
                            label='Find Friends'
                            placeholder='ex: Antonio Dieu'
                            fullWidth
                            margin='normal'
                            onChange={this.handleSearch}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding='none'/>
                                    <TableCell>Name</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell padding='none'/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {athletes.map(athlete => (
                                        <TableRow key={athlete.id}>
                                            <TableCell padding='none'>
                                                {athlete.profile_medium !== strava.defaultAvatarUrl && (
                                                    <Avatar alt={`${athlete.firstname} ${athlete.lastname}`}
                                                            src={athlete.profile_medium}/>
                                                )}
                                                {athlete.profile_medium === strava.defaultAvatarUrl && (
                                                    <IconButton
                                                        aria-haspopup='true'
                                                        color='inherit'
                                                    >
                                                        <AccountCircle/>
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                            <TableCell>{`${athlete.firstname} ${athlete.lastname}`}</TableCell>
                                            <TableCell>{athlete.city}</TableCell>
                                            <TableCell padding='none'>
                                                <Icon className={classes.icon} onClick={() => {
                                                    addFriend(loggedAthlete.id, athlete.id)
                                                    this.handleSnackbar(true)()
                                                }}>
                                                    person_add
                                                </Icon>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={isSnackbarOpen}
                    onClose={this.handleSnackbar(false)}
                    autoHideDuration={3000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id='message-id'>Invitation send</span>}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedAthlete: state.loginReducer.athlete,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(FriendsSearch))