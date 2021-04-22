<template>
	<view id="main_content" :style="'height: '+windowHeights+'px; background-color: #FFFFFF;'">
		<view class="top_back">
			<view class="padding-sm flex">
				<view class="flex-sub text-xxl text-white">书架</view>
				<view class="flex-sub" style="text-align: right;">
					<!-- <text class="cuIcon-search text-white padding-sm xl"></text>
					<text class="cuIcon-pick text-white padding-sm"></text>
					<text class="cuIcon-time text-white padding-sm"></text> -->
				</view>
				<!-- <text class="text-xl">书架</text>
				<view class="">
					<text class="cuIcon-search text-grey"></text>
					<text class="cuIcon-pick text-grey"></text>
					<text class="cuIcon-time text-grey"></text>
				</view> -->
			</view>
			<!-- <view class="cu-card dynamic"> -->
			<view class="cu-item padding-sm time_card">
				今日阅读 {{minutes}}分{{seconds}}秒
			</view>
			<!-- <image src="../../static/logo.png"></image> -->
			<!-- </view> -->
		</view>
		<GridList :BookLists="BookLists" v-if="user&&BookLists.length>0" @to_read="to_read" @to_longpress="to_longpress"
			:total="BookLists.length">
		</GridList>
		<view v-if="!user" class="text-gray text-center padding">还没登陆哦~</view>
		<view v-if="user&&BookLists.length==0" class="text-gray text-center padding">空空如也~</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm" :title="'是否移除该图书？'"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import GridList from '../find/components/gridList.vue'
	export default {
		data() {
			return {
				//书列表数据
				BookLists: [],
				user: {},
				windowHeights: 0,
				detail: {}, //基本信息（作者，简介等）
				chapter: {}, //章节数
				current_progress: 0, //当前进度，第几-1章
				minutes: '0', //进入阅读分钟
				seconds: '0', //进入阅读余秒
				del_bookid: null
			}
		},
		onShow() {
			let user = uni.getStorageSync('user');
			if (user != null) {
				this.user = user
			}
			this.getData()
			this.getTimeDay()
		},
		onLoad() {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.windowHeight);
					_this.windowHeights = res.windowHeight
				}
			});
		},

		methods: {
			getData() {
				if (this.user) {
					this.BookLists = []
					let websiteUrl = getApp().globalData.base_ip + 'users/queryBookShelf';
					console.log(this.user)
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
							"id": this.user.id
						},
						success: res => {
							if (res.data.code == 0) {
								this.BookLists = res.data.data
								//添加图标
								this.BookLists.push({
									id: 'find',
									img: '../../static/add.png',
									title: ''
								})
							}
							console.log(this.BookLists)


						},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			//获得跳转时需要的数据
			to_read(index) {
				if (index < this.BookLists.length - 1) {
					if (this.BookLists[index].isDeleted == 0) {
						this.detail = this.BookLists[index]
						this.updateTime()
						this.getCurrent_progress()
						this.getChapter()
					}else{
						uni.showToast({
							title: '该书已下架',
							icon:'none'
						});
					}

				} else {
					uni.switchTab({
						url: '../find/find'
					})
				}

			},
			/* 长按删除 */
			to_longpress(index) {
				this.del_bookid = this.BookLists[index].id
				this.$refs.popup.open() //进入阅读界面前先问是否要加入书架
			},
			//是否删除图书对话框======================================================================================
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done) {
				done()
				//确认删除
				this.delete()
			},
			//是否删除图书对话框======================================================================================


			to() {
				// console.log("获得跳转时需要的数据")
				// console.log(this.chapter)
				// console.log(this.current_progress)
				/* 跳转前更新阅读进度，好在书架中排序 */
				uni.navigateTo({
					url: '../find/booksDetails/read?item=' + encodeURIComponent(JSON.stringify({
						"detail": this.detail,
						"chapter": this.chapter,
						"current_progress": this.current_progress,
						"isBookShelf": true //是否存在书架中（前提是已经登陆）
					}))
				})
			},

			//获得章节信息
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
						console.log("获得章节信息")
						console.log(res.data)
						this.to()
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//获得阅读进度
			getCurrent_progress() {
				uni.request({
					url: getApp().globalData.base_ip + 'read/query',
					method: 'GET',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'

					},
					dataType: 'json',
					data: {
						"userId": this.user.id,
						"bookId": this.detail.id
					},
					success: res => {
						console.log("获得进度返回结果=====================")
						console.log(res)
						console.log(res.data)
						if (res.data.data != -1) {
							this.current_progress = res.data.data
						} else {
							this.current_progress = 0
						}
						console.log(this.current_progress)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getTimeDay() {
				if (this.user) {
					uni.request({
						url: getApp().globalData.base_ip + 'read/queryTimeDay?userId=' + this.user.id,
						method: 'GET',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						dataType: 'json',
						success: res => {
							console.log("获得时间返回结果=====================")
							console.log(res)
							console.log(res.data)
							this.minutes = res.data.msg
							this.seconds = res.data.data

						},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			/**
			 * 更新书阅读的时间，方便书架排序
			 */
			updateTime() {
				uni.request({
					url: getApp().globalData.base_ip + 'bookshelf/update',
					method: 'PUT',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'

					},
					dataType: 'json',
					data: {
						"userId": this.user.id,
						"bookId": this.detail.id,
						"time": this.$moment().format('YYYY-MM-DD HH:mm:ss')
					},
					success: res => {
						if (!res.data.success) {
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
			/* 从书架中移除 */
			delete() {
				uni.request({
					url: getApp().globalData.base_ip + 'bookshelf/delete',
					method: 'DELETE',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					data: {
						"userId": this.user.id,
						"bookId": this.del_bookid,
					},
					success: res => {
						if (!res.data.success) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						} else {
							this.getData()
						}

					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			GridList
		}
	}
</script>

<style scoped>
	.top_back {
		width: 100%;
		height: 330upx;
		background-size: 100% 230upx;
		background: #517E69;
		/* background-image: url(../../static/top_back.jpg); */
		background-repeat: no-repeat;
		/* padding: 55px; */
	}

	.time_card {
		position: relative;
		top: 37px;
		left: -8px;
		background-color: white;
		width: 177px;
		border-radius: 9px;
		padding-left: 20px;
	}

	[class*="cuIcon-"] {

		font-size: large;

	}

	.flex-sub {
		top: 30px;
		position: relative;
	}
</style>
