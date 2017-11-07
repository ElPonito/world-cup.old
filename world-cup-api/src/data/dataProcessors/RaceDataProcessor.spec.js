const sinon = require('sinon')
const { expect } = require('chai')
const RaceDataProcessor = require('./RaceDataProcessor')
const RaceDao = require('../database/DAO/RaceDao')
const raceData = require('../../../tests/raceData.json')

describe('RaceDataProcessor', () => {
    let raceDataProcessor
    before(() => {
        const raceDao = new RaceDao()
        sinon.stub(raceDao, 'get').returns(Promise.resolve(raceData[0]))
        raceDataProcessor = new RaceDataProcessor(raceDao)
    })

    describe.only('computeRaceResult', () => {
        it('', async () => {
            const result = await raceDataProcessor.computeRaceResult('595b80f7b997e3086710938b')
            console.log('++++', result)
            expect(true).to.equal(true)
        })
    })
})