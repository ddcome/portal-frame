<template>
    <div class="navbar">
        <div class="inner">
            <div class="header-logo">
                <el-image :src="require('@/assets/images/logo.png')" style="width: 70px; height: 70px"/>
                <el-image :src="require('@/assets/images/logo-title.png')" style="width: 165px; height: 20px"/>
            </div>
            <el-menu
                    class="menu"
                    mode="horizontal"
                    ref="elMenu"
                    :router="true"
                    :default-active="activePath"
                    active-text-color="#a23634"
            >
                <template class="menu-wrap" v-for="menu in menus">
                    <el-submenu
                            v-if="menu.children && menu.children.length>0"
                            :index="menu.path"
                            :key="menu.path">
                        <span slot="title">{{ menu.meta.label }}</span>
                        <template v-for="subMenu in menu.children">
                            <el-submenu v-if="subMenu.children && subMenu.children.length>0"
                                        :index="subMenu.path"
                                        :key="subMenu.path">
                                <span slot="title">{{ subMenu.meta.label }}</span>
                                <template v-for="last in subMenu.children">
                                    <el-menu-item :key="last.path" :index="last.path">
                                        <span slot="title">{{ last.meta.label }}</span>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item v-else :key="subMenu.path" :index="subMenu.path">
                                <span slot="title">{{ subMenu.meta.label }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>

                    <el-menu-item v-else :index="menu.path" :key="menu.path">
                        <span slot="title">{{ menu.meta.label }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
	import {subRoutes} from '@/router';

	export default {
		data () {
			return {
				isCollapse: false,
				showBar: false
				// menus // 依赖路由配置
			};
		},
		mounted () {
			let _this = this;
			setTimeout(function () {
				_this.showBar = true;
			}, 600);
		},
		computed: {
			menus () {
				/**
                 * this is condition of menu
				 * @param c
				 * @returns {boolean}
				 */
				let hasMenu = (c) => {
					if (c.hasOwnProperty('meta') && c.meta.hasOwnProperty('menu')) {
						return true;
					} else {
						return false;
					}
				};
				/**
                 * this is condition of children
				 * @param c
				 * @returns {boolean}
				 */
				let hasChildren = (c) => {
					if (c.hasOwnProperty('children') && c.children.length > 0) {
						return true;
					} else {
						return false;
					}
				};
				/**
                 * rebuild data
				 * @param data
				 * @returns {*|Array}
				 */
				let rebuildData = (data) => {
					let res = [];
					if (Array.isArray(data)) {
						res = [];
						data.forEach((c) => {
							if (hasChildren(c)) {
								c.children = rebuildData(c.children);
							}
							if (!hasMenu(c) || (hasMenu(c) && c.meta.menu)) {
								res.push(c);
							}
						});
					} else {
						res = {};
						if (hasChildren(data)) {
							data.children = rebuildData(data.children);
						}
						if (!hasMenu(data) || (hasMenu(data) && data.meta.menu)) {
							res = data;
						}
					}
					return res;
				};
				try {
					let copy = JSON.parse(JSON.stringify(subRoutes));
                    return rebuildData(copy);
				}catch (e) {
					console.info('[路由可能不是一个标准的JSON格式]', e);
					return rebuildData(subRoutes);
                }
			},
			activePath () {
				return this.$route.meta.activePath || this.$route.path;
			}
		},
		methods: {
			toggleCollapse () {
				this.isCollapse = !this.isCollapse;
			},
			getIconClass (iconName) {
				return `el-icon-${iconName}`;
			}
		}
	};
</script>

<style lang="scss" scoped>


    .navbar {
        width: 100%;
        height: 80px;
        position: relative;
        border-top: 1px solid #eee;
        box-shadow: 0px 5px 10px #ccc;
        .inner {
            height: 100%;
            width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            &::before {
                content: '';
                width: 50%;
                min-width: 600px;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: #a23634;
            }
            &::after {
                content: '';
                min-width: 600px;
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                background: #fff;
            }
            .header-logo {
                background-color: unset;
                height: 100%;
                width: 310px;
                display: inline-block;
                position: relative;
                vertical-align: top;
                &::after {
                    position: absolute;
                    content: '';
                    top: 0;
                    right: 0;
                    height: 0px;
                    width: 0px;
                    border-color: transparent #fff;
                    border-width: 0 60px 80px 0;
                    border-style: solid;
                }
                .el-image {
                    vertical-align: top;
                    position: relative;
                    top: 50%;
                    &:first-child {
                        margin-top: -35px;
                    }
                    &:last-child {
                        margin-left: 10px;
                        margin-top: -10px;
                    }
                }
            }
            .menu {
                width: 890px;
                overflow-x: auto;
                display: inline-block;
                background-color: #fff;
                height: 100%;
                border-bottom: 0px;
                position: relative;
                z-index: 9;
                li {
                    text-align: center;
                    height: 100%;
                    line-height: 80px;
                    min-width: 110px;

                    &.el-menu-item {
                        border: 0px;
                        border-bottom-color: #fff !important;
                    }

                    &.el-submenu {
                        /deep/ .el-submenu__title {
                            height: 100%;
                            line-height: 80px;
                        }
                    }
                }
            }
        }
    }

    /deep/ .menu .el-submenu .el-submenu__title span,
    /deep/ .menu .el-menu-item span {
        font: 15px/80px '\5FAE\8F6F\96C5\9ED1';
        color: #000;
        -webkit-transition: background .2s, color .2s;
        transition: background .2s, color .2s;
        font-weight: bold;
    }

    /deep/ .menu .el-menu-item.is-active {
        border-bottom: 0px !important;
        border-bottom-color: unset !important;
        background-color: unset !important;
        span {
            padding: 7px 0;
            border-bottom: 2px solid #a23634;
            color: #a23634;
        }
    }

    /deep/ .menu .el-submenu.is-opened {
        /deep/ .menu .el-submenu .el-submenu__title {
            background-color: unset !important;
            &:hover {
                background-color: unset !important;
            }
        }
        span {
            padding: 7px 0;
            border-bottom: 2px solid #a23634;
            color: #a23634;
        }
    }

    /deep/ .menu .el-submenu.is-active {

        div.el-submenu__title {
            border-bottom: 0px !important;
            border-bottom-color: unset !important;
            background-color: unset !important;
            span {
                padding: 7px 0;
                border-bottom: 2px solid #a23634;
                color: #a23634;
            }
        }
    }

    /*/deep/ .el-submenu__icon-arrow {*/
    /*display: none;*/
    /*}*/

    /deep/ .menu .el-submenu .el-submenu__title {
        border-bottom: 0px !important;
        border-bottom-color: unset !important;
    }
</style>
