import { useState, useCallback } from 'react'

/** 단일 input을 관리하기 위한 커스텀 훅 */
export const useInput = (initialValue) => {
	const [input, setInput] = useState(initialValue)
	const onChange = useCallback((e) => setInput(e.target.value), [initialValue])
	const reset = useCallback(() => setInput(initialValue), [initialValue])
	return [input, onChange, reset]
}

/** 여러 input들을 한꺼번에 관리하기 위한 커스텀 훅
 * - initialValue에는 { email: '', password: '' } 형태의 객체가 들어온다.
 * - <input>의 name property엔 state와 동일한 이름이 들어가야 함.
 */
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
