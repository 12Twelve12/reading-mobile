<template>
	<view>
		<view v-if="user.status==0">
			<view class="user-card">
				<view class="cu-avatar xl round user-img"  :style="'background-image:url('+user.img+');'"></view>
				<text></text>
			</view>
			<view class="user-card" style="padding-bottom: 20px;">
				<text>{{user.username}}</text>
			</view>
		</view>
		<view v-if="user.status==1">
			<view class="user-card">
				<view class="cu-avatar xl round user-img"  style="background-image:url(../../static/logo.png);"></view>
				<text></text>
			</view>
			<view class="user-card" style="padding-bottom: 20px;" @click="toLogin">
				<text>立即登陆</text>
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
		methods:{
			toLogin(){
				console.log("登陆");
				uni.navigateTo({
				    url: '../../pages/login/login'
				})
			}
		}

	}
</script>

<style scoped>
	.user-card {
		display: flex;
		align-items: center;/*子元素垂直居中*/
		justify-content: center;/*子元素水平居中*/
		background-color: #ebfcee;
		padding-top: 20px;
	}
</style>
