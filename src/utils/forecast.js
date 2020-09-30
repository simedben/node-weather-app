const request = require('request')

const toFahrenheit = (temperature) => {
    return Math.round(temperature * 1.8 + 32);
};


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5a383e9343527c912f9badaea5b72a89&query=${longitude},${latitude}`
    request({
        url: url,
        json: true,
    }, (error, response) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = toFahrenheit(response.body.current.temperature);
            const feelsLike = toFahrenheit(response.body.current.feelslike);
            const descriptions = response.body.current.weather_descriptions;
            callback(undefined, `${descriptions} It is currently ${temperature} degress out. it feels like ${feelsLike} degress out.`)
        }
    })
}

module.exports = forecast