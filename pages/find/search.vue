<template>
	<view class="bg-white padding-top" style="height: -webkit-fill-available;">
		<!-- 搜索框 -->
		<view class="cu-form-group search">
			<input placeholder="搜索书籍 书名|作者" name="input" v-model="str" @input="input()"></input>
			<text class='cuIcon-search text-green'></text>
		</view>
		<!-- 搜索的图书列表 -->
		<view>
			<!-- 搜索出的图书列表 -->
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in Books" :key="index" @click="to(item)">
					<view class="cu-avatar lg" :style="'background-image:url('+item.img+');'"></view>
					<view class="content">
						<view class="flex">
							<view class="text-black text-bold text-cut">{{item.title}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<text>{{item.author}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				str: '', //搜索的关键字
				Books: [], //查询后返回的书籍
			}
		},
		methods: {
			input() {
					this.Books = []
					let websiteUrl = getApp().globalData.base_ip + 'book/queryByLike';
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
							"str": this.str
						},
						success: res => {
							if (res.data.data) {
								this.Books = res.data.data
								console.log(this.Books)
							}


						},
						fail: () => {},
						complete: () => {}
					});
				

			},
			to(item){
				console.log(item);
				uni.navigateTo({
					url:'./booksDetails/booksDetails?item='+ encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

<style>
	.search {
		border: 0.1px solid #FDFEF6;
		border-radius: 50upx;
		padding-left: 1;
		width: 90%;
		background-color: #f8f8f8;
		margin-top: 30px;
		margin: auto;
	}

	.padding-top {
		padding-top: 40px;
	}

	image {
		width: 85px;
		height: 110px;
	}

</style>
