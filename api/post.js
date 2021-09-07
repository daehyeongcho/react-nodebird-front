import axios from 'axios'

export const loadPostsAPI = (data) => axios.get(`/posts?lastId=${data?.lastId || 0}`)
export const loadUserPostsAPI = (data) =>
	axios.get(`/user/${data.email}/posts?lastId=${data?.lastId || 0}`)
export const loadHashtagPostsAPI = (data) =>
	axios.get(`/hashtag/${encodeURIComponent(data.hashtag)}/posts?lastId=${data?.lastId || 0}`)
export const loadPostAPI = (data) => axios.get(`/post/${data.id}`)
export const addPostAPI = (data) => axios.post('/post', data)
export const removePostAPI = (data) => axios.delete(`/post/${data.id}`)
export const uploadImagesAPI = (data) => axios.post(`/post/images`, data)
export const likePostAPI = (data) => axios.patch(`/post/${data.id}/like`)
export const unlikePostAPI = (data) => axios.delete(`/post/${data.id}/like`)
export const retweetAPI = (data) => axios.post(`/post/${data.id}/retweet`)
export const addCommentAPI = (data) => axios.post(`post/${data.postId}/comment`, data)
