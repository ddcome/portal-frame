/**
 * 首页路由配置
 */
export default {
	path: '/home/zjfw',
	name: 'zjfw',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '中介服务'
	}
};
