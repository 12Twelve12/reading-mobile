<template>
	<view>
		<view class="top_back">
			<view class="padding-sm flex">
				<view class="flex-sub text-xxl text-white">书架</view>
				<view class="flex-sub" style="text-align: right;">
					<text class="cuIcon-search text-white padding-sm xl"></text>
					<text class="cuIcon-pick text-white padding-sm"></text>
					<text class="cuIcon-time text-white padding-sm"></text>
				</view>
				<!-- <text class="text-xl">书架</text>
				<view class="">
					<text class="cuIcon-search text-grey"></text>
					<text class="cuIcon-pick text-grey"></text>
					<text class="cuIcon-time text-grey"></text>
				</view> -->
			</view>
			<!-- <view class="cu-card dynamic"> -->
				<view class="cu-item padding-sm time_card">
					今日阅读 100分100秒
				</view>
				<!-- <image src="../../static/logo.png"></image> -->
			<!-- </view> -->
		</view>
		<GridList :BookLists="BookLists"></GridList>
	</view>
</template>

<script>
	import GridList from '../find/components/gridList.vue'
	export default {
		data() {
			return {
				//书列表数据
				BookLists: [{
					img: "http://www.haoshuya.com/templets/cover/wgwx.jpg",
					title: '书名1',
					href: '../../pages/generator/generator'
				}, {
					img: '../../static/logo.png',
					title: '书名1',
					href: '../../pages/powerpurchase/powerpurchase'
				}, {
					img: '../static/logo.png',
					title: '书名1',
					href: '../../pages/buy/buy'
				}, {
					img: '../../../../static/logo.png',
					title: '书名1',
					href: '../../pages/market/policies/policies'
				}, {
					img: '../../../static/logo.png',
					title: '书名1',
					href: '../../pages/market/information/information'
				}, {
					img: '../../../static/logo.png',
					title: '书名1',
					href: '../../pages/market/trading/trading'
				},
				{
					img: '../../static/add.png',
					title: '',
					href: ''
				}
				]
			}
		},
		methods: {
			
		},
		components:{
			GridList
		}
	}
</script>

<style scoped>
	.top_back{
		width: 100%;
		height: 330upx;
		background-size: 100% 230upx;
		background: #517E69;
		/* background-image: url(../../static/top_back.jpg); */
		 background-repeat: no-repeat;
		 /* padding: 55px; */
	}
	.time_card{
		    position: relative;
		    top: 37px;
		    left: -8px;
		    background-color: white;
		    width: 177px;
		    border-radius: 9px;
		    padding-left: 20px;
	}
	[class*="cuIcon-"] {
	   
	    font-size: large;
	
	}
	 .flex-sub{
		top: 30px;
		position: relative;
	}
</style>
