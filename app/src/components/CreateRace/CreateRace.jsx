import React, { Component } from 'react'
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

import SegmentsExplorer from './SegmentsExplorer/SegmentsExplorer'
import './CreateRace.css'

const styles = theme => ({
    card: {
        minWidth: '100%',
        maxHeight: '80vh',
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
            isPrivateRace: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked })
    }

    render() {
        const { classes } = this.props
        return (
            <div style={{ marginTop: '10px' }}>
                <Button className={classes.button} variant='raised' size='small'>
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
                                    className={classes.textField}
                                    margin='normal'
                                />
                                <br/>
                                TODO: DATE!!
                                <br/>
                                <span>
                                    <Switch
                                        checked={this.state.isPrivateRace}
                                        onChange={this.handleChange('isPrivateRace')}
                                        classes={{
                                            checked: classes.checked,
                                            bar: classes.bar,
                                        }}
                                        value='isPrivateRace'
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
                                <SegmentsExplorer/>
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

export default withStyles(styles)(CreateRace)