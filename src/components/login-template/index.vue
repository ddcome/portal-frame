<template>
    <div class="login-template">
        <div class="half-bg"></div>
        <div class="half-bg second"></div>
        <Header type="LOGIN"/>
        <div class="copy-right">
            <div class="copy-right-inner">
                Copyright © 2017-2020 清徐不动产交易网 - Powered By GreatMap
            </div>
        </div>
        <div class="login-form">
            <div class="title-1">
                <slot name="title"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
	import Header from '@/layout/Header';

	export default {
		components: {Header}
	};
</script>

<style lang="scss" scoped>
    .login-template {
        height: 100%;
        .half-bg {
            position: absolute;
            width: 100%;
            height: 50%;
            left: 0;
            right: 0;
            top: 0;
            z-index: -1;
            background: url('~@/assets/images/崀山-dee17.png') no-repeat;
            background-size: cover;
        }
        .half-bg.second {
            top: auto;
            bottom: 0;
            height: 31%;
            background: url('~@/assets/images/ditu-41155.png') no-repeat;
            background-size: cover;
        }
        .login-form {
            width: 624px;
            height: 426px;
            background-color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -312px;
            margin-top: -213px;
            border-radius: 5px;
            box-shadow: 0 0 10px 0 #ccc;

            .title-1 {
                height: 77px;
                line-height: 77px;
                border-bottom: 1px solid #ccc;
                color: #A33636;
                font-weight: bolder;
                font-size: 20px;
                text-align: center;
            }
            .content {
            }
        }
        .copy-right {
            width: 100%;
            height: 40px;
            position: absolute;
            bottom: 0px;
            z-index: 9;
            background: rgba(0, 0, 0, .2);
            .copy-right-inner {
                line-height: 40px;
                height: 40px;
                font-size: 15px;
                color: #fff;
                width: 1200px;
                margin: 0 auto;
                text-align: center;
            }
        }
    }
</style>
