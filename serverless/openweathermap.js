const fetch = require("node-fetch");

exports.handler = async function (event,context){
    const params = event.queryStringParameters
    const {lat,lng} = params
    const OWM_ID = process.env.OWM_ID
    const OWM_CONFIGS = 'units=metric&exclude=minutely,hourly,current'
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&${OWM_CONFIGS}&appid=${OWM_ID}`
    try{
        const fetchData = await fetch(url)
        const data = await fetchData.json()
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }catch(err){
        return {statusCode: 422, body: err.stack}
    }
};