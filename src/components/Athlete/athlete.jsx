import { browserHistory } from 'react-router'

const Athlete = ({athlete, isAuthenticated}) => {

    !isAuthenticated && browserHistory.push('/')

    const athleteBikes = athlete.bikes.map(bike => (
            <div key={bike.id}>
                Name: {bike.name}<br/>
                Distance: {Math.trunc(bike.distance / 1000)}
            </div>
        )
    )

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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Athlete