import {
    INTL_HOUR_OPTIONS, INTL_DATE_OPTIONS, CONVERT_TO_MS,
    INVALID_QUERY, SERVERLESS_URL,
} from "./config";
import { getJSON } from "./helpers";

export const state = {
    location: {},
    allForecasts: '',
    currentForecast: {},
    weeklyForecasts: {}
}

export const setForecasts = function () {
    //Setting current forecast with detailed information
    const curForecast = state.allForecasts[0]
    state.currentForecast = {
        tempDay: Math.round(curForecast.temp.day),
        tempMin: Math.round(curForecast.temp.min),
        tempMax: Math.round(curForecast.temp.max).toFixed(0),
        tempFeel: Math.round(curForecast.feels_like.day),
        sunrise: new Intl.DateTimeFormat('en', INTL_HOUR_OPTIONS).format(new Date(curForecast.sunrise * CONVERT_TO_MS)),
        sunset: new Intl.DateTimeFormat('en', INTL_HOUR_OPTIONS).format(new Date(curForecast.sunset * CONVERT_TO_MS)),
        humidity: curForecast.humidity,
        windSpeed: curForecast.wind_speed,
        icon: curForecast.weather[0].icon,
        description: (curForecast.weather[0].description).replace(curForecast.weather[0].description[0], curForecast.weather[0].description[0].toUpperCase()),
        date: new Intl.DateTimeFormat('en', INTL_DATE_OPTIONS).format(curForecast.dt * CONVERT_TO_MS)
    }
    //Setting other six days forecast with small information
    const otherForecasts = state.allForecasts.slice(1, -1)
    state.weeklyForecasts = otherForecasts.map(forecast => {
        const fullDate = new Intl.DateTimeFormat('en', INTL_DATE_OPTIONS).format(forecast.dt * CONVERT_TO_MS)
        const dateArray = fullDate.split(',')
        return {
            tempDay: Math.round(forecast.temp.day),
            icon: forecast.weather[0].icon,
            main: (forecast.weather[0].main),
            date: dateArray[dateArray.length - 1].trim(),
            day: dateArray[0]
        }
    })
}

export const getGeoAddress = async function (query) { //name to coordinates
    try {
        const data = await getJSON(`${SERVERLESS_URL}/geocoding?query=${query}`)
        if (data.status === 'ZERO_RESULTS') throw new Error(INVALID_QUERY)
        const [dataResult] = data.results
        if (!dataResult) throw new Error(`Something went wrong: Server problem`)
        const addressArray = dataResult.formatted_address.split(',')
        if (addressArray.length < 2) throw new Error(INVALID_QUERY)
        const city = addressArray[0]
        const country = addressArray[addressArray.length - 1].trim()
        state.location = {
            lat: dataResult.geometry.location.lat,
            lng: dataResult.geometry.location.lng,
            country: country.trim(),
            city: city
        }
    } catch (error) {
        throw error
    }

}

export const getReverseGeoAddress = async function (coords) { //coordinates to name
    try {
        const { latitude: lat, longitude: lng } = coords
        const data = await getJSON(`${SERVERLESS_URL}/reverseGeocoding?lat=${lat}&lng=${lng}`)
        const [dataResult] = data.results
        if (!dataResult) throw new Error(`Something went wrong: Server problem`)
        const [city, country] = dataResult.formatted_address.split(',')
        state.location = { lat, lng, city, country: country.trim() }
    } catch (error) {
        throw error
    }
}

export const getWeatherData = async function () {
    try {
        const { lat, lng } = state.location
        const data = await getJSON(`${SERVERLESS_URL}/openweathermap?lat=${lat}&lng=${lng}`)
        state.allForecasts = data.daily
    } catch (error) {
        throw error
    }
}


