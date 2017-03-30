export const storeToken = (token) => {
    return ({
        type: 'STORE_TOKEN',
        token
    })
}