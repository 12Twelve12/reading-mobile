<template>
	<!-- 修改信息 -->
	<view class="bg-white" style="padding-top: 100upx;">
		<view class='line'>
			<view class='lineLeft'>{{update_title1}}</view>
			<view class="lineRight">
				<!-- data-name为自定义参数名称,同时也会以此为参数名存入data的form中-->
				<input placeholder="请输入" v-model="update_value" name="input" placeholder-class="plaClass"
					style="width: 100%;"></input>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="update()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				update_value: '',
				before_value: '',
				update_title1: '',
				update_object:'',
				user:{},

			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数

			uni.setNavigationBarTitle({
				title: option.update_title
			})
			this.update_value = option.update_value;
			if (option.update_value == "null") {
				this.update_value = '';
			}
			this.before_value = option.update_value;
			this.update_title1 = option.update_title1;
			this.update_object=option.update_object
			this.user=uni.getStorageSync('user')

		},
		methods: {

			/* 跳转除了工具栏页面 */
			to(href) {
				uni.navigateTo({
					url: href
				})
			},
			update() {

				let flag = true;

				if (this.update_value == null || this.update_value == "") {
					flag = false;
					uni.showToast({
						title: "不能为空"
					})
				}
				if (this.update_value == this.before_value) {
					flag = false;
					uni.showToast({
						title: "信息无变动"
					})
				}
				
				if(flag){
					if(this.update_object=='phone'){
						this.user.phone=this.update_value
					}else if(this.update_object=='mail'){
						this.user.mail=this.update_value
					}
					let websiteUrl = getApp().globalData.base_ip + 'users/update';
					uni.request({
						url: websiteUrl,
						method: 'PUT',
						header: {
							// 'Content-Type': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
					
							// token : uni.getStorageSync("TOKEN")
						},
						dataType: 'json',
						data: this.user,
						success: res => {
							console.log(res.data)
							if (res.data.code == 0) {
								uni.navigateBack({
									
								})
								uni.setStorageSync('user', this.user)
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}

				

			},

		}
	}
</script>

<style scoped>
	.line {
		margin-top: 30rpx;
		height: 100rpx;
		width: 92%;
		margin: 0 auto;
		border-bottom: 1px solid #f5f5f5;
		display: flex;

	}

	.lineRight {

		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.lineLeft {
		display: flex;
		width: 20%;
		align-items: center;
		height: 100%;
		font-weight: bold;
		color: #4a4848ba;
	}

	.location {
		width: 100%;
	}

	.address_address {
		height: 42px;
		flex: 1;
		display: flex;
		align-items: center;
		position: relative;
		padding-left: 23px;
	}

	.picker {
		height: 100%;
		justify-content: flex-start;
		display: flex;
		align-content: center;
		width: 500rpx;
	}

	picker {
		height: 84rpx;
		line-height: 100rpx;
		width: 200px;
		text-align: right;

	}
</style>
