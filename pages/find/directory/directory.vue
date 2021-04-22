<template>
	<view class="padding-top">
		<view class="flex justify-between padding">
			<view class="text-gray">目录</view>
			<view class="text-gray">共{{chapter.count}}章</view>
		</view>
		<!--章节列表-->
		<view class="cu-list menu bg-white">
			<view class="cu-item" v-for="(item,index) in chapter.data" :key="index" @click="read(index)">
				<view class="content" :class="current_progress==index?'text-orange':''">
					{{item.directory_title}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"detail":{},
				"chapter":{},
				"current_progress":-1,
				"isBookShelf":false
			}
		},
		//接受参数
		onLoad: function(option) {
		
			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				this.detail = item.detail
				this.chapter=item.chapter
				this.current_progress=item.current_progress
				this.isBookShelf=item.isBookShelf
			}
		
		},
		methods: {
			//进入阅读界面
			read(index) {
				this.current_progress=index
				uni.navigateTo({
					url: '../booksDetails/read?item=' + encodeURIComponent(JSON.stringify({
						"detail": this.detail,
						"chapter": this.chapter,
						"current_progress": this.current_progress,
						"isBookShelf": this.isBookShelf //是否存在书架中（前提是已经登陆）
					}))
				})
			},
		}
	}
</script>

<style scoped >
	.padding-top {
		padding-top: 40px;
	}
</style>
