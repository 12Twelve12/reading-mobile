<template>
	<view>
		<CardList v-bind:booklists="booklists" @to_details="to_details"></CardList>
	</view>
</template>

<script>
	import CardList from '../../components/cardList.vue'
	export default {
		data() {
			return {
				user:uni.getStorageSync('user'),
				booklists: [],
				type:''//为了复用，判断点击的是我的发布还是我的收藏
			}
		},
		components:{
				CardList
		},
		onLoad(val) {
			if(val){
				console.log(val.type)
				this.type=val.type
				this.getData()
			}
		},
		// created() {
			
		// 		this.getData()
		// },
		methods: {
			getData() {
				let websiteUrl
				if(this.type=="myBooklist"){
					websiteUrl = getApp().globalData.base_ip + 'booklist/queryByUser';
				}else{
					websiteUrl = getApp().globalData.base_ip + 'booklist/queryCollect';
				}
				
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					data:{"userId":this.user.id},
					dataType: 'json',
					success: res => {
						if (res.data.success) {
							this.booklists = res.data.data;
							// Vue.set( target, key, value )
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
