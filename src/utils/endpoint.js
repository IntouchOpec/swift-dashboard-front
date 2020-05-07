export const host = process.env.HOST
export const endpoint = `${host}/api/v1/`

export const authorizeURL = `${endpoint}authorize`
export const tokenURL = `${endpoint}token`
export const refeshTokenURL = `${endpoint}/o/token/`

export const weatherURL = 'http://api.weatherapi.com/v1/forecast.json'


export const getWeatherURL = (long, lang, days, qp) => {
    return `${weatherURL}?key=${process.env.weather_key}q=${long},${lang}&days=${days}`
}

