import Athlete from '../../data/entities/Athlete'

export const fetchKoms = (athleteId) => dispatch => {
    Athlete.fetchKoms(athleteId).then((koms) => {
        dispatch(komsFetched(koms))
    })
}

export const komsFetched = (koms) => ({
    type: 'KOMS_FETCHED',
    data: koms
})