<template>
    <login-template>
        <template #title>Register in</template>
        <template #content>
            <el-form :model="loginForm" status-icon :rules="rules" size="large" ref="loginForm"
                     class="login-el-form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入您的用户名">
                        <div slot="prefix" class="inner-img">
                            <el-image :src="require('@/assets/images/username.png')"
                                      style="width: 18px; height: 20px"/>
                        </div>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" v-model="loginForm.pwd" autocomplete="off" placeholder="请输入您的密码">
                        <div slot="prefix" class="inner-img">
                            <el-image :src="require('@/assets/images/pwd.png')" style="width: 18px; height: 20px"/>
                        </div>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" v-model="loginForm.pwd" autocomplete="off" placeholder="请输入您的密码">
                        <div slot="prefix" class="inner-img">
                            <el-image :src="require('@/assets/images/pwd.png')" style="width: 18px; height: 20px"/>
                        </div>
                    </el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="loginForm.phone" autocomplete="off" placeholder="请输入您的密码">
                        <div slot="prefix" class="inner-img">
                            <el-image :src="require('@/assets/images/pwd.png')" style="width: 18px; height: 20px"/>
                        </div>
                    </el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-input class="yzm" v-model.number="loginForm.verificationCode" placeholder="请输入验证码">
                        <div slot="prefix" class="inner-img">
                            <el-image :src="require('@/assets/images/yzm.png')" style="width: 18px; height: 20px"/>
                        </div>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="login('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </template>
    </login-template>
</template>

<script>
	// import {login} from '@/api/login';

	export default {
		// mounted () {
		// 	login('test', 'test');
		// }
		data () {
			let checkVerificationCode = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('验证码不能为空'));
				} else {
					callback();
				}
			};
			let validatePwd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入您的密码'));
				} else {
					callback();
				}
			};
			let validateUsername = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入您的用户名'));
				} else {
					callback();
				}
			};
			return {
				loginForm: {
					username: '',
					pwd: '',
					verificationCode: '',
					phone: ''
				},
				rules: {
					username: [
						{validator: validateUsername, trigger: 'blur'}
					],
					pwd: [
						{validator: validatePwd, trigger: 'blur'}
					],
					verificationCode: [
						{validator: checkVerificationCode, trigger: 'blur'}
					]
				}
			};
		},
		methods: {
			login (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
    .login-el-form {
        width: 400px;
        margin: 0 auto;
        margin-top: 25px;
        .el-input {
            /deep/ .el-input__inner {
                background-color: #ececec;
                padding-left: 60px;
            }
            .inner-img {
                width: 50px;
                /deep/ .el-image {
                    margin-top: 10px;
                }
            }
        }
        .login-btn {
            width: 100%;
            background-color: #A33636;
            border-color: #A33636;
        }
    }
</style>
