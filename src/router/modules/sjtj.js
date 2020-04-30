/**
 * 首页路由配置
 */
export default {
	path: '/home/sjtj',
	name: 'sjtj',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '数据统计'
	},
	redirect: '/home/sjtj/tdjy',
	children: [
		{
			path: '/home/sjtj/fbmjtj',
			name: 'fbmjtj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '发布面积统计',
				icon: 'document'
			}
		},
		{
			path: '/home/sjtj/fbsltj',
			name: 'fbsltj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '发布数量统计',
				icon: 'document'
			}
		},
		{
			path: '/home/sjtj/cjmjtj',
			name: 'cjmjtj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '成交面积统计',
				icon: 'document'
			}
		},
		{
			path: '/home/sjtj/cjsltj',
			name: 'cjsltj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '成交数量统计',
				icon: 'document'
			}
		},
		{
			path: '/home/sjtj/jgzstj',
			name: 'jgzstj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '价格走势统计',
				icon: 'document'
			}
		}
	]
};
