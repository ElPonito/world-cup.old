import React, { Component } from 'react'
import Strava from '../../../data/rest/Strava'
import config from '../../../app-config'
// import mapboxgl from 'mapbox-gl'
const mapboxgl = require('mapbox-gl')

mapboxgl.accessToken = config.mapboxToken

export default class SegmentsExplorer extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/outdoors-v9',
            center: [5.724524, 45.188529],
            zoom: 10
        })
        // TODO remove, it's just a test
        const bounds = this.map.getBounds()
        const b = [bounds._ne.lat, bounds._ne.lng, bounds._sw.lat, bounds._sw.lng]
        Strava.getSegments(JSON.stringify(b)).then(result => {
            console.log(JSON.parse(result))
        })
    }

    componentWillUnmount() {
        this.map.remove()
    }

    render() {
        return (
            <div ref={el => this.mapContainer = el}/>
        )
    }
}