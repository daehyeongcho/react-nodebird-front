import { useState, useCallback } from 'react'

export const useInput = (initialValue) => {
	const [input, setInput] = useState(initialValue)
	const onChange = useCallback((e) => setInput(e.target.value), [initialValue])
	const reset = useCallback(() => setInput(initialValue), [initialValue])
	return [input, onChange, reset]
}

const useInputs = (initialValue) => {
	const [inputs, setInputs] = useState(initialValue)
	const onChange = useCallback(
		(e) => {
			const { name, value } = e.target
			setInputs({
				...inputs,
				[name]: value,
			})
		},
		[initialValue],
	)
	const reset = useCallback(() => setInputs(initialValue), [initialValue])
	return [inputs, onChange, reset]
}

export default useInputs
