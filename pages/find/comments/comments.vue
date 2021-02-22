<template>
	<view class="padding-top padding-left padding-right bg-white">
		<!-- <view class="cuIcon-back padding-bottom text-lg"></view> -->
		<view class="flex padding-bottom">
			<view class="flex-sub">
				<image class="book-img" :src="detail.img" />
			</view>
			<view class="flex-twice">
				<text class="text-gray padding-bottom">轻点评分</text>
				<view class="score padding-top">
					<text :class="score_star[0]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow" @click="click_star(0)"></text>
					<text :class="score_star[1]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow" @click="click_star(1)"></text>
					<text :class="score_star[2]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow" @click="click_star(2)"></text>
					<text :class="score_star[3]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow" @click="click_star(3)"></text>
					<text :class="score_star[4]?'cuIcon-favorfill':'cuIcon-favor'" class="text-yellow" @click="click_star(4)"></text>
					<text class="text-yellow padding-left text-lg">{{score}}.0分</text>
				</view>
			</view>
		</view>
		<view style="border-top: 0.1px solid #d5d5d5;padding-top: 20upx;" class="padding-bottom">
			<textarea v-model="content" placeholder="请点评这本书" placeholder-class="plaClass" style="width: 700upx;"></textarea>
			<text class="cuIcon-pullright bg-white text-green text-lg" style="padding-left: 82%;" @click="send">发送</text>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				user: {},
				score_star: [false, false, false, false, false],
				score: 0, //评论分数
				content: '' //评论内容
			}
		},
		//接受参数
		onLoad: function(option) {

			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				this.detail = item.detail;
				this.user = item.user
			}

		},
		methods: {
			//点击星星评分
			click_star(index) {
				this.score = index + 1
				let arr = []
				for (let i = 0; i <= index; i++) {
					arr.push(true)
				}
				this.score_star = arr
			},
			send(){
				if(this.content.length==0||this.score==0){
					uni.showToast({
						title:'评分和内容不能为空',
						icon:'none'
					})
				}else{
					uni.request({
					url: getApp().globalData.base_ip + 'comment/insert',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						// 'Content-Type': 'application/json',
					},
					dataType: 'json',
					data: {
						"userId": this.user.id,
						"bookId": this.detail.id,
						"content":this.content,
						"time":this.$moment().format('YYYY-MM-DD hh:mm:ss'),
						"grade":this.score
					},
					success: res => {
						console.log("获得进度返回结果=====================")
						console.log(res)
						console.log(res.data)
						if(res.data.success){
							uni.navigateBack({
								
							})
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				}
				
			}
		}
	}
</script>

<style scoped>
	.padding-top {
		padding-top: 100upx;
	}

	.book-img {
		width: 150upx;
		height: 200upx;
		left: 50upx;
	}

	.score {
		width: fit-content;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		padding-right: 20upx;
	}

	[class*="cuIcon-"] {
		font-size: initial;
	}

	.plaClass {
		color: #dbdbdb;
		width: 382px;
	}
</style>
