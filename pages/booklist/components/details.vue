<template>
	<view class="books-details bg-white">
		<view class="book-detail _padding" style="padding-top: 40px;">
			<view class="detail-left">
				<image class="book-img" :src="booklists.booklist.img" />
			</view>
			<view class="detail-right">
				<view class="detail-right-box">
					<view class="title">{{booklists.booklist.name}}</view>
					<view class="author">{{booklists.booklist.nickname}} 创建</view>
				</view>
				<view class="padding-top padding-right text-white">{{booklists.booklist.des}}</view>
			</view>

		</view>
		<view class="flex justify-between directory _padding">
			<view class="text-xl text-bold">书目({{booklists.books.length}})</view>
			<view class="joinBtn" v-if="is_collect==true" @click="addCollect">已收藏</view>
			<view class="joinBtn" v-else @click="addCollect">收藏书单</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['booklists', 'is_collect'],
		data() {
			return {

			};
		},
		components: {

		},
		methods: {

			to() {
				this.$emit('to_read')
			},
			addCollect() {
				this.$emit('Collect')
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
		// padding-bottom: 40upx;

		.detail-left {
			flex: 1;
			min-width: 270upx;
			max-width: 270upx;
			height: 340upx;

			.book-img {
				width: 223upx;
				height: 209upx;
				border-radius: 12upx;
				background-color: #1CBBB4;
			}
		}

		.detail-right {
			height: 340upx;
			padding: 4upx 0;

			.detail-right-box {
				height: calc(100% - 241upx);
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


			}
		}

	}

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
		// border-top: 0.1px solid #e4e4e4; //上边框
		margin-top: 12upx;
		padding-top: 24upx;
		padding-bottom: 24upx;
	}
</style>
