import axios from 'axios'

export const addPostAPI = (data) => axios.post('/api/post', data)
export const addCommentAPI = (data) => axios.post(`/api/post/${data.id}/comment`, data)
