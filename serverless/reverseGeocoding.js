const fetch = require("node-fetch");

exports.handler = async function (event,context){
    const params = event.queryStringParameters
    const {lat,lng} = params
    const GC_API_ID = process.env.GC_API_ID
    const url = `https://maps.googleapis.com/maps/api/geocode/json?&language=en&latlng=${lat},${lng}&result_type=administrative_area_level_1&key=${GC_API_ID}`
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