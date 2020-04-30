/**
 * 路由配置
 */
import Vue from 'vue';
import Router from 'vue-router';
import treeEach from 'operation-tree-node/dist/treeEach.esm';

// 主容器组件
import Layout from '../layout';

// 登陆/注册
import Login from '@/views/login';
import Regist from '@/views/regist';
import ChangePassword from '@/views/change-password';

// 主区子路由
import fwdt from './modules/fwdt';
import home from './modules/home';
import jydt from './modules/jydt';
import sjtj from './modules/sjtj';
import tdzx from './modules/tdzx';
import zjfw from './modules/zjfw';
import grzx from './modules/grzx';

// 子模块的路由注册
export const subRoutes = [
	home,
	tdzx,
	sjtj,
	fwdt,
	jydt,
	zjfw,
	grzx
];

/**
 * 增加子模块的激活菜单元数据，
 * example: { meta: { activePath: parentPath } }
 * 这个数据会在 layout/Navbar.vue 中进行导航的激活状态判断
 */
treeEach(subRoutes, (item, index, arr, parent) => {
  parent && (item.meta.activePath = parent.meta.activePath || parent.path);
});

// 路由集合
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: subRoutes[0].path,
    // 子模块的路由注册
    children: subRoutes
  },
  {
    path: '**',
    redirect: '/home'
  }
];

Vue.use(Router);

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
});
