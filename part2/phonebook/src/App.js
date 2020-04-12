import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterString, setNewFilter] = useState('')

	useEffect(() => {
		personService.getAll().then(
			data => setPersons(data)
		)
	}, [])

	const filterPersons = () => {
		if (filterString === '')
			return persons

		const lowerFilter = filterString.toLowerCase()
		return persons.filter(p =>
			p.name.toLowerCase().includes(lowerFilter) ||
			p.number.toLowerCase().includes(lowerFilter))
	}

	const personExists = (name, number) => {
		return persons.some(x => x.name === name)
			|| persons.some(x => x.number === number)
	}

	const addPerson = (event) => {
		event.preventDefault()
		if (!personExists(newName, newNumber)) {
			const newPerson = { name: newName, number: newNumber }
			personService.create(newPerson).then(data => {
				setPersons(persons.concat(data))
			})
			setNewName('')
			setNewNumber('')
		} else {
			alert(`${newName} or ${newNumber} is already added to phonebook!`)
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	const deletePerson = (person) => {
		if(window.confirm(`Delete ${person.name}?`)){
			personService.remove(person.id)
			.then(data => {
				console.log(person, ' deleted')
				setPersons(persons.filter(p => p.id !== person.id))
			})
		}
	}


	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filterString} onChange={handleFilterChange} />
			<h2>Add new contact</h2>
			<PersonForm onSubmit={addPerson} newName={newName}
				handleNameChange={handleNameChange} newNumber={newNumber}
				handleNumberChange={handleNumberChange} />
			<h2>Numbers</h2>
			<Persons persons={filterPersons()} deletePerson={deletePerson} />
		</div>
	)
}

export default App