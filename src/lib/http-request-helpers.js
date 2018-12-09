const BASE_URL = 'http://localhost:4000';

const throwErrorOnFailedRequest = response => {
    if(!response.ok){
        return response.text().then(txt => {
            throw new Error(txt);
        });
    }
    return response;
}

export const get = (url) => {
    return fetch(`${BASE_URL}${url}`)
        .then(throwErrorOnFailedRequest)
        .then(response => response.json())
}

export const post = (url, data) => {
    return fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
        .then(throwErrorOnFailedRequest)
        .then(response => response.json())
}

export const put = (url, data) => {
    return fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
        .then(throwErrorOnFailedRequest)
        .then(response => response.json())
}