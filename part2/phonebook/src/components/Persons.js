import React from 'react'

const Persons = ({ persons, deletePerson }) => {
	return (
		<div>
			<ul>
				{persons.map(person =>
					<li key={person.name}>
						{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
					</li>)}
			</ul>
		</div>
	)
}

export default Persons