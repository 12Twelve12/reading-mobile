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
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<4"
				@tap="to(item)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="flex solid-bottom padding justify-between">
			<view class="text-xl">随便看看</view>
			<view class="text-sm text-orange">换一换<text class='cuIcon-refresh padding-sm text-orange'></text></view>
		</view>
		<GridList :BookLists="BookLists"></GridList>
		<LookingList class="padding"></LookingList>
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
				str: "" //搜索关键字
			}
		},
		components: {
			GridList,
			LookingList
		},
		created() {
			this.getData()
		},
		methods: {
			to(item) {
				console.log(item);
				if(item.name=="更多"){
					item=this.cuIconList[0]
				}
				// console.log(id);
				uni.navigateTo({
					url: './classify/classify?item='+encodeURIComponent(JSON.stringify(item))
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
