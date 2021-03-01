<template>
	<view class="cu-list menu-avatar">
		<view class="cu-item" v-for="(item,index) in books" :key="index" @click="to(index)">
			<view class="cu-avatar lg" :style="'background-image:url('+item.img+');'"></view>
			<view class="content">
				<view class="flex">
					<view class="text-black text-bold text-cut">{{item.title}}</view>
				</view>
				<view class="text-gray text-sm flex">
					<text>{{item.author}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['books'],
		data() {
			return {

			};
		},
		components: {

		},
		methods: {


			to(index) {
				this.$emit('to_bookDetails', index)
			}


		}
	}
</script>

<style>
</style>
