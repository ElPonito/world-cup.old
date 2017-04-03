import { browserHistory } from 'react-router'
import { Component } from 'react'

export default class Athlete extends Component {

    render() {
        const athleteBikes = this.props.athlete.bikes.map(bike => (
                <div key={bike.id}>
                    Name: {bike.name}<br/>
                    Distance: {Math.trunc(bike.distance / 1000)}
                </div>
            )
        )

        const athleteKoms = this.props.koms.map(kom => (
            <div key={kom.id}>
                name: {kom.name}<br/>
                date: {kom.start_date_local}<br/>
                time: {kom.moving_time}
            </div>
        ))

        return (
            <div>
                <div>
                    <h1>Bikes</h1>
                    {athleteBikes}
                    <h1>Palmarès</h1>
                    <div>
                        <h2>World Cup Awards</h2>
                        <div>
                            <em>You currently haven't any awards</em>
                        </div>

                        <h2>Strava KOM</h2>
                        <div>
                            {athleteKoms}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}