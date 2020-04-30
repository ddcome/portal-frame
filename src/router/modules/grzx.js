/**
 * 首页路由配置
 */
export default {
	path: '/home/grzx',
	name: 'grzx',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '个人中心'
	}
};
