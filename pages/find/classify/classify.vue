<template>
	<view class="padding-top" style="padding-top: 40px;">
		<view style="display: flex;justify-content: center;height: 60px;align-items: center" class="bg-white text-xl">
			<text>分类</text>
		</view>

		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh)">
				<view class="cu-item" :class="item.id==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect(item)"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh)">
				<view class="padding-top padding-lr">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text> {{current_classify.name}}</view>
					</view>
					<view class="cu-list grid bg-white" :class="['col-' + gridCol,gridBorder?'':'no-border']">
						<view class="cu-item" v-for="(item,index) in BookLists" :key="index" @click="to(item)">
							<view>
								<image :src="item.img"></image>
							</view>
							<view>
								<text style="color: #000000;width: 155rpx;">{{item.title}}</text>
							</view>

						</view>
					</view>

				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import GridList from '../components/gridList.vue'
	// import category from "../../../components/qiyue-category/qiyue-category.vue"
	export default {
		data() {
			return {

				list: [],
				tabCur: null, //左侧当前选中的分类
				verticalNavTop: 0,
				current_classify: {
					"id": 1,
					"name": "文学"
				}, //当前分类
				gridCol: 3, //宫格列表列数
				gridBorder: false,//公共列表数据

				//书列表数据
				BookLists: [],

			};
		},
		components: {

		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item))
			this.tabCur=item.id
			this.current_classify=item
			console.log(item)
			this.getData()
			this.getBooks()
		},

		methods: {

			TabSelect(e) {
				this.current_classify = e;
				this.getData()
				this.getBooks()
				this.tabCur = e.id;
				console.log(e.id)

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
						this.list = res.data
						this.$forceUpdate();//强制刷新，数据才会更新
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getBooks() {
				let websiteUrl = getApp().globalData.base_ip + 'book/queryByClassify?classifyId=' + this.current_classify.id;
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					success: res => {
						this.BookLists = res.data
						this.$forceUpdate();//强制刷新，数据才会更新
					},
					fail: () => {},
					complete: () => {}
				});
			},
			to(item){
				console.log(item);
				uni.navigateTo({
					url:'../booksDetails/booksDetails?item='+ encodeURIComponent(JSON.stringify(item))
				})
			}

		},


	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
		background-color: #FFFFFF;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}

	image {
		width: 122upx !important;
		height: 167upx !important;
	}
</style>
