import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

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

	return (
		<div>
			<h2>Phonebook</h2>
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
				{persons.map(person =>
					<li key={person.name}>
						{person.name} {person.number}
					</li>)
				}
			</ul>
		</div>
	)
}

export default App