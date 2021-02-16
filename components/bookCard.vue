<template>
	<view>
		<view class="padding-sm radius text-sm bookcard" v-for="(list,index) in lists" :key="index">
			<image :src="list.img" style="width: 90upx;height: 135upx;"></image>
			{{list.name}}
		</view>
	</view>
	
</template>

<script>
	export default {
		props: ['lists'],
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
