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
                <h1>Bike</h1>
                {athleteBikes}
            </div>
        </div>
    )
}

export default Athlete