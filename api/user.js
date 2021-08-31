import axios from 'axios'

export const loginAPI = (data) => axios.post('/user/login', data)
export const logoutAPI = () => axios.post('/user/logout')
export const signupAPI = (data) => axios.post('/user', data)
export const followAPI = () => axios.post('/api/follow')
export const unfollowAPI = () => axios.post('/api/unfollow')
