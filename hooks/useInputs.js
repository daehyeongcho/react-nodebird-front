import { useState, useCallback } from 'react'

export default (initialValue = {}) => {
	const [inputs, setInputs] = useState(initialValue)
	const onChange = useCallback((e) => {
		const { name, value } = e.target
		setInputs({
			...inputs,
			[name]: value,
		})
	})
	return [inputs, onChange]
}
