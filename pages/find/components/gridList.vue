<template>
	<view class="cu-list grid bg-white" :class="['col-' + gridCol,gridBorder?'':'no-border']">
		<view class="cu-item" v-for="(item,index) in BookLists" :key="index" @click="to(index)" @longpress="to_longpress(index)">
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
			to(index) {
				this.$emit('to_read', index) //点击了那本书
			},
			to_longpress(index) {
				this.$emit('to_longpress', index)
			}
		}
	}
</script>

<style scoped>
	image {
		width: 85px;
		height: 110px;
	}
</style>
