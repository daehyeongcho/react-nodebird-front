import axios from 'axios'

export const loadPostsAPI = (data) => axios.get(`/posts?lastId=${data?.lastId || 0}`)
export const addPostAPI = (data) => axios.post('/post', data)
export const removePostAPI = (data) => axios.delete(`/post/${data.id}`)
export const uploadImagesAPI = (data) => axios.post(`/post/images`, data)
export const likePostAPI = (data) => axios.patch(`/post/${data.id}/like`)
export const unlikePostAPI = (data) => axios.delete(`/post/${data.id}/like`)
export const retweetAPI = (data) => axios.post(`/post/${data.id}/retweet`)
export const addCommentAPI = (data) => axios.post(`post/${data.postId}/comment`, data)
