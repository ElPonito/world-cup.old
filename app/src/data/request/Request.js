const makeRequest = (url, body, method = 'GET', headers) =>
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        if(headers) {
            Object.entries(headers).map(([key, value]) => {
                xhr.setRequestHeader(key, value)
            })
        }

        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(xhr.statusText)
            }
        }

        xhr.onerror = () => reject(xhr.statusText)
        xhr.send(body)
    })

const GET = (url) => {
    return makeRequest(url)
}

const PUT = (url, body) => {
    return makeRequest(url, body, 'PUT')
}

const POST = (url, body, headers) => {
    const localHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers
    }
    return makeRequest(url, body, 'POST', localHeaders)
}

export {
    GET,
    PUT,
    POST
}