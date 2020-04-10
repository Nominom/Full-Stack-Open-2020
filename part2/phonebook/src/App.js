import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')

	const personExists = (name) => {
		return persons.some(x => x.name === name)
	}

	const addName = (event) => {
		event.preventDefault()
		if(!personExists(newName)){
			const newPerson = { name: newName }
			setPersons(persons.concat(newPerson))
			setNewName('')
		}else{
			alert(`${newName} is already added to phonebook!`)
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map(person =>
					<li key={person.name}>
						{person.name}
					</li>)
				}
			</ul>
		</div>
	)
}

export default App