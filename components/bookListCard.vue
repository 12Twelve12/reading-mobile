<template>
	<view>
		<view class="cu-item" v-for="(item,index) in booklists" :key="index">
			<!--头像-->
			<view class="cu-avatar round" :style="'background-image:url('+item.user.img+');'"></view>
			<view class="content">
				<view class="text-grey">{{item.user.name}}</view>
				<view class="text-black text-content text-df">
					{{item.books.name}}
				</view>
				<view class="text-gray text-content text-sm">
					{{item.books.counts}}
				</view>
				<view class="text-black text-content text-sm">
					{{item.books.intro}}
				</view>
				<view class="padding-sm radius flex margin-top-sm text-sm booklist">
					<BookCard :lists="item.books.lists" ></BookCard>
				</view>
				<view class="margin-top-sm flex justify-between">
					<view class="text-gray text-df">{{item.books.time}}</view>
					<view>
						<text class="cuIcon-appreciatefill text-red">{{item.books.collect_counts}}</text>
						<text class="cuIcon-favor text-gray margin-left-sm">{{item.books.like_counts}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import BookCard from './bookCard.vue'
	export default {
		props: ['booklists'],
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
