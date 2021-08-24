import { useEffect } from 'react'

const useKeypress = (key, action) => {
	useEffect(() => {
		const onKeyup = (e) => e.keyCode === key && action()
		window.addEventListener('keyup', onKeyup)
		return () => window.removeEventListener('keyup', onKeyup)
	}, [])
}

export default useKeypress
