const $cityName = document.querySelector('.cityName');
const $input = document.querySelector('input');
const $btn = document.querySelector('button');
const $warrning = document.querySelector('.warrning');
const $img = document.querySelector('img');
const $weather = document.querySelector('.infoWeater');
const $temperature = document.querySelector('.infoTemperature');
const $humidity = document.querySelector('.infoHumidity');

const $apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const $apiKey = '&APPID=921fee0514cf8b286d4a3aca8b8d4643';
const $units = '&units=metric';

let $city;
let $url;
let $weatherId;

const getWeather = () => {
    $city = $input.value;
    $url = $apiLink + $city + $apiKey + $units;

    axios.get($url)
        .then(res => {
            $cityName.textContent = res.data.name;
            $temperature.textContent = Math.round(res.data.main.temp) + '°C';
            $humidity.textContent = res.data.main.humidity + '%';
            $weather.textContent = res.data.weather[0].main;
            $weatherId = res.data.weather[0].id;

            if ($weatherId < 300) {
                $img.src = 'image/thunderstorm.png'
            } else if ($weatherId < 400) {
                $img.src = 'image/drizzle.png'
            } else if ($weatherId < 600) {
                $img.src = 'image/rain.png'
            } else if ($weatherId < 700) {
                $img.src = 'image/snow.png'
            } else if ($weatherId < 800) {
                $img.src = 'image/fog.png'
            } else if ($weatherId == 800) {
                $img.src = 'image/sun.png'
            } else if ($weatherId < 805) {
                $img.src = 'image/cloud.png'
            } else {
                $img.src = 'image/unknown.png'
            }
            $input.value = '';
            $warrning.textContent = '';
        })
        .catch(() => {
            $warrning.textContent = 'Wpisz prawidłową nazwę miasta';
            $input.value = '';
        });
};

const enterPress = () => {
    if (event.keyCode === 13) {
        getWeather()
    };
};

$btn.addEventListener('click', getWeather);
$input.addEventListener('keyup', enterPress);