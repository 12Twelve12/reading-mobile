<template>
	<view class="padding-top">
		<CardList v-bind:booklists="booklists" :mine="true" @to_details="to_details" @to_del="to_del"></CardList>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm" :title="'是否移除该书单？'"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import CardList from '../../components/cardList.vue'
	export default {
		data() {
			return {
				user:uni.getStorageSync('user'),
				booklists: [],
				type:'',//为了复用，判断点击的是我的发布还是我的收藏
				del_id:null
			}
		},
		components:{
				CardList
		},
		onLoad(val) {
			if(val){
				console.log(val.type,"++++++++++++++++++++++++++++++++")
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
			/* 长按删除 */
			to_del(id) {
				this.del_id=id
				this.$refs.popup.open()
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
			delete(){
				console.log(this.del_id,"删除书单id")
				uni.request({
					url: getApp().globalData.base_ip + 'booklist/update',
					method: 'PUT',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					data: {
						"id": this.del_id,
						"isDeleted":1
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
