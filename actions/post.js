/** action type */
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST'
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS'
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE'

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST'
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS'
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE'

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const RETWEET_REQUEST = 'RETWEET_REQUEST'
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS'
export const RETWEET_FAILURE = 'RETWEET_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const OPEN_EDIT_FORM = 'OPEN_EDIT_FORM'
export const CLOSE_EDIT_FORM = 'CLOSE_EDIT_FORM'

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

/** action creator */
export const loadPostsRequest = (data) => ({
	type: LOAD_POSTS_REQUEST,
	data,
})
export const loadUserPostsRequest = (data) => ({
	type: LOAD_USER_POSTS_REQUEST,
	data,
})
export const loadHashtagPostsRequest = (data) => ({
	type: LOAD_HASHTAG_POSTS_REQUEST,
	data,
})
export const loadPostRequest = (data) => ({
	type: LOAD_POST_REQUEST,
	data,
})
export const addPostRequest = (data) => ({
	type: ADD_POST_REQUEST,
	data,
})
export const editPostRequest = (id, data) => ({
	type: EDIT_POST_REQUEST,
	id,
	data,
})
export const removePostRequest = (data) => ({
	type: REMOVE_POST_REQUEST,
	data,
})
export const uploadImagesRequest = (data) => ({
	type: UPLOAD_IMAGES_REQUEST,
	data,
})
export const likePostRequest = (data) => ({
	type: LIKE_POST_REQUEST,
	data,
})
export const unlikePostRequest = (data) => ({
	type: UNLIKE_POST_REQUEST,
	data,
})
export const retweetRequest = (data) => ({
	type: RETWEET_REQUEST,
	data,
})
export const addCommentRequest = (data) => ({
	type: ADD_COMMENT_REQUEST,
	data,
})
export const openEditForm = (data) => ({
	type: OPEN_EDIT_FORM,
	data,
})
export const closeEditForm = () => ({
	type: CLOSE_EDIT_FORM,
})
export const removeImage = (data) => ({
	type: REMOVE_IMAGE,
	data,
})
