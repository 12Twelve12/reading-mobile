<template>
	<view>
		<BookListDetails :booklist="booklist" :books="books" :is_collect="is_collect" @Collect="Collect"></BookListDetails>
		<Books :books="books" @to_bookDetails="to_bookDetails"></Books>
	</view>
</template>

<script>
	import BookListDetails from './components/details.vue'
	import Books from './components/list.vue'
	export default {
		data() {
			return {
				booklist:{},
				books:[],
		// 		booklists: {
		// 			"booklist": {
		// 				"des": "",
		// 				"id": null,
		// 				"img":"",
		// 				"name":"",
		// 				"nickname":"",
		// 				"time":""
		
		// 			},
		// 			"books": []
		// 		},
				user: {},
				is_collect: false
			}
		},
		components: {
			BookListDetails,
			Books
		},
		//接受参数
		onLoad: function(option) {

			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				console.log("============================================")
				console.log(item.booklists)
				this.booklist = item.booklists.booklist;
				this.books=item.booklists.books
			console.log(this.booklist)
			console.log(this.books)
				// this.$forceUpdate();
			}


		},
		onShow() {
				
		},
		mounted() {
			this.isCollect()
		},
		created() {
			this.user = uni.getStorageSync('user')

		},
		methods: {
			to_bookDetails(index) {
				uni.navigateTo({
					url: '../find/booksDetails/booksDetails?item=' + encodeURIComponent(JSON.stringify(this.books[index]))
				})
			},
			//判断是否收藏
			isCollect() {
				console.log("收藏")
				console.log(this.user)
				if (this.user.nickname) {
					let websiteUrl = getApp().globalData.base_ip + 'booklistCollect/isCollect';
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
							"booklistId": this.booklist.id,
							"userId": this.user.id
						},
						success: res => {
							console.log(res.data)
							if (res.data.success) {
								this.is_collect = true
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {

				}
			},
			Collect() {
				if (this.is_collect) {
					this.delCollect()
				} else {
					this.addCollect()
				}
			},
			addCollect() {
				let websiteUrl = getApp().globalData.base_ip + 'booklistCollect/insert';
				uni.request({
					url: websiteUrl,
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						// 'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"booklistId": this.booklist.id,
						"userId": this.user.id,
						"time":this.$moment().format('YYYY-MM-DD hh:mm:ss')
					},
					success: res => {
						if (res.data.success) {
							uni.showToast({
								title: '收藏成功',
								icon: 'none'
							})
							this.is_collect = true
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			delCollect() {
				let websiteUrl = getApp().globalData.base_ip + 'booklistCollect/delete';
				uni.request({
					url: websiteUrl,
					method: 'DELETE',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						// 'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data: {
						"booklistId": this.booklist.id,
						"userId": this.user.id
					},
					success: res => {
						if (res.data.success) {
							uni.showToast({
								title: '已取消收藏',
								icon: 'none'
							})
							this.is_collect = false
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>

</style>
