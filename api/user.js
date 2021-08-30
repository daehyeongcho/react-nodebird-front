import axios from 'axios'

const API_SERVER = 'http://localhost:3065'

export const loginAPI = (data) => axios.post(`/api/login`, data)
export const logoutAPI = () => axios.post(`/api/logout`)
export const signupAPI = (data) => {
	console.log('data', data)
	return axios.post(`${API_SERVER}/user`, data)
}
export const followAPI = () => axios.post(`/api/follow`)
export const unfollowAPI = () => axios.post(`/api/unfollow`)
