<template>
	<view>
		<view class="top_back">
			<view class="padding-sm flex">
				<view class="flex-sub text-xxl" style="color: #517E69;">书架</view>
				<view class="flex-sub" style="text-align: right;">
					<text class="cuIcon-search text-grey padding-sm"></text>
					<text class="cuIcon-pick text-grey padding-sm"></text>
					<text class="cuIcon-time text-grey padding-sm"></text>
				</view>
				<!-- <text class="text-xl">书架</text>
				<view class="">
					<text class="cuIcon-search text-grey"></text>
					<text class="cuIcon-pick text-grey"></text>
					<text class="cuIcon-time text-grey"></text>
				</view> -->
			</view>
			<view class="cu-card dynamic ">
				<view class="cu-item padding-sm time_card text-xs">
					今日阅读 100分100秒
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.top_back{
		width: 100%;
		height: 200upx;
		background-size: 100% 200upx;
		background-image: url(../../static/top_back.jpg);
		 background-repeat: no-repeat;
	}
	.time_card{
		position: absolute;
		top: 45px;
		left: -15px;
	}
</style>
