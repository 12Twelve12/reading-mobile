<template>
	<view class="padding-top bg-white" style="height: -webkit-fill-available;">
		<!-- 发布提交按钮 -->
		<text class="cu-tag round line-green text-lg text-green add_cover padding-bottom" style="position: relative;left: 38%;width: min-content;"
		 @click="submit">发布</text>
		<!-- <view class="cu-avatar xl add_cover padding-bottom" style='background-image:url(../../static/add_cover.png);' @click="addCover()"></view> -->
		<!-- 书单名 -->
		<input class="input" placeholder="请输入书单名称" v-model="booklist.name" />
		<!-- 书单简介 -->
		<textarea placeholder="添加书单介绍" v-model="booklist.des"></textarea>
		<!-- 添加到书单的图书 -->
		<view class="flex justify-between padding">
			<view class="text-sm text-gray">已添加图书{{books.length}}本</view>
			<view class="cu-tag round line-green " @click="toSearch()">
				<text class="cuIcon-add"></text>
				添加图书
			</view>
		</view>
		<view class="cu-list grid bg-white" :class="['col-' + selectGridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in books" :key="index">
				<text class="cuIcon-roundclosefill" style="left: 23px;top: 7px; z-index: 100;color: #007AFF;" @click="delSelect(index)"></text>
				<view>
					<!-- <image style="width:70px; height: 100px; background-color: #eeeeee;" :src="item.src" @error="imageError"></image> -->
					<image :src="item.img" style="width: 42px;height: 61px;"></image>
				</view>
				<text style="color: #000000;" class="text-cut">{{item.title}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				booklist: {
					"name": "",
					"time": "",
					"des": "",
					"userId": 0
				},

				//选择的书======================================
				books: [],
				selectGridCol: 5, //宫格列表列数
				gridBorder: false,
				//选择的书======================================
			}
		},
		created() {
			this.booklist.userId = uni.getStorageSync('user').id
		},
		methods: {
			submit() {
				if (this.booklist.name.length == 0 || this.booklist.des.length == 0 || this.books.length == 0) {

				} else {
					let books = []
					for (let i = 0; i < this.books.length; i++) {
						books.push(this.books[i].id)
					}
					this.booklist.time = this.$moment().format('YYYY-MM-DD HH:mm:ss')
					console.log(this.booklist)
					console.log(books)
					uni.request({
						url: getApp().globalData.base_ip + 'booklist/insertList',
						method: 'POST',
						header: {
							// 'Content-Type': 'application/x-www-form-urlencoded'
							'Content-Type': 'application/json',
							// token : uni.getStorageSync("TOKEN")
						},
						dataType: 'json',
						data: {
								"booklist": this.booklist,
								"books": books
						},
						success: res => {
							console.log(res.data)
							if(res.data.code==200){
								uni.navigateBack({
									
								})
								uni.showToast({
									title:'添加成功',
									icon:'none'
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			toSearch() {
				uni.navigateTo({
					url: './addBook'
				})
			},
			delSelect(index) {
				console.log(index)
				this.books.splice(index, 1)
				console.log(this.select_books)
			},
			/**
			 * 预留添加封面，暂时不需要
			 */
			addCover() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths; //拿到选择图片的路径
						console.log(tempFilePaths);
						uni.uploadFile({
							url: getApp().globalData.base_ip + 'booklist/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							'content-type': 'application/x-www-form-urlencoded',
							success: (res) => {
								console.log(res.data.data.src[0])
							}
						});
					}
				});
			},

		}
	}
</script>

<style scoped>
	.add_cover {
		margin: 0 auto;
		display: block;
	}

	.input {
		width: 90%;
		background-color: #fafafa;
		margin: 0 auto;
		border-radius: 14upx;
		padding: 10upx;
		height: auto;
		padding-left: 20upx;
		margin-top: 40upx;
		margin-bottom: 40rpx;
	}

	textarea {
		width: 90%;
		background-color: #fafafa;
		margin: 0 auto;
		border-radius: 14upx;
		padding: 20upx;
		padding-left: 20upx;
	}

	.padding-top {
		padding-top: 40px;
	}
</style>
