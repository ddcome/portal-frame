/**
 * 首页路由配置
 */
export default {
	path: '/home/tdzx',
	name: 'tdzx',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '土地资讯'
	},
	redirect: '/home/tdzx/ggxx',
	children: [
		{
			path: '/home/tdzx/ggxx',
			name: 'ggxx',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '公告信息',
				icon: 'document'
			}
		},
		{
			path: '/home/tdzx/cjgs',
			name: 'cjgs',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '成交公示',
				icon: 'document'
			}
		},
		{
			path: '/home/tdzx/xwdt',
			name: 'xwdt',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '新闻动态',
				icon: 'document'
			}
		},
		{
			path: '/home/tdzx/zsyz',
			name: 'zsyz',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '招商引资',
				icon: 'document'
			}
		},
		{
			path: '/home/tdzx/ndcb',
			name: 'ndcb',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '农地储备',
				icon: 'document'
			}
		},
		{
			path: '/home/tdzx/jtjsyd',
			name: 'jtjsyd',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '集体建设用地',
				icon: 'document'
			}
		},
		{
			path: '/home/tdzx/cbjyq',
			name: 'cbjyq',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '承包经营权',
				icon: 'document'
			}
		}
	]
};
