<template>
	<view class="cu-list grid bg-white" :class="['col-' + gridCol,gridBorder?'':'no-border']">
		<view class="cu-item" v-for="(item,index) in BookLists" :key="index" @click="to(item.href)">
			<view>
				<!-- <image style="width:70px; height: 100px; background-color: #eeeeee;" :src="item.src" @error="imageError"></image> -->
				<image :src="item.img"></image>
			</view>
			<text style="color: #000000;">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['BookLists'],
		data() {
			return {
				gridCol: 3, //宫格列表列数
				gridBorder: false,
				//公共列表数据

			};
		},
		methods: {
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			to(href) {
				console.log("发电");
				uni.navigateTo({
					url: href
				});
			}
		}
	}
</script>

<style>
	image {
		width: 85px;
		height: 110px;
	}
</style>
