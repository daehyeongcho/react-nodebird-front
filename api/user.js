import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3065' // axios 요청 앞에 항상 이 baseURL을 붙인다.

export const loginAPI = (data) => axios.post('/user/login', data)
export const logoutAPI = () => axios.post('/user/logout')
export const signupAPI = (data) => axios.post('/user', data)
export const followAPI = () => axios.post('/api/follow')
export const unfollowAPI = () => axios.post('/api/unfollow')
