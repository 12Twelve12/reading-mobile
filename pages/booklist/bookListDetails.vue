<template>
	<view>
		<BookListDetails :booklists="booklists" :books="books" :is_collect="is_collect" @Collect="Collect"></BookListDetails>
		<Books :books="booklists.books" @to_bookDetails="to_bookDetails"></Books>
	</view>
</template>

<script>
	import BookListDetails from './components/details.vue'
	import Books from './components/list.vue'
	export default {
		data() {
			return {
				booklists: {},
				user:{},
				is_collect:false
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
				console.log(item.booklists)
				this.booklists = item.booklists;
				this.isCollect()
			}
			

		},
		created() {
			this.user=uni.getStorageSync('user')
			
		},
		methods: {
			to_bookDetails(index){
				uni.navigateTo({
					url:'../find/booksDetails/booksDetails?item='+ encodeURIComponent(JSON.stringify(this.booklists.books[index]))
				})
			},
			//判断是否收藏
			isCollect() {
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
							"booklistId": this.booklists.booklist.id,
							"userId": this.user.id
						},
						success: res => {
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
			Collect(){
				if(this.is_collect){
					this.delCollect()
				}else{
					this.addCollect()
				}
			},
			addCollect(){
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
						"booklistId": this.booklists.booklist.id,
						"userId": this.user.id
					},
					success: res => {
						if (res.data.success) {
							uni.showToast({
								title:'收藏成功',
								icon:'none'
							})
							this.is_collect = true
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			delCollect(){
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
						"booklistId": this.booklists.booklist.id,
						"userId": this.user.id
					},
					success: res => {
						if (res.data.success) {
							uni.showToast({
								title:'已取消收藏',
								icon:'none'
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
