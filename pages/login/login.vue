<template>
	<view class="content">
		<view class="login-bg">
			<view class="login-card">
				<view class="login-head">请输入你的账户</view>
				<form>
					<view class="login-input login-margin-b">
						<text class="text-red" v-if="verify_nickname==1">*用户名不能为空</text>
						<input type="text" placeholder="用户名" v-model="form.nickname" @input="verify_nickname=0" />
					</view>
					<view class="login-input login-margin-b">
						<text class="text-red" v-if="verify_password==1">*密码长度不能少于6位</text>
						<input type="password" placeholder="请输入密码" v-model="form.password" @input="verify_password=0" />
					</view>
					<view class="login-function">
						<view class="login-forget" @click="go_forget">忘记密码</view>
						<view class="login-register" @click="go_register">快速注册></view>
					</view>
				</form>

			</view>
		</view>
		<view class="login-btn">
			<button class="landing" type="primary" @click="login()">登陆</button>
			<!-- <button  class="cu-btn round bg-green landing">立即登陆</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					nickname: "",
					password: ""
				},
				verify_nickname: 0,
				verify_password: 0,
				before_page: '' //判断从哪里跳到登陆页面的。好在登陆后看要跳转到哪
			}
		},
		onLoad(value) {
			console.log("跳到登陆页面")
			console.log(value.before)
			this.before_page = value.before
		},
		methods: {
			to(href) {
				uni.navigateTo({
					url: href
				})
			},
			go_forget() {
				uni.navigateTo({
					url: '../../pages/forget/forget'
				})
			},
			go_register() {
				uni.navigateTo({
					url: '../../pages/login/register'
				})
			},
			login() {

				/* 表单验证 */
				let flag = true; //标记表单合法性
				if (this.form.nickname.length == 0 || this.form.nickname == "") {
					flag = false;
					this.verify_nickname = 1
				}


				if (this.form.password.length < 6 || this.form.password == "") {
					flag = false;
					this.verify_password = 1
				}
				/* 表单验证 */


				if (flag) {
					//登陆
					let websiteUrl = getApp().globalData.base_ip + 'users/queryByNickname';
					console.log(this.form);
					uni.request({
						url: websiteUrl,
						method: 'GET',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
							// 'Content-Type': 'application/json',
							// token : uni.getStorageSync("TOKEN")
						},
						dataType: 'json',
						data: this.form,

						success: res => {
							console.log("登陆成功");
							console.log(res.data);
							if (res.data.code == 0) {
								console.log(res.data.data)
								uni.setStorageSync('user', res.data.data); //缓存数据
								if (this.before_page == 'register') {
									uni.switchTab({
										url:'../mine/mine'
									})
								} else {
									uni.navigateBack({

									})
								}

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}


						},
						fail: () => {},
						complete: () => {}
					});
				}



			}

		}
	}
</script>

<style>
	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: #75D97F !important;
	}

	.login-btn {
		padding: 10upx 20upx;
		margin-top: 420upx;
	}

	.login-function {
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	}

	.login-forget {
		float: left;
		font-size: 26upx;
		color: #999;
	}

	.login-register {
		color: #666;
		float: right;
		font-size: 26upx;

	}

	.login-input input {
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 62upx;
		line-height: 62upx;
		border-radius: 8upx;
	}

	.login-margin-b {
		margin-bottom: 25upx;
	}

	.login-input {
		padding: 10upx 20upx;
	}

	.login-head {
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}

	.login-card {
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 120upx;
	}

	.login-bg {
		height: 260upx;
		padding: 25upx;
		background: #75D97F;
	}
</style>
