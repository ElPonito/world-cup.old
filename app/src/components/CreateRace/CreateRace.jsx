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
import Stepper, { Step, StepButton } from 'material-ui/Stepper'
import Flatpickr from 'react-flatpickr'
import '../../assets/styles/flatpickr.css'
import { createRace } from '../../redux/CreateRace'
import { fetchFriendsList } from '../../redux/Athlete'
import SegmentsExplorer from './SegmentsExplorer/SegmentsExplorer'
import './CreateRace.css'
import * as _ from 'lodash'

const styles = theme => ({
    card: {
        minWidth: '100%',
        maxHeight: 'calc(100vh - 150px)',
        overflow: 'auto'
    },
    grid: {
        margin: 'auto'
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
        color: 'white',
        float: 'right',
        margin: theme.spacing.unit,
    },
    buttonSuccess: {
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

const STEPS = ['Infos.', 'Segments']

class CreateRace extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            race: {
                name: '',
                date: new Date(),
                athletes: [props.athlete.id],
                segments: [],
                isPrivate: false
            },
        }
        this.stepRender = {
            0: this.renderInfos,
            1: this.renderSegments,
        }
    }

    componentWillMount() {
        const { athleteFriends, token } = this.props
        if(_.isEmpty(athleteFriends)) {
            this.props.getAthleteFriends(token)
        }
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
        this.setState(prevState => ({ race: { ...prevState.race, [name]: value } }))
    }

    renderInfos = () => (
        <Grid item xs={12} md={5} className={this.props.classes.grid}>
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography className={this.props.classes.title} color='textSecondary'>
                        Informations
                    </Typography>
                    <TextField
                        id='with-placeholder'
                        label='Nom de la course'
                        placeholder='Course'
                        onChange={this.handleRaceChange('name')}
                        className={this.props.classes.textField}
                        margin='normal'
                    />
                    <div style={{ margin: '10px' }}>
                                    <span style={{
                                        marginBottom: '5px',
                                        fontSize: '0.8rem',
                                        color: 'rgba(0, 0, 0, 0.54)'
                                    }}>
                                        Date
                                    </span>
                        <br/>
                        <Flatpickr value={this.state.date}
                                   onChange={date => this.setState(prevState => ({
                                       race: {
                                           ...prevState.race,
                                           date
                                       }
                                   }))}/>
                    </div>
                    <span>
                                    <Switch
                                        checked={this.state.race.isPrivate}
                                        onChange={this.handleRaceChange('isPrivate')}
                                        classes={{
                                            checked: this.props.classes.checked,
                                            bar: this.props.classes.bar,
                                        }}
                                        value='isPrivate'
                                    />
                                    Private Race
                                </span>
                </CardContent>
            </Card>
        </Grid>
    )

    renderFriends = () => (
        <div>TODO!!</div>
    )

    renderSegments = () => (
        <Grid item xs={12}>
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography className={this.props.classes.title} color='textSecondary'>
                        Segments
                    </Typography>
                    <Grid container>
                        <Grid item xs={8}>
                            <SegmentsExplorer addSegment={this.addSegment}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Table className={this.props.classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nom</TableCell>
                                        <TableCell numeric>Distance</TableCell>
                                        <TableCell numeric>D+</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.race.segments.map(segment => (
                                            <TableRow key={segment.id}>
                                                <TableCell>{segment.name}</TableCell>
                                                <TableCell numeric>{segment.distance}</TableCell>
                                                <TableCell numeric>{segment.total_elevation_gain}</TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>
        </Grid>
    )

    render() {
        const { classes, saveRace, athleteFriends } = this.props
        const { race: { segments, date }, activeStep } = this.state

        console.log('+++++', athleteFriends)

        return (
            <div style={{ marginTop: '10px' }}>
                <Grid container>
                    <Grid item md={9}>
                        <Stepper activeStep={activeStep}>
                            {STEPS.map((label, index) => {
                                const props = {}

                                return (
                                    <Step key={label} {...props}>
                                        <StepButton onClick={() => {this.setState({ activeStep: index })}}>
                                            {label}
                                        </StepButton>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </Grid>
                    <Grid item md={3}>
                        <div style={{ margin: '10px' }}>
                            <Button className={classes.buttonSuccess} disabled={activeStep !== STEPS.length - 1}
                                    variant='raised'
                                    size='small'
                                    onClick={() => saveRace(this.state.race)}>
                                <Save className={classNames(classes.leftIcon, classes.iconSmall)}/>
                                Save
                            </Button>
                            <Button
                                className={classes.button}
                                disabled={activeStep === STEPS.length - 1}
                                variant='raised'
                                color='primary'
                                onClick={() => this.setState(({ activeStep }) => ({ activeStep: activeStep + 1 }))}
                                size='small'
                            >
                                Next
                            </Button>

                            <Button
                                className={classes.button}
                                variant='raised'
                                color='primary'
                                disabled={activeStep === 0}
                                onClick={() => this.setState(({ activeStep }) => ({ activeStep: activeStep - 1 }))}
                                size='small'
                            >
                                Back
                            </Button>
                        </div>
                    </Grid>
                </Grid>

                <Grid container>
                    {this.stepRender[activeStep]()}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        athlete: state.loginReducer.athlete,
        token: state.loginReducer.token,
        athleteFriends: state.athleteReducer.friends,
        // athleteStarredSegments: new SegmentsListToDisplay(state.athleteReducer.starredSegments).list
    }
}

const mapDispatchToProps = dispatch => ({
    saveRace: data => dispatch(createRace(data)),
    getAthleteFriends: (token) => dispatch(fetchFriendsList(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRace))