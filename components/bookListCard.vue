<template>
	<view class="cu-item">
		<!--头像-->
		<view class="cu-avatar round" :style="'background-image:url('+booklist.user.img+');'"></view>
		<view class="content">
			<view class="text-grey">{{booklist.user.name}}</view>
			<view class="text-black text-content text-df">
				{{booklist.books.name}}
			</view>
			<view class="text-gray text-content text-sm">
				{{booklist.books.counts}}
			</view>
			<view class="text-black text-content text-sm">
				{{booklist.books.intro}}
			</view>
			<view class="padding-sm radius flex margin-top-sm text-sm booklist">
				<BookCard :list="list" v-for="(list,index) in booklist.books.lists" :key="index"></BookCard>
			</view>
			<view class="margin-top-sm flex justify-between">
				<view class="text-gray text-df">{{booklist.books.time}}</view>
				<view>
					<text class="cuIcon-appreciatefill text-red">{{booklist.books.collect_counts}}</text>
					<text class="cuIcon-favor text-gray margin-left-sm">{{booklist.books.like_counts}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BookCard from './bookCard.vue'
	export default {
		props: ['booklist'],
		data() {
			return {
				// booklist: {
				// 	"user": {
				// 		"img": "",
				// 		"name": ""
				// 	},
				// 	"books": {
				// 		"name": "",
				// 		"intro": "",
				// 		"collect_counts": 0,
				// 		"like_counts": 0,
				// 		"lists": []
				// 	}
				// }
			};
		},
		components: {
			BookCard
		},
	}
</script>

<style>
	.booklist {
		background-color: #edf6ff;
	}
</style>
