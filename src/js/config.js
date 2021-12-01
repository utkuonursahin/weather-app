export const GEOLOCATION_REJECT_MESSAGE = "If you want to see the weather forecast for your current location please open your location services. If you don't you can close this message and still continue to use the app."
export const INVALID_QUERY = 'Couldn\'t find any data for this city. Please write it correctly and be sure it\'s in English.'

//They run in serverless
export const SERVERLESS_URL = 'https://uosweather.netlify.app/.netlify/functions'

export const INTL_DATE_OPTIONS = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
}
export const INTL_HOUR_OPTIONS = { hourCycle: 'h24', hour: '2-digit', minute: '2-digit' }
export const CONVERT_TO_MS = 1000
export const TIMEOUT_SEC = 8