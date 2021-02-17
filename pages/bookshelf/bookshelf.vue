<template>
	<view id="main_content" :style="'height: '+windowHeights+'px; background-color: #FFFFFF;'">
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
		<GridList :BookLists="BookLists" v-if="user&&BookLists.length>0"></GridList>
		<view  v-if="!user" class="text-gray text-center padding">还没登陆哦~</view>
		<view v-if="user&&BookLists.length==0" class="text-gray text-center padding">空空如也~</view>
	</view>
</template>

<script>
	import GridList from '../find/components/gridList.vue'
	export default {
		data() {
			return {
				//书列表数据
				BookLists: [],
				user: {},
				windowHeights:0
			}
		},
		onShow() {
			let user = uni.getStorageSync('user');
			if (user != null) {
				this.user = user
			}
			this.getData()
		},
		onLoad() {
			let _this = this
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.windowHeight);
			     _this.windowHeights=res.windowHeight
			    }
			});
		},

		methods: {
			getData() {
				if (this.user) {
					this.BookLists=[]
					let websiteUrl = getApp().globalData.base_ip + 'users/queryBookShelf';
					console.log(this.user)
					uni.request({
						url: websiteUrl,
						method: 'GET',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
							// 'Content-Type': 'application/json',
							// token : uni.getStorageSync("TOKEN")
						},
						dataType: 'json',
						data: {
							"id": this.user.id
						},
						success: res => {
							if (res.data.code == 0) {
								this.BookLists = res.data.data
								//添加图标
								this.BookLists.push({
									id:'find',
									img: '../../static/add.png',
									title: ''
								})
							}
							console.log(this.BookLists)


						},
						fail: () => {},
						complete: () => {}
					});
				}

			}
		},
		components: {
			GridList
		}
	}
</script>

<style scoped>
	.top_back {
		width: 100%;
		height: 330upx;
		background-size: 100% 230upx;
		background: #517E69;
		/* background-image: url(../../static/top_back.jpg); */
		background-repeat: no-repeat;
		/* padding: 55px; */
	}

	.time_card {
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

	.flex-sub {
		top: 30px;
		position: relative;
	}
	
</style>
