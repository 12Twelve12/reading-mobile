<template>
	<view>
		<UserCard :user="user"></UserCard>
	</view>

</template>

<script>
	import UserCard from './components/userCard.vue'
	export default {
		data() {
			return {

				user: {}
			};
		},
		components: {
			UserCard
		},
		onShow() {
			this.getData();
		},
		methods: {
			getData() {
				let user = uni.getStorageSync('user')
				if (user.img != null || user.img != "") {
					this.user = user
				}
			}
		}
	}
</script>

<style>
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
