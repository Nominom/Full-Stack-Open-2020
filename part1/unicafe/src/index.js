import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {

	const all = () => {
		return props.good + props.neutral + props.bad;
	}

	const average = () => {
		return (props.good * 1 + props.neutral * 0 + props.bad * -1) / all();
	}

	const positive = () => {
		return props.good / all() * 100;
	}
	if(all() > 0){
		return (
			<>
				<h1>statistics</h1>
				<div>
					<div>good {props.good}</div>
					<div>neutral {props.neutral}</div>
					<div>bad {props.bad}</div>
					<div>all {all()}</div>
					<div>average {average()}</div>
					<div>positive {positive()}%</div>
				</div>
			</>
		)
	}else{
		return (
			<>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</>
		)
	}
	
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const increaseGood = () => setGood(good + 1)
	const increaseNeutral = () => setNeutral(neutral + 1)
	const increaseBad = () => setBad(bad + 1)

	

	return (
		<div>
			<h1>give feedback</h1>
			<div>
				<button onClick={increaseGood}>good</button>
				<button onClick={increaseNeutral}>neutral</button>
				<button onClick={increaseBad}>bad</button>
			</div>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

ReactDOM.render(<App />,
	document.getElementById('root')
)