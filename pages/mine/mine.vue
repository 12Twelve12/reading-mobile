<template>
	<view>
		<UserCard :user="user"></UserCard>
		<MineList :lists="lists" @to="to"></MineList>
	</view>

</template>

<script>
	import UserCard from './components/userCard.vue'
	import MineList from './components/mineList.vue'
	export default {
		data() {
			return {

				user: {},
				//列表组件所需的数据
				lists: [{
					"icon": "cuIcon-peoplefill text-blue",
					"name": "个人信息",
					// "src": '../../static/about.png',
					"href": "../../pages/mine/personalInfo"
				},{
					"icon": "cuIcon-copy text-green",
					"name": "我的发布",
					// "src": '../../static/about.png',
					"href": "../../pages/mine/myBooklist?type=myBooklist"
				},
				{
					"icon": "cuIcon-favorfill text-yellow",
					"name": "我的收藏",
					// "src": '../../static/about.png',
					"href": "../../pages/mine/myBooklist?type=myCollect"
				}]
			};
		},
		components: {
			UserCard,
			MineList
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
			},
			/**
			 * 子组件传过来的跳转路径
			 */
			to(href) {
				// console.log(href)
				if (this.user) {
					uni.navigateTo({
						url: href
					})
				}else{
					uni.showToast({
						title:'请先登陆',
						icon:'none'
					})
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
