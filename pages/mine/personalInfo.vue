<template>
	<!-- 个人信息 -->
	<view style="padding-top: 100upx;" class="bg-white">
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="content" @click="updateHeadImg()">
					<text class="text-grey">头像</text>
				</view>
				<view class="action" @click="ViewImage">
					<!-- <img class="cu-avatar lg" v-if="headImg" :src="headImg" style="width:45px;height:45px"> -->
					<view class="cu-avatar lg" :style="'background-image:url('+user.img+');'"></view>
					<!-- <view class="cu-avatar lg" :style="'background-image:url('+imgUrl+');'"></view> -->
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-grey">昵称</text>
				</view>
				<view class="action">
					<text>{{user.nickname}}</text>
				</view>
			</view>
			<view class="cu-item arrow"
			 @click="to('updateInfo?update_object=phone&update_title=更改手机号&update_title1=手机号&update_value='+user.phone)">
				<view class="content">
					<text class="text-grey">手机</text>
				</view>
				<view class="action">
					<text :class="user.phone?'':'text-red'">{{user.phone?user.phone:'未完善'}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="to('updateInfo?update_object=mail&update_title=更改邮箱&update_title1=邮箱&update_value='+user.mail)">
				<view class="content">
					<text class="text-grey">邮箱</text>
				</view>
				<view class="action">
					<text>{{user.mail}}</text>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				user: {},
				headImg: '',
				email: '', //如果是未完善状态就显示红色的"未完善"
				//用于修改用户类型
				index: -1,

			};
		},
		components: {

		},
		onShow() {
			this.getData();
		},
		methods: {
			getData() {
				this.user = uni.getStorageSync('user')
				console.log(this.user)
			},
			
			/* 跳转除了工具栏页面 */
			to(href) {
				uni.navigateTo({
					url: href
				})


			},
			/**
			 * 修改头像
			 */
			updateHeadImg() {

				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths; //拿到选择图片的路径
						console.log(tempFilePaths);
						let websiteUrl = getApp().globalData.base_ip + 'booklist/upload';
						uni.uploadFile({
							url: websiteUrl, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							'content-type': 'application/x-www-form-urlencoded',
							success: (res) => {

								let result = JSON.parse(res.data)
								this.user.img = result.data.src
								this.update()
							}
						});
					}
				});



			},
			//图片显示
			ViewImage(e) {
				let url = this.user.img;
				let urls = [];
				urls.push(url);
				uni.previewImage({
					urls: urls,
					current: e.currentTarget.dataset.url
				});
			},

			//修改信息
			update() {
				let websiteUrl = getApp().globalData.base_ip + 'users/update';
				uni.request({
					url: websiteUrl,
					method: 'PUT',
					header: {
						// 'Content-Type': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded'

						// token : uni.getStorageSync("TOKEN")
					},
					dataType: 'json',
					data:this.user,
					success: res => {
						if (res.data.code == 0) {
							uni.setStorageSync('user', this.user)
							uni.navigateBack({
								
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}

	}
</script>

<style>
	image {
		display: block;
	}

	picker {
		width: 200px;
		text-align: right;
	}
</style>


<!-- <template>
	<view>
		<UserCard :user="user"></UserCard>
		<MineList :lists="lists"></MineList>
	</view>
</template>

<script>
	import MineList from './components/mineList.vue'
	import UserCard from './components/userCard.vue'
	export default {
		data() {
			return {
				lists:[
					{"icon":"","name":"个人信息","href":""},
					{"icon":"","name":"企业信息","href":""},
					{"icon":"","name":"用电历史记录","href":""},
					{"icon":"","name":"设备监控","href":""},
					{"icon":"","name":"设备维护记录","href":""},
					{"icon":"","name":"缴费记录","href":""},
					{"icon":"","name":"合同信息","href":""},
					{"icon":"","name":"投诉建议","href":""},
					{"icon":"","name":"关于我们","href":""},
				],
				user:{}
			};
		},
		components:{
			MineList,
			UserCard
		},
		created() {
			this.getData()
		},
		methods:{
			getData(){
				let user={"img":"static/logo.png","username":"twelve"}
				if(user!=null){
					this.user=user
				}
			}
		}
	
	}
</script>

<style>
</style>
 -->
