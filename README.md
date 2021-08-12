# Weather Forecast Project

## Project Description
This is a weather forecast project for my portfolio. It's pretty simple.If you allow the location services it finds your current location and displays the weather forecast for that location initially. Also it has search functionality so you can do search for any city you want. I had fun while developing this project and I think it's nice. I hope you find it nice too.
<img src="src\images\weatherphoto.png">

## Techniques That I Used To Build This Application
### First of all let's see how does it work : 
<img src="src\images\weatherdiagram.png">

### Now let's see techniques: 
In this project I used SASS and tried to implement MVC Architecture with modern ES6 modules. For bundling I used Parcel version one because version two has some bugs. For fetching forecast data I used Openweathermap Onecall API. Also I used **Netlify's serverless functions** for hiding my API keys in production so fetching data works a little bit different behind the scenes but normally it should work as I shared. **I think using serverless functions is the most importing thing that I learned while developing this project.**

## Problems & Cons
I used **Google Geocoding API**(*I could use Openweathermap Geocoding but it has its own issues too*) and for searching my application only gets a city name. As known as there are multiple cities and districts in the world with the same name. So, Google Geocoding API might can't find the result as you expected. Even though it's a rare issue if you get these weird results please just write the country name after the city name (*e.g Barcelona spain*).

I used Netlify's serverless functions for fetching data and hiding my API keys on the users' browser. Serverless functions hurt a little bit network performance approximately 0.3 - 0.5ms.

**I focused on functionality** more than design and wanted to keep the design simple. I accept that its design might needs some more work. I may update its design in the future.

With serverless functions, response object's(fetched on Netlify's server from Google's server) **statusText** property is empty in Chrome. So, I can display error's status code but not its text unfortunately. Moreover without serverless functions, Google Geocoding API accepts words which are not in English for example **İstanbul** with uppercase **i** at the start. But with serverless functions it's not possible I think it's Netlify's issue too. If you do researchs which are not proper in English you will get an error. Since Netlify's serverless functions doesn't return any reason text, I have nothing to show you as an error text at least in Chrome. So, for fixing that I added some small information to error message manually.

#### Author : Utku Onur Sahin
##### Date : 28.07.2021