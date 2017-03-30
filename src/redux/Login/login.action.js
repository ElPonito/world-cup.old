export const storeToken = (token, athlete) => {
    return ({
        type: 'STORE_TOKEN',
        token,
        athlete
    })
}