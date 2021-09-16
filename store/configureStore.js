import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import reducer from '../_reducers'
import rootSaga from '../_sagas'

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware()
	const middlewares = [sagaMiddleware, logger]
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares))
	const store = createStore(reducer, enhancer)
	store.sagaTask = sagaMiddleware.run(rootSaga)
	return store
}

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' })

export default wrapper
