import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { List, Button, Card } from 'antd'
import { StopOutlined } from '@ant-design/icons'

import { unfollowRequest, removeFollowerRequest } from '../../actions/user'
import styles from './FollowList.module.css'

/** 팔로잉/팔로워 목록 컴포넌트
 * /profile 페이지에서 header와 me의 Followings 혹은 Followers list를
 * 받아와서 antd List 컴포넌트로 렌더링함
 */
const FollowList = ({ header, data }) => {
	const dispatch = useDispatch()
	const grid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), [])

	const onCancel = useCallback(
		(email) => () => {
			if (header.startsWith('팔로잉')) {
				dispatch(unfollowRequest({ email }))
			} else {
				dispatch(removeFollowerRequest({ email }))
			}
		},
		[],
	)

	/* data list 렌더링 */
	const renderFollow = useCallback(
		(item) => (
			<List.Item className={styles.list_item}>
				<Card actions={[<StopOutlined key='stop' onClick={onCancel(item.email)} />]}>
					<Card.Meta description={item.nickname} />
				</Card>
			</List.Item>
		),
		[],
	)

	return (
		<>
			<List
				className={styles.list}
				grid={grid}
				size='small'
				header={<div>{header}</div>}
				loadMore={
					<div className={styles.load_more}>
						<Button>더 보기</Button>
					</div>
				}
				bordered
				dataSource={data}
				renderItem={renderFollow}
			/>
		</>
	)
}

FollowList.propTypes = {
	header: PropTypes.string.isRequired, // 팔로잉/팔로워 목록 제목을 컴포넌트 호출 때 받음
	data: PropTypes.array.isRequired, // 팔로잉/팔로워 사용자 목록
}

export default FollowList
