import React from 'react'
import PropTypes from 'prop-types'
import { List, Button, Card } from 'antd'
import { StopOutlined } from '@ant-design/icons'

/* 팔로잉/팔로워 목록 컴포넌트 */
const FollowList = ({ header, data }) => (
	<>
		<List
			style={{ marginBottom: 20 }}
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size='small'
			header={<div>{header}</div>}
			loadMore={
				<div style={{ textAlign: 'center', margin: '10px 0' }}>
					<Button>더 보기</Button>
				</div>
			}
			bordered
			dataSource={data}
			renderItem={(item) => (
				<List.Item style={{ marginTop: 20 }}>
					<Card actions={[<StopOutlined key='stop' />]}>
						<Card.Meta description={item.nickname} />
					</Card>
				</List.Item>
			)}
		/>
	</>
)

FollowList.propTypes = {
	header: PropTypes.string.isRequired, // 팔로잉/팔로워 목록 제목을 컴포넌트 호출 때 받음
	data: PropTypes.array.isRequired, // 팔로잉/팔로워 사용자 목록
}

export default FollowList
