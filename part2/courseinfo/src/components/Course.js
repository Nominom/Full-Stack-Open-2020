import React from 'react'

const Header = (props) => {
	return (
		<h2>{props.name}</h2>
	)
}

const Part = (props) => {
	return (
		<p>
			{props.part.name} {props.part.exercises}
		</p>
	)
}

const Content = (props) => {
	return (
		<div>
			{props.parts.map(p => <Part key={p.id} part={p} />)}
		</div>
	)
}

const Total = (props) => {
	return (
		<p>
			<b>
				Number of exercises {props.parts.reduce((total, next) => total + next.exercises, 0)}
			</b>
		</p>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course