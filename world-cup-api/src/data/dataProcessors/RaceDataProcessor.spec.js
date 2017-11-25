const sinon = require('sinon')
const { expect } = require('chai')
const RaceDataProcessor = require('./RaceDataProcessor')
const RaceDao = require('../database/DAO/RaceDao')
const raceData = require('../../../tests/raceData.js')

describe.only('RaceDataProcessor', () => {
    let raceDataProcessor, raceDao_updateRanking
    before(() => {
        const raceDao = new RaceDao()
        const raceDao_get = sinon.stub(raceDao, 'get').returns(Promise.resolve(raceData[0]))
        raceDao_get.onCall(0).returns(Promise.resolve(raceData[0]))
        raceDao_get.onCall(1).returns(Promise.resolve(raceData[1]))
        raceDao_updateRanking = sinon.stub(raceDao, 'updateRanking')
        raceDataProcessor = new RaceDataProcessor(raceDao)
    })

    describe('computeRaceResult', () => {
        it('Should compute race result when all riders rides all segments', async () => {
            const expectedResults = {
                1: 20246894,
                2: 12345678,
                3: 98765432
            }
            await raceDataProcessor.computeRaceResult('595b80f7b997e3086710938b')
            expect(raceDao_updateRanking.getCall(0).args).to.eql(['595b80f7b997e3086710938b', expectedResults])
        })

        it('Should compute race result when some riders don\'t rides some segments', async () => {
            const expectedResults = {
                1: 20246894,
                2: 98765432,
                3: 12345678,
            }
            await raceDataProcessor.computeRaceResult('1325ae98f36d8b')
            expect(raceDao_updateRanking.getCall(1).args).to.eql(['1325ae98f36d8b', expectedResults])
        })
    })
})