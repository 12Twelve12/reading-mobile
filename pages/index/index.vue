<template>

	<view class="padding-top">
		<scroll-view scroll-x class="bg-white nav">
			<view class="cu-item" :class="index==TabCur?'text-cyan cur':''" v-for="(item,index) in tabSelects"
				:key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
			<!-- <text class="cuIcon-search text-gray search"></text> -->
		</scroll-view>
		<view v-if="TabCur==0">
			<text class="text-gray" style="display: block;text-align: center;padding: 12px;"
				v-if="booklists.length==0">暂无数据</text>
			<CardList v-bind:booklists="booklists" @to_details="to_details"></CardList>
		</view>
		<view v-if="TabCur==1">
			<text class="text-gray" style="display: block;text-align: center;padding: 12px;"
				v-if="booklists.length==0">暂无数据</text>
			<CardList v-bind:booklists="booklists"></CardList>
		</view>
	</view>

</template>

<script>
	import CardList from '../../components/cardList.vue'
	export default {
		data() {
			return {
				TabCur: 0,
				tabSelects: ["推荐", "最新"],
				booklists: []
			}
		},
		components: {
			CardList
		},
		onShow() {
			this.getData()
		},
		created() {
			//记录日志=============================================
			let user = uni.getStorageSync('user')
			let val = {}
			if (user) {
				val = {
					"startTime": this.$moment().format('YYYY-MM-DD HH:mm:ss'),
					"operation": "访问",
					"userId": user.id
				}

			} else {
				val = {
					"startTime": this.$moment().format('YYYY-MM-DD HH:mm:ss'),
					"operation": "访问"
				}
			}
			this.$uniApi.addLog(val)
			//记录日志=============================================
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.getData()
			},
			getData() {
				let websiteUrl
				if (this.TabCur == 1) {
					websiteUrl = getApp().globalData.base_ip + 'booklist/findAllNew';
				} else {
					websiteUrl = getApp().globalData.base_ip + 'booklist/findAllLookCounts?startTime=';
				}

				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					success: res => {
						if (res.data.success) {
							this.booklists = res.data.data;
							this.$forceUpdate(); //强制刷新，数据才会更新
						}


					},
					fail: () => {},
					complete: () => {}
				});

			},
			to_details(index) {
				uni.navigateTo({
					url: '../booklist/bookListDetails?item=' + encodeURIComponent(JSON.stringify({
						"booklists": this.booklists[index]
					}))
				})
			},

		}
	}
</script>

<style>
	.search {
		position: absolute;
		top: 32%;
		right: 20px;
	}

	.booklist {
		background-color: #edf6ff;
	}

	.bookcard {
		display: flex;
		flex-direction: column !important;
		text-align: center;
	}

	.padding-top {
		padding-top: 40px;
	}
</style>
