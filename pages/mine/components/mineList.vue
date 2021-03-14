<template>
	<!-- 我的列表页 -->
	<view class="cu-list menu" style="padding-top: 150upx;">
		<view class="cu-item arrow" @click="to(item.href)" :item="item" v-for="(item,index) in lists" :key="index">
			<view class="content">
				<text :class="item.icon" v-if="item.icon"></text>
				<image v-else :src="item.src" style="width: 30rpx;height: 30rpx;margin-right: 22rpx;margin-left: 10rpx;"></image>
				<text :class="item.href==''?'text_color text-lg':'text-black text-lg'">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['lists'],
		data() {
			return {
				
			};
		},
		components:{
			
		},
		methods:{
			to(href){
				this.$emit("to",href)
			}
		}
	
	}
</script>

<style>
</style>
