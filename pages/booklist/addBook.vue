<template>
	<view class="bg-white padding-top" style="height: -webkit-fill-available;">
		<text class="cu-tag round line-green text-lg text-green add_cover padding-bottom"
		style="position: relative;left: 38%;width: min-content;margin-bottom: 12px;" @click="submit">确定</text>
		<!-- 搜索框 -->
		<view class="cu-form-group search">
			<input placeholder="搜索书籍 书名|作者" name="input" v-model="str" @input="input()"></input>
			<text class='cuIcon-search text-green'></text>
		</view>
		<!-- 书架中的书 -->
		<view class="padding" v-show="!hidden">
			<text class="text-gray">我的书架</text>
		</view>
		<view class="cu-list grid bg-white" :class="['col-' + gridCol,gridBorder?'':'no-border']" v-show="!hidden">
			<view class="cu-item" v-for="(item,index) in BookLists" :key="index" @click="checkedItem(index)">
				<view>
					<!-- <image style="width:70px; height: 100px; background-color: #eeeeee;" :src="item.src" @error="imageError"></image> -->
					<image :src="item.img" :class="item.status==0?'':'select'"></image>
				</view>
				<text style="color: #000000;">{{item.title}}</text>
			</view>
		</view>
		<!-- 搜索的图书列表 -->
		<view v-show="hidden">
			<!-- 已经选择的图书 -->
			<text class="text-gray padding">已选{{select_books.length}}本</text>
			<view class="cu-list grid bg-white" :class="['col-' + selectGridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in select_books" :key="index">
					<text class="cuIcon-roundclosefill" style="left: 23px;top: 7px; z-index: 100;color: #007AFF;" @click="delSelect(index)"></text>
					<view>
						<!-- <image style="width:70px; height: 100px; background-color: #eeeeee;" :src="item.src" @error="imageError"></image> -->
						<image :src="item.img" style="width: 42px;height: 61px;"></image>
					</view>
					<text style="color: #000000;" class="text-cut">{{item.title}}</text>
				</view>
			</view>
			<!-- 搜索出的图书列表 -->
			<text class="text-gray padding" style="text-align: center;display: block;" v-if="Books.length==0">暂无图书</text>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in Books" :key="index" @click="checkedBooksItem(index)">
					<view class="cu-avatar lg" :style="'background-image:url('+item.img+');'"></view>
					<view class="content">
						<view class="flex">
							<view class="text-black text-bold text-cut">{{item.title}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<text>{{item.author}}</text>
						</view>
					</view>
					<text class="padding text-green text-lg" :class="item.status==0?'cuIcon-round':'cuIcon-roundcheckfill'"></text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridCol: 3, //宫格列表列数
				gridBorder: false,
				//公共列表数据
				BookLists: [], //书架中的书籍列表
				user: {},
				hidden: false, //隐藏我的书架
				str: '', //搜索的关键字
				Books: [], //查询后返回的书籍
				// select_num:0,
				select_books: [],
				selectGridCol: 5, //宫格列表列数
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('user')
			this.getData()
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
								let BookLists = []
								for (let i = 0; i < res.data.data.length; i++) {
									BookLists.push({
										"id": res.data.data[i].id,
										"img": res.data.data[i].img,
										"title": res.data.data[i].title,
										"status": 0
									})
								}
								this.BookLists = BookLists
								console.log(this.BookLists)
							}


						},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			//选中图片
			checkedItem(index) {
				if (this.BookLists[index].status == 1) {
					this.BookLists[index].status = 0;
					for(let i=0;i<this.select_books.length;i++){
						if(this.BookLists[index]==this.select_books[i]){
							this.delSelect(i)
						}
					}
				} else {
					this.BookLists[index].status = 1;
					this.select_books.push(this.BookLists[index])
				}
			},
			checkedBooksItem(index) {
				if (this.Books[index].status == 1) {
					this.Books[index].status = 0;
					for(let i=0;i<this.select_books.length;i++){
						if(this.Books[index]==this.select_books[i]){
							this.delSelect(i)
						}
					}
				} else {
					this.Books[index].status = 1;
					this.select_books.push(this.Books[index])
				}
			},
			delSelect(index){
				console.log(index)
				this.select_books.splice(index,1)
				console.log(this.select_books)
				// for(let i=0;i<this.BookLists.length;i++){
				// 	if(this.select_books[index]==this.BookLists[i]){
				// 		this.BookLists[i].status==0
				// 	}
				// }
				// for(let i=0;i<this.Books.length;i++){
				// 	if(this.select_books[index]==this.Books[i]){
				// 		this.Books[i].status==0
				// 	}
				// }
			},
			input() {
				if (this.str.length == 0) {
					this.hidden = false
				} else {
					this.hidden = true
					this.Books = []
					let websiteUrl = getApp().globalData.base_ip + 'book/queryByLike';
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
							"str": this.str
						},
						success: res => {
							if (res.data.data) {
								let Books = []
								for (let i = 0; i < res.data.data.length; i++) {
									Books.push({
										"id": res.data.data[i].id,
										"img": res.data.data[i].img,
										"title": res.data.data[i].title,
										"author": res.data.data[i].author,
										"status": 0
									})
								}
								this.Books = Books
								console.log(this.Books)
							}


						},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			submit(){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.books = this.select_books;   //修改上一页data里面的searchVal参数值为1211
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.search {
		border: 0.1px solid #FDFEF6;
		border-radius: 50upx;
		padding-left: 1;
		width: 90%;
		background-color: #f8f8f8;
		margin-top: 30px;
		margin: auto;
	}

	.padding-top {
		padding-top: 40px;
	}

	image {
		width: 85px;
		height: 110px;
	}

	.select {
		border: 2px solid #4CD964;
	}

	[class*="cuIcon-"] {
		font-size: large;
	}
	.add_cover {
		margin: 0 auto;
		display: block;
	}
</style>
