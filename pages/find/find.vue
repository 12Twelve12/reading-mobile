<template>
	<view class="back">
		<view class="top_back flex justify-start">
			<view class="text-xxl top_text">找书</view>
			<view class="cu-form-group search">
				<input placeholder="搜索 书名|作者" name="input" disabled @click="to_search()"></input>
				<text class='cuIcon-search text-green'></text>
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<4" @tap="to(item)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="flex solid-bottom padding justify-between">
			<view class="text-xl">推荐</view>
			<!-- 	<view class="text-sm text-orange">换一换<text
					class='cuIcon-refresh padding-sm text-orange'></text></view> -->
		</view>
		<GridList :BookLists="RecommendedBooks" :total="6" @to_read="to_detail"></GridList>
		<LookingList class="padding" :lookingList="lookingList" @to_detail_looking="to_detail_looking"></LookingList>
	</view>
</template>

<script>
	import GridList from './components/gridList.vue'
	import LookingList from './components/lookingList.vue'
	export default {
		data() {
			return {
				gridCol: 4,
				gridBorder: false,
				//分类信息
				cuIconList: [],
				//书列表数据
				BookLists: [{
					img: '../../../static/logo.png',
					name: '书名1',
					href: '../../pages/generator/generator'
				}, {
					img: '../../../static/logo.png',
					name: '书名1',
					href: '../../pages/powerpurchase/powerpurchase'
				}, {
					img: '../../../static/logo.png',
					name: '书名1',
					href: '../../pages/buy/buy'
				}, {
					img: '../../../static/logo.png',
					name: '书名1',
					href: '../../pages/market/policies/policies'
				}, {
					img: '../../../static/logo.png',
					name: '书名1',
					href: '../../pages/market/information/information'
				}, {
					img: '../../../static/logo.png',
					name: '书名1',
					href: '../../pages/market/trading/trading'
				}],
				str: "", //搜索关键字
				user: {},
				RecommendedBooks: [], //推荐的图书(没有推荐时就按阅读量)
				lookingList: [] //大家都在看的图书列表（按浏览量）
			}
		},
		components: {
			GridList,
			LookingList
		},
		created() {
			this.getData()
			
			
		},
		onShow() {
			this.user = uni.getStorageSync("user");
			this.getRecommendedResult()
			this.getLookList()
		},
		methods: {
			to(item) {
				console.log(item);
				if (item.name == "更多") {
					item = this.cuIconList[0]
				}
				// console.log(id);
				uni.navigateTo({
					url: './classify/classify?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			to_search() {
				uni.navigateTo({
					url: './search'
				})
			},
			//获得所有分类
			getData() {
				let websiteUrl = getApp().globalData.base_ip + 'classify/queryAlls';
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					success: res => {
						console.log(res.data)
						for (let i = 0; i < res.data.length - (res.data.length - 3); i++) {
							let cuIcon = ""
							let color = ""
							if (i == 0) {
								cuIcon = "discover"
								color = "red"
							} else if (i == 1) {
								cuIcon = "read"
								color = "orange"
							} else if (i == 2) {
								cuIcon = "form"
								color = "yellow"
							}
							this.cuIconList.push({
								cuIcon: cuIcon,
								color: color,
								badge: 0,
								name: res.data[i].name,
								id: res.data[i].id
							});
						}
						this.cuIconList.push({
							cuIcon: 'cascades',
							color: 'olive',
							badge: 0,
							name: '更多'
						})

						// this.list = res.data
						// this.$forceUpdate();//强制刷新，数据才会更新
					},
					fail: () => {},
					complete: () => {}
				});
			},
			/**
			 *推荐
			 */
			getRecommendedResult() {
				let recommended_data;
				if (this.user) {
					recommended_data = {
						"userId": parseInt(this.user.id) 
					}
				} else {
					recommended_data = {
						"userId": -1
					}
				}
				let websiteUrl = getApp().globalData.base_ip + 'book/recommended';
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: recommended_data,
					success: res => {
						console.log(res.data)
						if (res.data.success) {
							this.RecommendedBooks = res.data.data
						} else {
							let python_datas = []
							for (let i = 0; i < res.data.data.length; i++) {
								python_datas.push({
									"userId": "" + res.data.data[i].userId,
									"grade": "" + res.data.data[i].grade,
									"bookId": res.data.data[i].bookId
								})
							}
							//使用算法
							let websiteUrl = getApp().globalData.mongo_ip + 'cmdb/getResult';
							uni.request({
								url: websiteUrl,
								method: 'POST',
								header: {
									'Content-Type': 'application/json',
									// 'Content-Type': 'application/x-www-form-urlencoded'

									// token : uni.getStorageSync("TOKEN")
								},
								dataType: 'json',
								data: {
									"userId": this.user.id + "",
									"datas": python_datas
								},
								success: res => {
									console.log("协同过滤", res.data)
									console.log("协同过滤", res.data.data != {})
									// if(res.data.data!={}){
									console.log("协同过滤", res.data)
									let bookList = []
									for (let book_id in res.data.data) {
										bookList.push({
											"id": parseInt(book_id)
										})
									}
									console.log(bookList)
									this.getBooks(bookList);
									// }else{
									// 	/* 无推荐结果就按无登录时的推荐 */
									// 	let websiteUrl = getApp().globalData.base_ip + 'book/recommended';
									// 	uni.request({
									// 		url: websiteUrl,
									// 		method: 'GET',
									// 		header: {
									// 			'Content-Type': 'application/json',
									// 			// token : uni.getStorageSync("TOKEN")
									// 		},
									// 		dataType: 'json',
									// 		data: {"userId":-1},
									// 		success: res => {
									// 			this.RecommendedBooks = res.data.data
									// 		},
									// 		});
									// }
								},
							});
						}

					},
					fail: () => {},
					complete: () => {}
				});
			},
			/**
			 * 有推荐结果时，拿到结果去请求书的数据
			 */
			getBooks(bookList) {
				let websiteUrl = getApp().globalData.base_ip + 'book/recommendedResult';
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"bookList": JSON.stringify(bookList)
					},
					success: res => {
						console.log(res.data)
						this.RecommendedBooks = res.data.data

					},
					fail: () => {},
					complete: () => {}
				});
			},

			//获得跳转时需要的数据（推荐那里的跳转）
			to_detail(index) {
				let item = this.RecommendedBooks[index]
				console.log(item);
				uni.navigateTo({
					url: 'booksDetails/booksDetails?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			
			//获得跳转时需要的数据（大家都在看那里的跳转）
			to_detail_looking(index) {
				let item = this.lookingList[index]
				console.log(item);
				uni.navigateTo({
					url: 'booksDetails/booksDetails?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			
			getLookList(){
				let websiteUrl = getApp().globalData.base_ip + 'book/findAllLookCounts?startTime=';
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					success: res => {
						console.log(res.data)
						this.lookingList = res.data.data
				
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	.top_back {
		width: 100%;
		padding: 15px;
	}

	.top_text {
		align-self: center;
		width: 17%;
		color: #517E69;
	}

	.back {
		background-color: #FFFFFF;
		height: 100%;
	}

	.search {
		border: 0.1px solid #FDFEF6;
		border-radius: 50upx;
		padding-left: 1;
		width: 83%;
		background-color: #FDFEF6;
		margin-top: 30px;
	}
</style>
