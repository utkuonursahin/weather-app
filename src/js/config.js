export const GEOLOCATION_REJECT_MESSAGE = "If you want to see the weather forecast for your current location please open your location services. If you don't you can close this message and still continue to use the app."
export const FETCH_WEATHER_FAILED = 'We can\'t get weather data for that location currently. Please try again.'
export const INVALID_QUERY = 'No data found for this city. Please write it correctly and in English.'

//They run in serverless
export const GC_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?&language=en'
export const GC_API_SEARCH_TYPE = 'result_type=administrative_area_level_1'
export const OWM_CONFIGS = '&units=metric&exclude=minutely,hourly,current&'
export const OWM_API_URL = 'https://api.openweathermap.org/data/2.5/onecall?'

export const INTL_DATE_OPTIONS = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
}
export const INTL_HOUR_OPTIONS = {hourCycle:'h24', hour:'2-digit', minute:'2-digit'}

export const CONVERT_TO_MS = 1000
export const TIMEOUT_SEC = 8
