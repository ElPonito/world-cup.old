import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'
import green from 'material-ui/colors/green'
import Save from 'material-ui-icons/Save'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { createRace } from '../../redux/CreateRace'
import SegmentsExplorer from './SegmentsExplorer/SegmentsExplorer'
import './CreateRace.css'

const styles = theme => ({
    card: {
        minWidth: '100%',
        maxHeight: 'calc(100vh - 150px)',
        overflow: 'auto'
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '95%',
    },
    checked: {
        color: green[500],
        '& + $bar': {
            backgroundColor: green[500],
        },
    },
    bar: {},
    button: {
        backgroundColor: green[500],
        color: 'white',
        float: 'right',
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
})

class CreateRace extends Component {

    constructor(props) {
        super(props)
        this.state = {
            race: {
                name: '',
                date: new Date(),
                athletes: [props.athlete.id],
                segments: [],
                isPrivate: false
            }
        }

        /*this.state = {
            raceName: '',
            raceDate: new Date().toISOString(),
            stringDate: createStringDateFromDateObject(new Date()),
            raceAthletes: [props.athlete.id],
            raceSegments: [],
            formValid: {
                raceName: true
            }
        }*/
    }

    addSegment = (segment) => {
        this.setState(prevState => ({
            race: {
                ...prevState.race,
                segments: [...prevState.race.segments, segment]
            }
        }))
    }

    createRace() {
        if(this.isFormValid()) {
            this.props.saveRace({ ...this.state, raceOwner: this.props.athlete.id, token: this.props.token })
        }
    }

    handleRaceChange = name => event => {
        const { target } = event
        const value = target.type === 'checkbox' ? target.checked : target.value
        console.log('value', value)
        this.setState(prevState => ({ race: { ...prevState.race, [name]: value } }))
    }

    render() {
        const { classes, saveRace } = this.props
        const { race: { segments } } = this.state
        return (
            <div style={{ marginTop: '10px' }}>
                <Button className={classes.button} variant='raised' size='small'
                        onClick={() => saveRace(this.state.race)}>
                    <Save className={classNames(classes.leftIcon, classes.iconSmall)}/>
                    Save
                </Button>
                <Grid container>
                    <Grid item xs={12} md={3}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color='textSecondary'>
                                    Informations
                                </Typography>
                                <TextField
                                    id='with-placeholder'
                                    label='Nom de la course'
                                    placeholder='Course'
                                    onChange={this.handleRaceChange('name')}
                                    className={classes.textField}
                                    margin='normal'
                                />
                                <br/>
                                TODO: DATE!!
                                <br/>
                                <span>
                                    <Switch
                                        checked={this.state.race.isPrivate}
                                        onChange={this.handleRaceChange('isPrivate')}
                                        classes={{
                                            checked: classes.checked,
                                            bar: classes.bar,
                                        }}
                                        value='isPrivate'
                                    />
                                    Private Race
                                </span>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color='textSecondary'>
                                    Segments
                                </Typography>
                                <SegmentsExplorer addSegment={this.addSegment}/>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell numeric>Distance</TableCell>
                                            <TableCell numeric>D+</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {segments.map(segment => (
                                                <TableRow key={segment.id}>
                                                    <TableCell>{segment.name}</TableCell>
                                                    <TableCell numeric>{segment.distance}</TableCell>
                                                    <TableCell numeric>{segment.total_elevation_gain}</TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/*<Grid item xs={12} md={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color='textSecondary'>
                                    Riders
                                </Typography>
                                <TextField
                                    id='with-placeholder'
                                    label='Nom de la course'
                                    placeholder='Course'
                                    className={classes.textField}
                                    margin='normal'
                                />
                                <br/>
                                TODO: DATE!!
                            </CardContent>
                        </Card>
                    </Grid>*/}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        athlete: state.loginReducer.athlete,
        token: state.loginReducer.token,
        // athleteFriends: new FriendListToDisplay(state.athleteReducer.friends).listToTableDisplay(),
        // athleteStarredSegments: new SegmentsListToDisplay(state.athleteReducer.starredSegments).list
    }
}

const mapDispatchToProps = dispatch => ({
    saveRace: data => dispatch(createRace(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRace))