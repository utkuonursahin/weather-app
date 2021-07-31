import View from "./View";
import icons from '../../images/sprite.svg'; // Parcel 1

class ForecastView extends View{
    _parentElement = document.querySelector('.card__container')

    _createMarkup(){
        const forecast = this._data.currentForecast
        return `
        <div class="card">

            <section class="card__weather">

                <div class="card__header">
                    <h1 class="card__header--info heading-1">
                        ${this._data.location.city} / ${(this._data.location.country)}
                        <span>${forecast.date}</span>
                    </h1>
                </div>

                <div class="card__weather--temp">
                    <span class="card__weather--temp--current">
                        ${forecast.tempDay}°C
                        <span class="card__weather--temp--minmax">${forecast.tempMin} / ${forecast.tempMax}</span>
                    </span>
                    <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="" class="card__weather--temp--icon">
                    <span class="card__weather--temp--description">${forecast.description}</span>
                    <span class="card__weather--temp--feel">RealFeel : ${forecast.tempFeel}°C</span>
                </div>

                <div class="card__weather--details">
                    <span class="card__weather--detail card__weather--details--sunrise">
                        <svg class="card__weather--icons">
                            <use href="${icons}#icon-sunrise" class="card__weather--icon"></use>
                        </svg>
                        ${forecast.sunrise}
                    </span>
                    <span class="card__weather--detail card__weather--details--sunset">
                        <svg class="card__weather--icons">
                            <use href="${icons}#icon-sunset" class="card__weather--icon"></use>
                        </svg>
                        ${forecast.sunset}
                    </span>
                    <span class="card__weather--detail card__weather--details--humidity">
                        <svg class="card__weather--icons">
                            <use href="${icons}#icon-humidity" class="card__weather--icon"></use>
                        </svg>
                        ${forecast.humidity}%
                    </span>
                    <span class="card__weather--detail card__weather--details--wind">
                        <svg class="card__weather--icons">
                            <use href="${icons}#icon-wind" class="card__weather--icon"></use>
                        </svg>
                        ${forecast.windSpeed} km/h
                    </span>
                </div>
            </section>

            <section class="card__forecasts">
                ${this._data.weeklyForecasts.map(this._createForecastsMarkup).join('')}
            </section>

        </div>
        `
    }

    _createForecastsMarkup(forecast){
        return `
             <div class="forecast">
                  <h2 class="heading-2 forecast__date">${forecast.day}<span>${forecast.date}</span></h2>
                  <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="Forecast icon" class="forecast__icon">
                  <span class="forecast__temp">${forecast.tempDay}°</span>
                  <span class="forecast__description">${forecast.main}</span>
             </div>`
    }
}
export default new ForecastView()