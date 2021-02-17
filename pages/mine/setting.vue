<template>
	<!-- 退出登陆 -->
	<view style="padding-top: 200upx;">
		<button @click="out">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			out() {

				uni.clearStorage();
				uni.navigateBack({
					
				})


			}
		}
	}
</script>

<style>

</style>
