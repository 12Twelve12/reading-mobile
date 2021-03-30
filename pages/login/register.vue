
<template>
	<view class="content">

<view class="login-bg">
			<view class="login-card">
				<view class="login-head">
					<view class="cu-avatar xl round user-img " style="background-image:url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F19%2F20181219191612_izBii.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616132880&t=8b3db88ff0fc4b00f2698d1e03106ba7);"></view>
				</view>
				<view class="login-input login-margin-b">
					<text class="text-red" v-if="verify_nickname==1">*输入不合法</text>
					<input type="text" placeholder="昵称" v-model="form.nickname" @input="verify_nickname=0"/>
				</view>

				<view class="login-input login-margin-b">
					<text class="text-red" v-if="verify_mail==1">*请输入正确邮箱</text>
					<input type="text" placeholder="邮箱" v-model="form.mail" @input="verify_mail=0"/>
				</view>
				<view class="login-input login-margin-b">
					<text class="text-red" v-if="verify_password_length==1">*密码长度不能少于6位</text>
					<input type="password" placeholder="请输入密码" v-model="form.password" @input="verify_password_length=0" />
				</view>

				<view class="login-input login-margin-b">
					<text class="text-red" v-if="verify_password==1">*两次密码不一致</text>
					<input type="password" placeholder="确认密码" v-model="form.password2" @input="verify_password=0" />
				</view>
				<view class="login-input login-margin-b">
					<input placeholder="请输入验证码" type="number" name="input" placeholder-class="plaClass" style="width: 72%;" v-model="form.code"></input>
					<text class="text-green code"  @tap="getCheckNum()">{{!codeTime?'获取验证码':codeTime+'s'}}</text>
				</view>

			</view>
		</view>
		<view class="login-btn">
			<button class="landing" type="primary" @click="register()">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeTime: 0,
				index: -1,
				verify_password: 0,
				verify_nickname:0,
				verify_mail:0,
				verify_password_length: 0,
				form: {
					img:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F19%2F20181219191612_izBii.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616132880&t=8b3db88ff0fc4b00f2698d1e03106ba7',
					nickname: "",
					mail: "",
					password: "",
					password2: "",
					code: "", //验证码
				},
				
			}
		},
		onLoad() {
			
		},
		methods: {
		
			go_login() {
				console.log("跳到登陆页面");
				uni.navigateTo({
					url: '../../pages/login/login?before=register'
				})
			},
			getCheckNum() {
				if (this.codeTime > 0) {
					uni.showToast({
						title: '不能重复获取',
						icon: "none"
					});
					return;
				} else {
					this.codeTime = 60
					let timer = setInterval(() => {
						this.codeTime--;
						if (this.codeTime < 1) {
							clearInterval(timer);
							this.codeTime = 0
						}
					}, 1000)
				}

			},
		

			register() {
			
				/* 表单验证 */
				let flag=true;//标记表单合法性
				
				if(this.form.nickname==null||this.form.nickname==""){
					flag=false;
					this.verify_nickname = 1
				}
				if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.form.mail))){ 
				   flag=false;
				   this.verify_mail = 1
				}
				if(this.form.password.length<6){
					flag=false;
					this.verify_password_length = 1
				}
				if(this.form.password!=this.form.password2){
					flag=false;
					this.verify_password = 1
				}
				/* 表单验证 */	
				
				
				if (flag) {
					//注册
					let websiteUrl = getApp().globalData.base_ip + 'users/insert';
					uni.request({
						url: websiteUrl,
						method: 'POST',
						header: {
							// 'Content-Type': 'application/json'
							'Content-Type':'application/x-www-form-urlencoded'
							// token : uni.getStorageSync("TOKEN")
						},
						dataType: 'json',
						data: {
							"img":'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F19%2F20181219191612_izBii.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616132880&t=8b3db88ff0fc4b00f2698d1e03106ba7',
							"nickname": this.form.nickname,
							"mail": this.form.mail,
							"password": this.form.password,
							"time":this.$moment().format('YYYY-MM-DD HH:mm:ss')
						},
						success: res => {
							// console.log(res.data)
							if (res.data.code==0) {
								this.go_login()
							}
							if(res.data.code==2||res.data.code==3){
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
							if(res.data.code==5){
								uni.showToast({
									title:'昵称和邮箱都被注册',
									icon:'none'
								})
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
		margin-top: 754rpx;
	}

	.login-function {
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
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

	.code {
		position: absolute;
		left: 72%;
		top: 89%;

	}

	.lineRight {

		border: 1px solid whitesmoke;
		padding: inherit;
		padding-right: 20px;
		line-height: 26px;
		border-radius: 5px;
		background: whitesmoke;
		position: relative;
		left: -4%;

	}

	.lineLeft {
		display: flex;
		width: 20%;
		align-items: center;
		height: 100%;
		font-weight: bold;
		color: #4a4848ba;
	}

	.line {
		margin-top: 30rpx;
		height: 100rpx;
		width: 92%;
		margin: 0 auto;
		border-bottom: 1px solid #f5f5f5;
		display: flex;

	}

</style>
