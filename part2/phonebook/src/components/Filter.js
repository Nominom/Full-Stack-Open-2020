import React from 'react'

const Filter = ({value, onChange}) => {
	return(
		<div>
			Filter by <input value={value} onChange={onChange} />
		</div>
	)
}

export default Filter