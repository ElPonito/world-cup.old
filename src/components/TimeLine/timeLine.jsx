import { browserHistory } from 'react-router'

const TimeLine = (props) => {

    if (!props.location.query.code) {
        browserHistory.push('/');
    }

    const req = new XMLHttpRequest();

    req.onreadystatechange = function (event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log("Réponse reçu: %s", this.responseText);
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', `http://localhost:15000/token_exchange/${props.location.query.code}`, true)
    req.send(null);

    return (
        <div>
            This is the timeline
        </div>
    )
}

export default TimeLine