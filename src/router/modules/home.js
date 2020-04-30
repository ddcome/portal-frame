/**
 * 首页路由配置
 */
export default {
	path: '/home/home',
	name: 'home-1',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '首页'
	},
	children: [
		{
			path: '/home/home/detail:id',
			name: 'home-detail',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '详情',
				icon: 'document',
				menu: false
			}
		}
	]
};
