<template>
	<view>
		<BooksDetails :isBookShelf="isBookShelf" :detail="detail" :chapter_count="chapter.count" @to_read="to_read"
			@addBookShelf="addBookShelf" @to_directory="to_directory" :grade="grade"></BooksDetails>
		<Comments @to_comments="to_comments" :comments_lists="comments_lists" :detail="detail" :user="user" @del_comment="del_comment">
		</Comments>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm"></uni-popup-dialog>
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
					"img": "",
					"nickname": "",
					"content": "",
					"score_star": [],
					"time": "",
					"str": "" //不同星星颗数，不同话
				}],
				grade: {}
				// comments_lists: [{
				// 	"img": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2566720529,304942931&fm=26&gp=0.jpg",
				// 	"nickname": "twelve",
				// 	"content":"",
				// 	"time":""
				// }]
			};
		},
		components: {
			BooksDetails,
			Comments
		},
		onShow() {
			this.isInBookShelf()
			this.getComments()
		},
		//接受参数
		onLoad: function(option) {
			this.user = uni.getStorageSync('user');
			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				console.log(item, "**********************************")
				this.detail = item;
				this.getChapter()
				this.getGrade()

				if (this.detail.isDeleted == 0) {
					//记录日志=============================================
					let val
					if (this.user) {
						val = {
							"startTime": this.$moment().format('YYYY-MM-DD HH:mm:ss'),
							"operation": "浏览图书",
							"bookId": this.detail.id,
							"userId": this.user.id
						}
					} else {
						val = {
							"startTime": this.$moment().format('YYYY-MM-DD HH:mm:ss'),
							"operation": "浏览图书",
							"bookId": this.detail.id
						}
					}

					console.log(val)
					this.$uniApi.addLog(val)
					//记录日志=============================================
				} else {
					uni.showToast({
						title: '该书已下架',
						icon: 'none'
					});
				}

			}


		},
		methods: {
			//子组件点击立即阅读，跳转
			to_read() {
				if (!this.isBookShelf && this.user) {
					// 通过组件定义的ref调用uni-popup方法
					this.$refs.popup.open() //进入阅读界面前先问是否要加入书架

				} else {
					this.read()
				}


			},

			//子组件点击评论，跳转到填写评论内容页面
			to_comments() {
				if (this.user) {
					uni.navigateTo({
						url: '../comments/comments?item=' + encodeURIComponent(JSON.stringify({
							"detail": this.detail,
							"user": this.user
						}))
					})
				} else {
					this.go_login()
				}

			},

			//点击了目录
			to_directory() {
				uni.navigateTo({
					url: '../directory/directory?item=' + encodeURIComponent(JSON.stringify({
						"detail": this.detail,
						"chapter": this.chapter,
						"current_progress": this.current_progress,
						"isBookShelf": this.isBookShelf
					}))
				})
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

				//确认加入书架
				this.addBookShelf()
				this.isInBookShelf()

				done()
				let that = this
				setTimeout(function() {
					that.read()
				}, 100)

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
						"current_progress": this.current_progress,
						"isBookShelf": this.isBookShelf //是否存在书架中（前提是已经登陆）
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
								if (res.data.code != -1) {
									this.current_progress = res.data.code
								}
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
							"userId": this.user.id,
							"time": this.$moment().format('YYYY-MM-DD HH:mm:ss')
						},
						success: res => {
							if (res.data.success) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
								this.isBookShelf = true
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
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
			},
			getComments() {
				uni.request({
					url: getApp().globalData.base_ip + "comment/queryByBookId",
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"bookId": this.detail.id
					},
					success: res => {
						console.log(res.data)

						this.comments_lists = res.data
						for (let i = 0; i < this.comments_lists.length; i++) {
							let score_star = []
							for (let j = 0; j < this.comments_lists[i].grade; j++) {
								score_star.push(true);
							}
							this.comments_lists[i].score_star = score_star
							if (this.comments_lists[i].grade == 1) {
								this.comments_lists[i].str = "惨不忍睹"
							} else if (this.comments_lists[i].grade == 2) {
								this.comments_lists[i].str = "不值一提"
							} else if (this.comments_lists[i].grade == 3) {
								this.comments_lists[i].str = "平淡无奇"
							} else if (this.comments_lists[i].grade == 4) {
								this.comments_lists[i].str = "值得一看"
							} else if (this.comments_lists[i].grade == 5) {
								this.comments_lists[i].str = "强力推荐"
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//删除评论
			del_comment(time) {
				console.log("点击删除评论" + time)
				uni.request({
					url: getApp().globalData.base_ip + "comment/delete",
					method: 'DELETE',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						// 'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"time": time
					},
					success: res => {
						console.log(res.data)
						if (res.data.success) {
							uni.showToast({
								title: "成功删除",
								icon: 'none'
							})
							this.getComments()
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getGrade() {
				uni.request({
					url: getApp().globalData.base_ip + "comment/queryGrade",
					method: 'GET',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						// 'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"bookId": this.detail.id
					},
					success: res => {
						console.log(res.data)
						let score_star = []
						let score = res.data.data
						for (let j = 0; j < score; j++) {
							score_star.push(true);
						}
						if (score_star.length < 5) {
							for (let j = score_star.length; j < 5; j++) {
								score_star.push(false);
							}
						}
						this.grade = {
							"score_star": score_star,
							"score": score
						}
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
