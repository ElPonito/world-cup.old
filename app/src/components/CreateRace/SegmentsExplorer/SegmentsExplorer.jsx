import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import green from 'material-ui/colors/green'
import Tooltip from 'material-ui/Tooltip'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import polyline from 'polyline-encoded'
import Strava from '../../../data/rest/Strava'
import config from '../../../app-config'

mapboxgl.accessToken = config.mapboxToken

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: green[500],
    },
})

const PARIS = [2.333333, 48.866667]
const GRENOBLE = [5.724524, 45.188529]

class SegmentsExplorer extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/outdoors-v9',
            center: PARIS,
            zoom: 10,
        })

        this.getUserPosition()

        // TODO remove, it's just a test
        const bounds = this.map.getBounds()
        const b = [bounds._sw.lat, bounds._sw.lng, bounds._ne.lat, bounds._ne.lng]
        // const b = [48.8191, 2.0235, 48.9545, 2.3524]

        Strava.getSegments(JSON.stringify(b)).then(segmentsList => {
            JSON.parse(segmentsList).map(segment => {
                Strava.getSegment(segment.id).then(s => {
                    const detailledSegment = JSON.parse(s)
                    const decodedPolyline = polyline.decode(detailledSegment.map.polyline)
                    const coordinates = decodedPolyline.map(([lat, lng]) => [lng, lat])
                    this.map.addLayer({
                        'id': detailledSegment.id.toString(),
                        'type': 'line',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'properties': {},
                                'geometry': {
                                    'type': 'LineString',
                                    coordinates
                                }
                            }
                        },
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#735139',
                            'line-width': 4
                        }
                    })
                    this.map.addLayer({
                        'id': `${detailledSegment.id}-point`,
                        'type': 'symbol',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [{
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [detailledSegment.start_latlng[1], detailledSegment.start_latlng[0]]
                                    },
                                    'properties': {
                                        'title': detailledSegment.name,
                                        'icon': 'triangle'
                                    }
                                }]
                            }
                        },
                        'layout': {
                            'icon-image': '{icon}-15',
                        }
                    })
                    this.map.on('click', `${detailledSegment.id.toString()}-point`, e => {
                        new mapboxgl.Popup()
                            .setLngLat(e.lngLat)
                            .setHTML('<div id='
                        '+segment.id+'
                        '></div>'
                    )
                            .addTo(this.map)
                        ReactDOM.render(this.renderSegmentPopUp(detailledSegment), document.getElementById(segment.id))
                    })
                })
            })
        })
    }

    componentWillUnmount() {
        this.map.remove()
    }

    getUserPosition() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => this.map.setCenter([position.coords.longitude, position.coords.latitude]))
        }
    }

    renderSegmentPopUp = segment => (
        <div>
            <span>{segment.name}</span>
            <Tooltip id='tooltip-fab' className={this.props.classes.fab} title='Add Segment to race'>
                <Button variant='fab' mini color='secondary' aria-label='add' className={this.props.classes.button}
                        onClick={() => this.props.addSegment(segment)}>
                    <AddIcon/>
                </Button>
            </Tooltip>
        </div>
    )

    render() {
        return (
            <div ref={el => this.mapContainer = el}/>
        )
    }
}

export default withStyles(styles)(SegmentsExplorer)