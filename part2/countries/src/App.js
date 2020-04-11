import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const CountryList = ({ countries }) => {
	return (
		<div>
			{countries.map(country =>
				<div key={country.alpha3Code}>{country.name}</div>
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

	const filtered = filterCountries()

	if (filtered.length === 1) {
		return (
			<div>
				<CountryFilter value={filterString} onChange={onFilterChange} />
				<SingleCountryView country={filtered[0]} />
			</div>
		)
	} else if (filtered.length > 10) {
		return (
			<div>
				<CountryFilter value={filterString} onChange={onFilterChange} />
				<div>Too many matches, specify another filter</div>
			</div>
		)
	} else {
		return (
			<div>
				<CountryFilter value={filterString} onChange={onFilterChange} />
				<CountryList countries={filtered} />
			</div>
		)
	}

}

export default App
