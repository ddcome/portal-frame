<template>
    <header class="header-main">
        <div class="header-inner flex-center-align">
            <div class="link">
            <span class="inner">
                <router-link to="/">
                    <template v-if="type === 'HOME'">
                        <el-image :src="require('@/assets/images/home.png')"
                                  style="width: 24px; height: 22px;"/>
                        清徐不动产交易网，欢迎您！
                    </template>
                    <template v-else>
                        <el-image :src="require('@/assets/images/logo.png')" style="width: 40px; height: 40px;"/>
                        清徐不动产交易网
                    </template>
                </router-link>
                <span class="small-title" v-if="type==='LOGIN'">欢迎登录</span>
                <span class="small-title" v-if="type==='REGIST'">欢迎注册</span>
            </span>
            </div>
            <div class="header-right flex-center-align">
                <router-link to="/login">
                    <a class="link-a" :class="$route.name === 'login'?'active':''">登录{{type === 'HOME'?'':'平台'}}</a>
                </router-link>
                <span class="jg">{{type === 'HOME'?'':'/'}}</span>
                <router-link to="/regist">
                    <a class="link-a">注册{{type === 'HOME'?'':'平台'}}</a>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
	export default {
		props: {
			type: String,
			default: () => {
				return 'HOME'; // HOME,LOGIN,REGIST
			}
		}
	};
</script>

<style lang="scss" scoped>
    .header-main {
        height: 50px;
        background-color: #fff;
        box-shadow: 0px 5px 10px #ccc;
        .header-inner {
            height: 50px;
            width: 1200px;
            margin: 0 auto;
            background: #fff;
            justify-content: space-between;
            .link {
                font-size: 16px;
                .inner {
                    font-size: 16px;
                    font-weight: bold;
                    color: #666666;
                    position: relative;
                    padding-left: 30px;
                    .el-image {
                        vertical-align: middle;
                        position: relative;
                        left: 0;
                        top: 50%;
                        margin-top: -11px;
                        &:last-child {
                            top: 3px;
                        }
                    }
                    .small-title {
                        padding-left: 10px;
                        margin-left: 20px;
                        border-left: 2px solid #aaa;
                    }
                }
            }
            .header-right {
                .link-a {
                    color: #333;
                    font-size: 13px;
                    &.active {
                        color: #A33636;
                    }
                }
                .jg {
                    padding: 0 15px;
                }
            }
        }
    }
</style>
