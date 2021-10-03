import axios from 'axios'
export default function (city, successCallback, errorCallback = () => {}) {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&APPID=8852c3ddb393e3e60aa0c159aaa0b762&q=${city}`)
    .then(resp => {
      successCallback(resp)
    })
    .catch(errorCallback)
}
