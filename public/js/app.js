const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const locationMessage = document.querySelector('#location')
const forecastMessage = document.querySelector('#forecast')

const getWeatherData = (searchLocation) => {
    fetch(`http://localhost:3000/weather?address=${searchLocation}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                locationMessage.textContent = data.location
                forecastMessage.textContent = data.forecast
            }

        })
    })
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeatherData(searchInput.value)
    locationMessage.classList.remove('hide')
    searchInput.value = ""
})