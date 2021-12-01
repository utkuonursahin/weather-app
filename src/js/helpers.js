import { GEOLOCATION_REJECT_MESSAGE, TIMEOUT_SEC, INVALID_QUERY } from "./config";
const timeout = function (sec) {
    return new Promise(reject => setTimeout(() => reject(new Error('Request took too long!')), sec * 1000))
}

export const getJSON = async function (url) {
    try {
        const response = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)])
        if (!response.ok) throw new Error(`Something went wrong: ${response.statusText || response.message || ':/'} (${response.status || 408}) ${INVALID_QUERY}`)
        return await response.json()
    } catch (error) {
        throw error
    }
}

export const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, () => reject(new Error(`${GEOLOCATION_REJECT_MESSAGE}`)))
    })
}