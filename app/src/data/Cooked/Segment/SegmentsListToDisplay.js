import Segment from './Segment'

export default class SegmentsListToDisplay {
    constructor(rawSegmentsList) {
        this.list = rawSegmentsList.map(rawSegment => new Segment(rawSegment))
    }
}