import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MostUpdooted = (props) => {
	const mostVotes = Math.max(...props.votes)
	const mostUpvoted = props.votes.indexOf(mostVotes)
	
	return (
		<div>
			<h1>Anecdote with most votes</h1>
			<p>{props.anecdotes[mostUpvoted]}</p>
			<p>has {mostVotes} votes</p>
		</div>
	)
}

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

	const randomAnecdote = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length))
	}

	const doot = () => {
		const copy = [...votes]
		copy[selected]++
		setVotes(copy)
	}

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{props.anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={doot}>updoot</button>
			<button onClick={randomAnecdote}>next anecdote</button>
			<MostUpdooted anecdotes = {anecdotes} votes = {votes}/>
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
	<App anecdotes={anecdotes} />,
	document.getElementById('root')
)