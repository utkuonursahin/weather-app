import {
    INTL_HOUR_OPTIONS, INTL_DATE_OPTIONS, CONVERT_TO_MS,
    INVALID_QUERY, GC_API_URL, GC_API_SEARCH_TYPE, OWM_API_URL, OWM_CONFIGS } from "./config";
import {GC_API_ID, OWM_ID} from "./apiID";
import {getJSON} from "./helpers";

export const state ={
    // Displaying initial data types
    location: {}, // Holding location data for future
    allForecasts: [], // All weather forecast data came from API
    currentForecast:{}, // Weather forecast for current day
    weeklyForecasts: {} // Weather forecasts for other six days
}

export const setForecasts = function (){
    //Setting current forecast with detailed information
    const curForecast = state.allForecasts[0]
    state.currentForecast = {
        // Rounding temperatures to closes integer
        tempDay: Math.round(curForecast.temp.day),
        tempMin: Math.round(curForecast.temp.min),
        tempMax: Math.round(curForecast.temp.max),
        tempFeel:Math.round(curForecast.feels_like.day),
        // Converting timestamps to date and hours
        sunrise: new Intl.DateTimeFormat('en', INTL_HOUR_OPTIONS).format(new Date(curForecast.sunrise * CONVERT_TO_MS)),
        sunset: new Intl.DateTimeFormat('en', INTL_HOUR_OPTIONS).format(new Date(curForecast.sunset * CONVERT_TO_MS)),
        date: new Intl.DateTimeFormat('en', INTL_DATE_OPTIONS).format(curForecast.dt * CONVERT_TO_MS),
        humidity: curForecast.humidity,
        windSpeed: curForecast.wind_speed,
        icon: curForecast.weather[0].icon,
        description: (curForecast.weather[0].description).replace(curForecast.weather[0].description[0],curForecast.weather[0].description[0].toUpperCase())
    }
    //Setting other six days forecast with less detailed information
    const otherForecasts = state.allForecasts.slice(1,-1) // Excluding current day from start and finish of array
    state.weeklyForecasts = otherForecasts.map(forecast => {
        // Converting timestamps to dates
        const fullDate = new Intl.DateTimeFormat('en',INTL_DATE_OPTIONS).format(forecast.dt * CONVERT_TO_MS)
        const dateArray = fullDate.split(',')
        return {
            tempDay: Math.round(forecast.temp.day),
            icon: forecast.weather[0].icon,
            main: (forecast.weather[0].main),
            date: dateArray[dateArray.length-1].trim(),
            day: dateArray[0]
        }
    })
}

export const getGeoAddress = async function(query){ //name to coordinates
    const data = await getJSON(`${GC_API_URL}&address=${query}&key=${GC_API_ID}`)
    if(data.status === 'ZERO_RESULTS') throw new Error(INVALID_QUERY)
    const [dataResult] = data.results
    const addressArray = dataResult.formatted_address.split(',')
    if(addressArray.length < 2) throw new Error(INVALID_QUERY)
    //--> Destructuring cause unwanted results for some cities (e.g Rome, New York), they should be exactly the first and last element on array.
    const city = addressArray[0]
    const country = addressArray[addressArray.length-1].trim()
    state.location = {
        lat: dataResult.geometry.location.lat,
        lng: dataResult.geometry.location.lng,
        country, city
    }
}

export const getReverseGeoAddress = async function(coords){ //coordinates to name
    try {
        const {latitude: lat, longitude: lng} = coords
        const data = await getJSON(`${GC_API_URL}&latlng=${lat},${lng}&${GC_API_SEARCH_TYPE}&key=${GC_API_ID}`)
        const [dataResult] = data.results
        const [city,country] = dataResult.formatted_address.split(',')
        state.location = {lat, lng, city, country: country.trim()}
    }catch (error){
        throw error
    }
}

export const getWeatherData = async function(){
    try{
        const {lat,lng} = state.location
        const data = await getJSON(`${OWM_API_URL}lat=${lat}&lon=${lng}${OWM_CONFIGS}appid=${OWM_ID}`)
        state.allForecasts = data.daily
    }catch (error){
        throw error
    }
}


