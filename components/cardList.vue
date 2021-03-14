<template>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar comment solids-top">
					<view v-if="booklists.length==0" class="text-center text-gray">
						暂无数据~
					</view>
					<view class="cu-item" v-else v-for="(item,index) in booklists" :key="index" @click="to_details(index)">
						<!--头像-->
						<view class="cu-avatar round" :style="'background-image:url('+item.booklist.img+');'"></view>
						<view class="content">
							<view class="text-grey">{{item.booklist.nickname}}</view>
							<view class="text-black text-content text-df">
								{{item.booklist.name}}
							</view>
							<view class="text-gray text-content text-sm">
								共{{item.books.length}}本
							</view>
							<view class="text-black text-content text-sm">
								{{item.booklist.des}}
							</view>
							<view class="padding-sm radius flex margin-top-sm text-sm booklist">
								<view class="padding-sm radius text-sm bookcard" v-for="(list,index) in item.books" :key="index" v-if="index<4">
									<image :src="list.img" style="width: 90upx;height: 135upx;" v-if="index<4"></image>
									<view class="text-cut" style="width: 38px;"> {{list.title}}</view>
									
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">{{item.booklist.time}}</view>
								<view>
									<!-- <text class="cuIcon-appreciatefill text-red">{{item.booklist.collect_counts}}</text>
									<text class="cuIcon-favor text-gray margin-left-sm">{{item.booklist.like_counts}}</text> -->
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
		methods:{
			to_details(index){
				this.$emit('to_details',index)
			}
			
		}
	}
</script>

<style>

</style>
