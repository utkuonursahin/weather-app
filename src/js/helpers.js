import {GEOLOCATION_REJECT_MESSAGE} from "./config";

export const getJSON = async function(url){
    try{
        const response = await fetch(url)
        if(!response.ok) throw new Error(`Something went wrong: ${response.message} (${response.status})`)
        return await response.json()
    }catch(error){
        throw error
    }
}

export const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, ()=>reject(new Error(`${GEOLOCATION_REJECT_MESSAGE}`)))
    })
}