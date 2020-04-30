import tdzr from '@/views/jydt/tdzr'
import tdzrdetail from '@/views/jydt/tdzrdetail'
import tdcz from '@/views/jydt/tdcz'
import tddy from '@/views/jydt/tddy'


/**
 * 交易大厅路由配置
 */
export default {
	path: '/home/jydt',
	name: 'jydt',
	component: {
		render: (h) => h('router-view') // 空路由组件
	},
	meta: {
		label: '交易大厅'
	},
	redirect: '/home/jydt/tdjy',
	children: [
		{
			path: '/home/jydt/tdjy',
			name: 'tdjy',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '土地交易',
				icon: 'document'
			},
			redirect: '/home/jydt/tdjy/tdzr',
			children: [
				{
					path: '/home/jydt/tdjy/tdzr',
					name: 'tdzr',
					component: tdzr,
					meta: {
						label: '土地转让',
						icon: 'document'
					},
					children: [
						{
							path: '/home/jydt/tdjy/tdzr/tdzrdetail',
							name: 'tdzrdetail',
							component: tdzrdetail,
							meta: {
								label: '土地转让详情',
								icon: 'document'
							},
						}
					]
				},
				// {
				// 	path: '/home/jydt/tdjy/tdzr/tdzrdetail',
				// 	name: 'tdzrdetail',
				// 	component: tdzrdetail,
				// 	meta: {
				// 		label: '土地转让详情',
				// 		icon: 'document'
				// 	},
				// 	hidden: true
				// },
				{
					path: '/home/jydt/tdjy/tdcz',
					name: 'tdcz',
					component: tdcz,
					meta: {
						label: '土地出租',
						icon: 'document'
					}
				},
				{
					path: '/home/jydt/tdjy/tddy',
					name: 'tddy',
					component: tddy,
					meta: {
						label: '土地抵押',
						icon: 'document'
					}
				}
			]
		},
		{
			path: '/home/jydt/fwjy',
			name: 'fwjy',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '房屋交易',
				icon: 'document'
			},
			redirect: '/home/jydt/fwjy/esf',
			children: [
				{
					path: '/home/jydt/fwjy/esf',
					name: 'esf',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '二手房',
						icon: 'document'
					}
				},
				{
					path: '/home/jydt/fwjy/fwzl',
					name: 'fwzl',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '房屋租赁',
						icon: 'document'
					}
				},
				{
					path: '/home/jydt/fwjy/fwdy',
					name: 'fwdy',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '房屋抵押',
						icon: 'document'
					}
				}
			]
		},
		{
			path: '/home/jydt/xqgg',
			name: 'xqgg',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '需求公告',
				icon: 'document'
			},
			redirect: '/home/jydt/xqgg/tdxq',
			children: [
				{
					path: '/home/jydt/xqgg/tdxq',
					name: 'tdxq',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '土地需求',
						icon: 'document'
					}
				},
				{
					path: '/home/jydt/xqgg/fwxq',
					name: 'fwxq',
					component: {
						render: (h) => h('router-view') // 空路由组件
					},
					meta: {
						label: '房屋需求',
						icon: 'document'
					}
				}
			]
		},
		{
			path: '/home/jydt/nydxx',
			name: 'nydxx',
			component: {
				render: (h) => h('router-view') // 空路由组件
			},
			meta: {
				label: '农用地信息',
				icon: 'document'
			}
		}
	]
};
