const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** 커스텀 웹팩
 * - next.js는 기본 웹팩 설정이 있기 때문에 불변성을 지키면서 커스터마이징함.
 */
module.exports = withBundleAnalyzer({
	compress: true,
	webpack(config /* ,{ webpack } */) {
		const prod = process.env.NODE_ENV === 'production'
		return {
			...config,
			mode: prod ? 'production' : 'development',
			devtool: prod ? 'hidden-source-map' : 'eval', // 배포일 땐 소스코드 숨김
		}
	},
})
