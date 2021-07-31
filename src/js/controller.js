'use strict'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as model from './model'
import forecastView from './Views/forecastView'
import searchView from "./Views/searchView";
import {getPosition} from "./helpers";
if (module.hot) module.hot.accept() //Hot module replacement

const controlGeoLocation = async function(){
    try{
        if(!navigator.geolocation) return
        //await Promise.reject(new Error('Rejected')) //It's the same as if there is an error throw.
        const position = await getPosition()
        forecastView.renderSpinner()
        await model.getReverseGeoAddress(position.coords)
        await model.getWeatherData()
        model.setForecasts()
        forecastView.render(model.state)
    }catch(error){
        forecastView.renderInformation(error.message)
    }
}

const controlSearchResult = async function(){
    try{
        const query = searchView.getQuery()
        if(!query) return
        forecastView.renderSpinner()
        await model.getGeoAddress(query)
        await model.getWeatherData()
        model.setForecasts()
        forecastView.render(model.state)
    }catch(error){
        forecastView.renderInformation(error.message)
    }
}

const init = function (){
    forecastView.addHandlerLoad(controlGeoLocation)
    searchView.addHandlerSubmit(controlSearchResult)
}
init()


