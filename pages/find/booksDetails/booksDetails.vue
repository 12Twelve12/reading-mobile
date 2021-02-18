<template>
	<view>
		<BooksDetails :isBookShelf="isBookShelf" :detail="detail" :chapter_count="chapter.count" @to_read="to_read"
		 @addBookShelf="addBookShelf"></BooksDetails>
		<Comments :comments_lists="comments_lists"></Comments>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import BooksDetails from './components/booksDetails.vue'
	import Comments from './components/comments.vue'
	export default {
		data() {
			return {
				detail: {}, //基本信息（作者，简介等）
				chapter: {}, //章节数
				user: {},
				current_progress: 0, //当前进度，第几-1章
				isBookShelf: false, //标记是否存在书架中
				comments_lists: [{
					"userimg": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2566720529,304942931&fm=26&gp=0.jpg",
					"username": "twelve"
				}, {
					"userimg": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2566720529,304942931&fm=26&gp=0.jpg",
					"username": "twelve"
				}, {
					"userimg": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2566720529,304942931&fm=26&gp=0.jpg",
					"username": "twelve"
				}]
			};
		},
		components: {
			BooksDetails,
			Comments
		},
		onShow() {
			let user = uni.getStorageSync('user');
			if (user != null) {
				this.user = user
			}
			this.getChapter()
			this.isInBookShelf()
		},
		//接受参数
		onLoad: function(option) {

			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				this.detail = item;

			}

		},
		methods: {
			//子组件点击立即阅读，跳转
			to_read() {
				if (!this.isBookShelf && this.user) {
					// 通过组件定义的ref调用uni-popup方法
					this.$refs.popup.open()//进入阅读界面前先问是否要加入书架

				} else {
					this.read()
				}


			},

			//是否加入书架对话框======================================================================================
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
				this.read()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done) {
				done()
				//确认加入书架
				this.addBookShelf()
				this.read()
				// TODO 做一些其他的事情，手动执行 done 才会关闭对话框
				// ...
				
			},
			//是否加入书架对话框======================================================================================

			//进入阅读界面
			read() {
				uni.navigateTo({
					url: './read?item=' + encodeURIComponent(JSON.stringify({
						"detail": this.detail,
						"chapter": this.chapter,
						"current_progress": this.current_progress
					}))
				})
			},

			//判断是否在书架中
			isInBookShelf() {
				if (this.user.nickname) {
					let websiteUrl = getApp().globalData.base_ip + 'bookshelf/isInBookShelf';
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
							"bookId": this.detail.id,
							"userId": this.user.id
						},
						success: res => {
							if (res.data.success) {
								this.isBookShelf = true
								//如果有在书架中，获取最新阅读进度，比如在第几章
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {

				}
			},
			go_login() {
				uni.navigateTo({
					url: '../../login/login'
				})
			},
			addBookShelf() {
				if (this.user) {
					let websiteUrl = getApp().globalData.base_ip + 'bookshelf/insert';
					uni.request({
						url: websiteUrl,
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
							// 'Content-Type': 'application/json',
							// token : uni.getStorageSync("TOKEN")
						},
						dataType: 'json',
						data: {
							"bookId": this.detail.id,
							"userId": this.user.id
						},
						success: res => {
							if (res.data.success) {
								uni.showToast({
									title: res.data.msg,
									icon:'none'
								});
								this.isBookShelf = true
							} else {
								uni.showToast({
									title: res.data.msg,
									icon:'none'
								});
							}


						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					this.go_login()
				}

			},



			/* 显示全部简介 */
			shows() {
				this.show = true
			},
			hidded() {
				this.show = false
			},
			getChapter() {
				let websiteUrl = getApp().globalData.mongo_ip + 'cmdb/getChapter';
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"id": this.detail.mongoId
					},
					success: res => {
						this.chapter = res.data
					},
					fail: () => {},
					complete: () => {}
				});
			}

		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	._padding {
		padding-left: 40upx;
		padding-right: 40upx;
	}

	.book-detail {
		display: flex;
		background-color: #517E69;
		padding-bottom: 40upx;

		.detail-left {
			flex: 1;
			min-width: 270upx;
			max-width: 270upx;
			height: 340upx;

			.book-img {
				width: 240upx;
				height: 340upx;
				border-radius: 12upx;
				background-color: #1CBBB4;
			}
		}

		.detail-right {
			height: 340upx;
			padding: 4upx 0;

			.detail-right-box {
				height: calc(100% - 64upx);
			}

			.title {
				font-size: 36upx;
				font-weight: 700;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-bottom: 10upx;
				color: #f5f5f5;
			}

			.author {
				font-size: 26upx;
				color: #ffffff;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				padding-bottom: 20upx;
			}

			.score {
				padding: 10upx;
				background-color: rgba(12, 10, 6, 0.3);
				width: fit-content;
				border-radius: 8rpx;
			}



			.grade {
				padding-top: 4upx;
			}

			.btn-box {
				.readBtn {
					background-color: #39B54A;
					border: 1px solid #39B54A;
					padding: 0 30upx;
					display: inline-block;
					height: 64upx;
					line-height: 64upx;
					border-radius: 4upx;
					color: #fff;
					cursor: pointer;
					font-size: 28upx;
					margin-right: 26upx;
				}

				.readBtn:active {}

				.joinBtn {
					border: 1px solid #4CD964;
					color: #4CD964;
					padding: 0 29upx;
					height: 64upx;
					line-height: 64upx;
					display: inline-block;
					border-radius: 4upx;
					cursor: pointer;
					font-size: 28upx;
				}
			}
		}

	}

	.jieshao {
		color: #8c8c8c;
		line-height: 1.3rem;
		word-break: break-all;
		text-overflow: ellipsis;
		/* 显示为省略号 */
		display: -webkit-box;
		/* 对象作为伸缩盒子模型显示 */
		-webkit-box-orient: vertical;
		/* 设置或检索伸缩盒对象的子元素的排列方式*/
		-webkit-line-clamp: 3;
		/*显示行数 */
		overflow: hidden;

	}

	.directory {
		border-top: 0.1px solid #e4e4e4; //上边框
		margin-top: 12upx;
		padding-top: 24upx;
		padding-bottom: 24upx;
	}
</style>
