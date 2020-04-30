/**
 * 首页路由配置
 */
export default {
	path: '/home/fwdt',
	name: 'fwdt',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '服务大厅'
	},
	redirect: '/home/fwdt/tdjy',
	children: [
		{
			path: '/home/fwdt/fbmjtj',
			name: 'fbmjtj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '市场介绍',
				icon: 'document'
			}
		},
		{
			path: '/home/fwdt/fbsltj',
			name: 'fbsltj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '政策法规',
				icon: 'document'
			}
		},
		{
			path: '/home/fwdt/cjmjtj',
			name: 'cjmjtj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '服务指南',
				icon: 'document'
			}
		},
		{
			path: '/home/fwdt/cjsltj',
			name: 'cjsltj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '资料下载',
				icon: 'document'
			}
		},
		{
			path: '/home/fwdt/jgzstj',
			name: 'jgzstj',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '互动交流',
				icon: 'document'
			},
			redirect: '/home/fwdt/jgzstj/hdjl',
			children: [
				{
					path: '/home/fwdt/jgzstj/hdjl',
					name: 'hdjl',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '互动交流',
						icon: 'document'
					}
				},
				{
					path: '/home/fwdt/jgzstj/lyck',
					name: 'lyck',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '留言查看',
						icon: 'document'
					}
				}
			]
		}
	]
};
