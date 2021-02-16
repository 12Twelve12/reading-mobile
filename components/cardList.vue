<template>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item" v-for="(item,index) in booklists" :key="index">
						<!--头像-->
						<view class="cu-avatar round" :style="'background-image:url('+item.user.img+');'"></view>
						<view class="content">
							<view class="text-grey">{{item.user.name}}</view>
							<view class="text-black text-content text-df">
								{{item.books.name}}
							</view>
							<view class="text-gray text-content text-sm">
								共{{item.books.collect_counts}}本
							</view>
							<view class="text-black text-content text-sm">
								{{item.books.intro}}
							</view>
							<view class="padding-sm radius flex margin-top-sm text-sm booklist">
								<view class="padding-sm radius text-sm bookcard" v-for="(list,index) in item.books.lists" :key="index">
									<image :src="list.img" style="width: 90upx;height: 135upx;"></image>
									{{list.name}}
								</view>
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
			</view>
		</view>
</template>

<script>
	import BookListCard from './bookListCard.vue'
	export default {
		props:['booklists'],
		data() {
			return {
				
			};
		},
		components: {
			BookListCard
		},
	}
</script>

<style>

</style>
