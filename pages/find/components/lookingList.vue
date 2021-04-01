<template>
	<!-- 大家都在看 -->
	<view>
		<view class="flex solid-bottom padding ">
			<view class="text-xl">大家都在看</view>
		</view>
		<view class="padding bg-white card margin-top">
			<view class="flex  p-xs margin-bottom-sm mb-sm" v-for="(item,index) in lookingList" :key="index" @click="to_detail_looking(index)"
				v-if="index<10">
				<view class="flex-sub ">
					<view class="cu-avatar round sm " :class="bg[index]">{{index + 1}}</view>
				</view>
				<view class="flex-twice ">
					<view class="cu-avatar" :style="'background-image:url('+item.img+');width: 68px;height: 90px;'">
					</view>
				</view>
				<view class="flex-treble ">
					<view class="text-bold text-lg text-cut" style="padding-bottom: 40px;">{{item.title}}</view>
					<view class="text-sm text-gray text-cut">{{item.author}}</view>
				</view>
			</view>
			
		</view>

	</view>



</template>

<script>
	export default {
		props: ['lookingList'],
		data() {
			return {
				bg: ['bg-red', 'bg-blue', 'bg-green']
			}
		},
		methods:{
			to_detail_looking(index){
				this.$emit('to_detail_looking',index);
			}
		}
	}
</script>

<style scoped>
	image {
		width: 85px;
		height: 110px;
	}

	.card {
		border-radius: 9px;
		width: 75%;
		margin-left: 12.5%;
		box-shadow: 2px 1px 5px 1px #9e9e9e36;

	}

	.flex-twice {
		flex: 1.5;
	}

	.flex-treble {
		flex: 2;
	}

	.text-cut {
		width: 96px;
	}
</style>
