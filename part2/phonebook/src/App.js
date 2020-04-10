import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterString, setNewFilter] = useState('')

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
			setPersons(persons.concat(newPerson))
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


	return (
		<div>
			<h2>Phonebook</h2>
			Filter by <input value={filterString} onChange={handleFilterChange} />
			<h2>Add new contact</h2>
			<form onSubmit={addPerson}>
				<div>
					<div>name: <input value={newName} onChange={handleNameChange} /></div>
					<div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{filterPersons().map(person =>
					<li key={person.name}>
						{person.name} {person.number}
					</li>)
				}
			</ul>
		</div>
	)
}

export default App