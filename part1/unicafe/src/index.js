import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
	  <h1>statistics</h1>
	  <div>
		  <div>good {good}</div>
		  <div>neutral {neutral}</div>
		  <div>bad {bad}</div>
	  </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)