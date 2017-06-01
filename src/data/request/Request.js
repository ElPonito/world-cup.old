const makeRequest = (url, body, method = 'GET', headers) =>
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        if (headers) {
            Object.entries(headers).map(([key, value]) => {
                xhr.setRequestHeader(key, value)
            })
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
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

const PUT = (url, params) => {
    return makeRequest(url, params, 'PUT')
}

const POST = (url, params) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    return makeRequest(url, params, 'POST', headers)
}

export {
    GET,
    PUT,
    POST
}