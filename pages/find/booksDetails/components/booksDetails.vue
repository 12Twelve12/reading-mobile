<template>
	<view class="books-details bg-white">
		<view class="book-detail _padding" style="padding-top: 40px;">
			<view class="detail-left">
				<image class="book-img" :src="detail.img" />
			</view>
			<view class="detail-right">
				<view class="detail-right-box">
					<view class="title">{{detail.title}}</view>
					<view class="author">{{detail.author}}</view>
					<view class="score">
						<text class="text-yellow text-bold padding-sm">{{grade.score}}分</text>
						<view v-for="(item,index) in grade.score_star">
							<text :class="item?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow"></text>
						</view>
					</view>
					<!-- <view class="grade">
						<u-rate active-color="#FFB32F" current="5" :disabled='true' />
					</view> -->
				</view>
				<view class="btn-box">
					<view class="readBtn" @click="to">开始阅读</view>
					<view class="joinBtn" v-if="isBookShelf==true">已加入书架</view>
					<view class="joinBtn" v-else @click="addBookShelf">加入书架</view>
				</view>
			</view>
		</view>
		<view class="_padding">
			<view class="padding-top" :class="show?'':'jieshao'">
				{{detail.des}}
				<text v-if="show" class="text-green cuIcon-fold" @click="hidded">收起</text>
			</view>
			<text v-if="!show" @click="shows" class="text-green cuIcon-unfold"
				style="position: relative;left: 33%;">展开阅读全文</text>
		</view>
		<view class="flex justify-between directory _padding" @click="to_directory">
			<view>目录</view>
			<view class="text-sm text-gray">共{{chapter_count}}章<text class="cuIcon-right"></text></view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['detail', 'chapter_count', 'isBookShelf', 'grade'],
		data() {
			return {
				show: false,
				// score: 5, //评分数
				// score_star: [true, true, true, true, true]
			};
		},
		components: {

		},
		methods: {

			/* 显示全部简介 */
			shows() {
				this.show = true
			},
			hidded() {
				this.show = false
			},
			to() {
				if (this.detail.isDeleted == 0) {
					this.$emit('to_read')
				} else {
					uni.showToast({
						title: '该书已下架',
						icon:'none'
					});
				}

			},
			addBookShelf() {
				if (this.detail.isDeleted == 0) {
					this.$emit('addBookShelf')
				} else {
					uni.showToast({
						title: '该书已下架',
						icon:'none'
					});
				}

			},
			to_directory() {
				if (this.detail.isDeleted == 0) {
					this.$emit('to_directory')
				} else {
					uni.showToast({
						title: '该书已下架',
						icon:'none'
					});
				}

			}

		}
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
				// padding: 10upx;
				background-color: rgba(12, 10, 6, 0.3);
				width: fit-content;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				padding-right: 10upx;
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
