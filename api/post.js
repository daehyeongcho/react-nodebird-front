import axios from 'axios'

export const addPostAPI = (data) => axios.post('/post', data)
export const addCommentAPI = (data) => axios.post(`post/${data.postId}/comment`, data)
