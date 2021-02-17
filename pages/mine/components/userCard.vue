<template>
	<!-- 我的昵称账号名片模块 -->
	<view class="content-bg">
		<!-- 背景图 -->
		<view class="content-img" :style="'background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F26%2F20180226204208_8tQYi.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616124053&t=c81e36295f99970edba13996524e6f6d) no-repeat center 64%; '">
			<view class="card">
				<!-- 设置 -->
				<text class="cuIcon-settingsfill text-green" v-if="user" @click="setting" style="font-size: x-large;position: absolute;top: 20rpx;right: 24rpx;"></text>
				<!-- 如果有用户就显示信息 -->
				<view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" style="background-color: rgba(255,255,255,0);">
							<view v-if="user" @click="ViewImage" class="cu-avatar xl" :style="'background-image:url('+user.img+');'"></view>
							<view v-else class="cu-avatar xl " @click="go_login()" style="background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F19%2F20181219191612_izBii.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616132880&t=8b3db88ff0fc4b00f2698d1e03106ba7);"></view>
							<view class="content  content-id" @click="go_login()">
								<view class="text-black text-bold" style="font-size: 17px;">{{user.nickname?user.nickname:'立即登陆'}}</view>
								<view class="text-gray text-sm" style="width: 400upx;">{{user.mail?'账号：'+user.mail:'欢迎登陆'}}</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>


</template>

<script>
	export default {
		props: ['user'],
		data() {
			return {

			};
		},
		components: {

		},

		methods: {
			/**
			 * 跳到登陆页面
			 */
			go_login() {
				console.log(this.user);
				if (!this.user) {
					uni.navigateTo({
						url: '../../pages/login/login'
					})

				}

			},
			setting() {
				uni.navigateTo({
					url: '../../pages/mine/setting'
				})
			},
			/**图片显示
			 * @param {Object} e
			 */
			ViewImage(e) {
				if (this.user) {
					let url = this.user.img;
					let urls = [];
					urls.push(url);
					uni.previewImage({
						urls: urls,
						current: e.currentTarget.dataset.url
					});
				}

			},




		}

	}
</script>

<style scoped>
	.user-card {
		display: flex;
		align-items: center;
		/*子元素垂直居中*/
		justify-content: center;
		/*子元素水平居中*/
		background-color: #ffffff;
		padding-top: 20px;
		border-radius: 11px;
	}

	.card {
		width: 91%;
		height: 256upx;
		background-color: #ffffff;
		top: 179upx;
		position: relative;
		border-radius: 11px;
		box-shadow: 2px 2px 5px #9e9e9e70;
		background-color: rgba(255, 255, 255, 0.9);
	}

	.content-bg {
		width: 100%;
		height: 328upx;
		background-color: #ffffff;
	}

	.content-img {
		width: 100%;
		height: 381upx;
		/* background-color: #00ff00; */
		display: flex;
		justify-content: center;
		/*子元素水平居中*/
		/* background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F51%2F70%2F5c110d336b9fa.jpg%21%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613721778&t=9eab90e6fd216ac8a3c09cf9c030a886') no-repeat 0% 50%; */
		/* background: url(helper.websiteUrl + '/api/1.0/user/background') no-repeat center center; */


	}

	.cu-list {
		border-radius: 21px;
		width: 100%;
		padding: 27px;
	}

	.content-id {}

	.cu-list.menu-avatar>.cu-item .content {

		left: 200rpx;
	}

	.cu-list.menu-avatar>.cu-item>.cu-avatar {
		border-radius: 8px;

	}

	.bg-green {}

	/* .cu-item{
		background-color: rgba(255,255,255,0);
	} */
</style>
