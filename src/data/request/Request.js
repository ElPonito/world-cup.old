const makeRequest = (method, url, params = null) => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(params);
    });
}

const GET = (url) => {
    return makeRequest('GET', url)
}

const PUT = (url, params) => {
    return makeRequest('PUT', url, params)
}

const POST = (url, params) => {
    return makeRequest('POST', url, params)
}

export {
    GET,
    PUT,
    POST
}