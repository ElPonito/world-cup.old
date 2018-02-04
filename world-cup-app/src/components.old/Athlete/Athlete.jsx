import { Component } from 'react'
import { Table } from 'reactstrap'
import { secondsToHms } from '../../utils/dateAndTime'

export default class Athlete extends Component {

    render() {

        const athleteKoms = this.props.koms.map(kom => (
            <tr key={kom.id}>
                <td>{kom.name}</td>
                <td>{kom.start_date_local}</td>
                <td>{secondsToHms(kom.moving_time)}</td>
            </tr>
        ))

        return (
            <div>
                <div>
                    <h1>Palmarès</h1>
                    <div>
                        <h2>World Cup Awards</h2>
                        <div>
                            <em>You currently haven't any awards</em>
                        </div>

                        <h2>Strava KOM</h2>
                        <div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {athleteKoms}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}