import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

import './CreateRace.css'
import SegmentsExplorer from './SegmentsExplorer/SegmentsExplorer'

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
    }
})

class CreateRace extends Component {
    render() {
        const { classes } = this.props
        return (
            <div style={{ marginTop: '10px' }}>
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