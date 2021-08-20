import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { List, Button, Card } from 'antd'
import { StopOutlined } from '@ant-design/icons'

const FollowList = ({ header, data }) => {
	const action = useMemo(() => [<StopOutlined key='stop' />], [])
	const style = useMemo(
		() => ({
			listStyle: { marginBottom: 20 },
			listGrid: { gutter: 4, xs: 2, md: 3 },
			loadMoreStyle: { textAlign: 'center', margin: '10px 0' },
			listItemStyle: { marginTop: 20 },
		}),
		[],
	)
	const renderListItem = useCallback(
		(item) => (
			<List.Item style={style.listItemStyle}>
				<Card actions={action}>
					<Card.Meta description={item.nickname} />
				</Card>
			</List.Item>
		),
		[],
	)
	return (
		<>
			<List
				style={style.listStyle}
				grid={style.listGrid}
				size='small'
				header={<div>{header}</div>}
				loadMore={
					<div style={style.loadMoreStyle}>
						<Button>더 보기</Button>
					</div>
				}
				bordered
				dataSource={data}
				renderItem={renderListItem}
			></List>
		</>
	)
}

FollowList.propTypes = {
	header: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
}

export default FollowList
