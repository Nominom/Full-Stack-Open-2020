import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ country }) => {
	const [weather, setWeather] = useState(null)
	const api_key = process.env.REACT_APP_API_KEY
	const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

	useEffect(() => {
		axios.get(url).then(response => {
			setWeather(response.data)
		})
	}, [url])

	if (weather === null) {
		return (
			<div>
				<h2>Weather</h2>
				<div>Loading weather data...</div>
			</div>
		)
	} else if (weather.success === false) {
		return (
			<div>
				<h2>Weather</h2>
				<div>No weather data available</div>
			</div>
		)
	} else {
		return (
			<div>
				<h2>Weather in {country.capital}</h2>
				<p><b>temperature: </b> {weather.current.temperature} Celcius</p>
				<img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
				<p><b>wind:</b> {weather.current.wind_speed} km/h {weather.current.wind_dir}</p>
			</div>
		)
	}

}



const SingleCountryView = ({ country }) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)}
			</ul>
			<img src={country.flag} height={100} alt='flag' />
			<Weather country={country} />
		</div>
	)
}

const CountryFilter = ({ value, onChange }) => {
	return (
		<div>
			Find countries <input value={value} onChange={onChange} />
		</div>
	)
}

const CountryList = ({ countries, setCountry }) => {
	return (
		<div>
			{countries.map(country =>
				<div key={country.alpha3Code}>
					{country.name} &nbsp;
					<button value={country.name} onClick={setCountry}>show</button>
				</div>
			)}
		</div>
	)
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [filterString, setNewFilter] = useState('')
	const url = 'https://restcountries.eu/rest/v2/all'

	useEffect(() => {
		axios.get(url).then(response => {
			console.log(response.data)
			setCountries(response.data)
		})
	}, [url])

	const onFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	const filterCountries = () => {
		const filter = filterString.toLowerCase()
		return countries.filter(country =>
			country.name.toLowerCase().includes(filter))
	}

	const setCountry = (event) => {
		setNewFilter(event.target.value)
	}

	const filtered = filterCountries()

	if (filtered.length === 1) {
		return (
			<div>
				<CountryFilter value={filterString} onChange={onFilterChange} />
				<SingleCountryView country={filtered[0]} />
			</div>
		)
	} else if (filtered.length <= 10 || filterString === '') {
		return (
			<div>
				<CountryFilter value={filterString} onChange={onFilterChange} />
				<CountryList countries={filtered} setCountry={setCountry} />
			</div>
		)
	} else {
		return (
			<div>
				<CountryFilter value={filterString} onChange={onFilterChange} />
				<div>Too many matches, specify another filter</div>
			</div>
		)
	}

}

export default App
