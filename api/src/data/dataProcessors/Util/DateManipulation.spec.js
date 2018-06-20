const expect = require('chai').expect
const DateManipulation = require('./DateManipulation')

describe('dateManipulation', () => {
    describe('createUTCMidnightISODatefromTimestamp', () => {
        it('Should set UTC hours, minutes, seconds and milliseconds to 0 and return ISO String', () => {
            const date = new Date(2017, 9, 17, 14, 14, 12)
            const timestamp = date.getTime()
            const utcMidnightISODate = DateManipulation.createUTCMidnightISODatefromTimestamp(timestamp)
            expect(utcMidnightISODate).to.equal('2017-10-17T00:00:00.000Z')
        })
    })
})