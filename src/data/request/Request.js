const makeRequest = (method, url) => {
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
        xhr.send();
    });
}

const GET = (url) => {
    return makeRequest('GET', url)
}

const PUT = (url) => {
    return makeRequest('PUT', url)
}

const POST = (url) => {
    return makeRequest('POST', url)
}

export {
    GET,
    PUT,
    POST
}