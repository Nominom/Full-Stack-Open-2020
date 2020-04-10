import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
	return (
		<h1>{props.name}</h1>
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
			{props.parts.map(p => <Part key={p.id} part={p}/>)}
		</div>
	)
}

const Total = (props) => {
	return (
		<p>Number of exercises {props.parts.reduce((total, next) => total + next.exercises, 0)}</p>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name}/>
			<Content parts={course.parts}/>
			<Total parts={course.parts}/>
		</div>
	)
}

const App = () => {
	const course = {
	  id: 1,
	  name: 'Half Stack application development',
	  parts: [
		{
		  name: 'Fundamentals of React',
		  exercises: 10,
		  id: 1
		},
		{
		  name: 'Using props to pass data',
		  exercises: 7,
		  id: 2
		},
		{
		  name: 'State of a component',
		  exercises: 14,
		  id: 3
		},
		{
		  name: 'Redux',
		  exercises: 12,
		  id: 4
		}
	  ]
	}
  
	return (
	  <div>
		<Course course={course} />
	  </div>
	)
  }

ReactDOM.render(<App />, document.getElementById('root'))