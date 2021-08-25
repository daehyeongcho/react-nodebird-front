import axios from 'axios'

export const loginAPI = (data) => axios.post('/api/login', data)
export const logoutAPI = () => axios.post('/api/logout')
export const signupAPI = () => axios.post('/api/signup')
export const followAPI = () => axios.post('/api/follow')
export const unfollowAPI = () => axios.post('/api/unfollow')
