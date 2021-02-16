<template>
	<view>
		<BooksDetails :detail="detail" :chapter_count="chapter.count" @to_read="to_read"></BooksDetails>
		<Comments :comments_lists="comments_lists"></Comments>
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
		//接受参数
		onLoad: function(option) {
			console.log(option)
			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				console.log("传过来的数据")
				console.log(item);
				this.detail = item;
				this.getChapter()
			}

		},
		methods: {
			//子组件点击立即阅读，跳转
			to_read(val){
				console.log("子组件点击立即阅读传过来的值"+val)
				uni.navigateTo({
					url:'./read?item='+ encodeURIComponent(JSON.stringify({"detail":this.detail,"chapter":this.chapter}))
				})
				
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
						console.log(res.data);
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
