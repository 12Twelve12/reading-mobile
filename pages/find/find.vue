<template>
	<view class="back">
		<view class="top_back flex justify-start">
			<view class="text-xxl top_text">找书</view>
			<view class="cu-form-group search">
				<input placeholder="搜索 书名|作者" name="input"></input>
				<text class='cuIcon-search text-green'></text>
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="flex solid-bottom padding justify-between">
			<view class="text-xl">随便看看</view>
			<view class="text-sm text-orange">换一换<text class='cuIcon-refresh padding-sm text-orange'></text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridCol: 4,
				gridBorder: false,
				cuIconList: [{
					cuIcon: 'discover',
					color: 'red',
					badge: 0,
					name: '世界名著'
				}, {
					cuIcon: 'read',
					color: 'orange',
					badge: 0,
					name: '小说'
				}, {
					cuIcon: 'form',
					color: 'yellow',
					badge: 0,
					name: '文学'
				}, {
					cuIcon: 'cascades',
					color: 'olive',
					badge: 0,
					name: '更多'
				}],
			}
		},

		methods: {}
	}
</script>

<style>
	.top_back {
		width: 100%;
		padding: 15px;
	}

	.top_text {
		align-self: center;
		width: 17%;
		color: #517E69;
	}

	.back {
		background-color: #FFFFFF;
		height: 100%;
	}

	.search {
		border: 0.1px solid #FDFEF6;
		border-radius: 50upx;
		padding-left: 1;
		width: 83%;
		background-color: #FDFEF6;
	}
</style>
