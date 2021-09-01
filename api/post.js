import axios from 'axios'

export const loadPostsAPI = () => axios.get('/posts')
export const addPostAPI = (data) => axios.post('/post', data)
export const removePostAPI = (data) => axios.delete(`/post/${data.id}`)
export const likePostAPI = (data) => axios.patch(`/post/${data.id}/like`)
export const unlikePostAPI = (data) => axios.delete(`/post/${data.id}/like`)
export const addCommentAPI = (data) => axios.post(`post/${data.postId}/comment`, data)
