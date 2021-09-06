import axios from 'axios'

export const loadMyInfoAPI = () => axios.get('/user')
export const loadUserAPI = (data) => axios.get(`/user/${data.email}`)
export const loginAPI = (data) => axios.post('/user/login', data)
export const logoutAPI = () => axios.post('/user/logout')
export const signupAPI = (data) => axios.post('/user', data)
export const changeNicknameAPI = (data) => axios.patch('/user/nickname', data)
export const followAPI = (data) => axios.patch(`/user/${data.email}/follow`)
export const unfollowAPI = (data) => axios.delete(`/user/${data.email}/follow`)
export const removeFollowerAPI = (data) => axios.delete(`/user/follower/${data.email}`)
export const loadFollowersAPI = () => axios.get(`/user/followers`)
export const loadFollowingsAPI = () => axios.get(`/user/followings`)
