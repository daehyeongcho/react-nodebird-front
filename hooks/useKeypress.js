import { useEffect } from 'react'

/** useKeypress
 * - 키보드 버튼에 따라 사용자 정의 된 action을 하게 할 수 있음
 */
const useKeypress = (key, action) => {
	useEffect(() => {
		const onKeyup = (e) => e.keyCode === key && action()
		window.addEventListener('keyup', onKeyup)
		return () => window.removeEventListener('keyup', onKeyup)
	}, [])
}

export default useKeypress
