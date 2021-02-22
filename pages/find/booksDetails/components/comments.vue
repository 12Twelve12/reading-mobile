<template>
	<view class="bg-white main">
		<view class="bg-white text-xl padding">
			<text>书评</text>
		</view>
		<view class=" comment_title text-green" @click="to_comments">
			<text class="cuIcon-communityfill padding-left text-sm ">雅俗共赏，发表你的读书感慨</text>
		</view>
		<view v-if="comments_lists.length==0" style="text-align: center;" class="text-gray padding-top">暂无评论</view>
		<view class="cu-card dynamic">
			<view class="cu-item ">
				<view class="cu-list menu-avatar comment ">
					<view class="cu-item" v-for="(item,index) in comments_lists" :key="index" @longpress="press(item)">
						<!--头像-->
						<view class="cu-avatar round" :style="'background-image:url('+item.img+');'"></view>
						<view class="content">
							<view class="text-grey">
								<text class="text-lg">{{item.nickname}}</text>
								<view class="padding-left">
									<text :class="item.score_star[0]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow"></text>
									<text :class="item.score_star[1]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow"></text>
									<text :class="item.score_star[2]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow"></text>
									<text :class="item.score_star[3]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow"></text>
									<text :class="item.score_star[4]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow"></text>
									<text class="text-yellow text-sm">{{item.str}}</text>
								</view>
							</view>
							<view class="text-black text-content text-df">
								{{item.content}}
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">{{item.time}}</view>
								<!-- <view>
									<text class="cuIcon-appreciatefill text-red">2</text>
								</view> -->
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
		props: ['comments_lists', 'user'],
		data() {
			return {

			};
		},
		components: {

		},

		methods: {
			to_comments() {
				this.$emit('to_comments')
			},
			press(item) {
				let that=this;
				if(this.user.id==item.userId){
					uni.showModal({
					title: '提示',
					content: '是否要删除评论',
					success: function(res) {
						if (res.confirm) {
							that.$emit('del_comment',item.time)
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				}else{
					uni.showToast({
						title:'不能删除别人评论',
						icon:'none'
					})
				}
				
			}

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

	.main {
		margin-top: 12upx;
		padding-bottom: 24upx;
	}
</style>
