import { enableES5, produce as _produce } from 'immer'

const produce = (...args) => {
	enableES5()
	return _produce(...args)
}

export default produce
