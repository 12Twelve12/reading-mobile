<template>
	<view class="bg-white main">
		<view class="bg-white text-xl padding">
			<text>书评</text>
		</view>
		<view class=" comment_title text-green">
			<text class="cuIcon-communityfill padding-left text-sm ">雅俗共赏，发表你的读书感慨</text>
		</view>
		<view class="cu-card dynamic">
			<view class="cu-item ">
				<view class="cu-list menu-avatar comment ">
					<view class="cu-item" v-for="(item,index) in comments_lists" :key="index">
						<!--头像-->
						<view class="cu-avatar round" :style="'background-image:url('+item.userimg+');'"></view>
						<view class="content">
							<view class="text-grey">{{item.username}}</view>
							<view class="text-black text-content text-df">
								评论内容
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2021-02-15 00:23</view>
								<view>
									<text class="cuIcon-appreciatefill text-red">2</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['comments_lists'],
		data() {
			return {


			};
		},
		components: {

		},

		methods: {


		}
	}
</script>

<style scoped>
	.comment_title {
		border: 0.5rpx solid #f5f5f5;
		width: 90%;
		padding: 12rpx;
		border-radius: 30rpx;
		background: #f5f5f5;
		margin: auto;

	}
	.main{
		margin-top: 12upx;
		padding-bottom: 24upx;
	}
</style>
