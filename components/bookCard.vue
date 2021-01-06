<template>
	<view class="padding-sm radius text-sm bookcard">
		<image :src="list.img" style="width: 90upx;height: 135upx;"></image>
		{{list.name}}
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {

			};
		}
	}
</script>

<style>
	.bookcard {
		display: flex;
		flex-direction: column !important;
		text-align: center;
	}
</style>
