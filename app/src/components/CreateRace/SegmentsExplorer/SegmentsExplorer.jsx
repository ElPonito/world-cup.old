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

        this.map.on('dragend', this.redrawSegments)
        this.map.on('zoomend', this.redrawSegments)

        this.getUserPosition()
    }

    componentWillUnmount() {
        this.map.remove()
    }

    getUserPosition() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.map.setCenter([position.coords.longitude, position.coords.latitude])
                this.drawSegments()
            }, this.drawSegments)
        }
    }

    redrawSegments = () => {
        this.removeSegmentsFromMap()
        this.drawSegments()
    }

    drawSegments = () => {
        const bounds = this.map.getBounds()
        const formattedBounds = `${bounds._sw.lat}, ${bounds._sw.lng}, ${bounds._ne.lat}, ${bounds._ne.lng}`
        return this.getAndDrawSegments(formattedBounds)
    }

    getAndDrawSegments = bounds => Strava.getSegments(bounds).then(segmentsList => {
        this.setState({ mapSegmentsList: segmentsList })
        this.addSegmentsToMap(segmentsList)
    })

    addSegmentsToMap = segmentsList => {
        segmentsList.map(segment => {
            const decodedPolyline = polyline.decode(segment.points)
            const coordinates = decodedPolyline.map(([lat, lng]) => [lng, lat])
            this.map.addLayer({
                'id': segment.id.toString(),
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
                'id': `${segment.id}-point`,
                'type': 'symbol',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [{
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [segment.start_latlng[1], segment.start_latlng[0]]
                            },
                            'properties': {
                                'title': segment.name,
                                'icon': 'triangle'
                            }
                        }]
                    }
                },
                'layout': {
                    'icon-image': '{icon}-15',
                }
            })
            this.map.on('click', `${segment.id.toString()}-point`, e => {
                //@formatter:off
                            new mapboxgl.Popup()
                                .setLngLat(e.lngLat)
                                .setHTML(`<div id='${segment.id}'></div>`)
                                .addTo(this.map)
                            //@formatter:on
                ReactDOM.render(this.renderSegmentPopUp(segment), document.getElementById(segment.id))
            })
        })
    }

    removeSegmentsFromMap = () => this.state.mapSegmentsList.forEach(segment => {
        this.map.removeLayer(`${segment.id}-point`)
        this.map.removeSource(`${segment.id}-point`)
        this.map.removeLayer(`${segment.id}`)
        this.map.removeSource(`${segment.id}`)
    })

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