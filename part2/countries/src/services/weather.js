import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org'

const getWeather = (props) => {
    const apiKey = import.meta.env.VITE_APIKEY_WEATHER
    const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${props[0]}&lon=${props[1]}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default {
    getWeather
}