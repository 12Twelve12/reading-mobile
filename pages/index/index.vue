<template>

	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="cu-item" :class="index==TabCur?'text-cyan cur':''" v-for="(item,index) in tabSelects" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item}}
			</view>
			<text class="cuIcon-search text-gray search"></text>
		</scroll-view>
		<view v-if="TabCur==0">
			<CardList v-bind:booklists="booklists"></CardList>
		</view>
		<view v-if="TabCur==1">
			最新
		</view>
	</view>

</template>

<script>
	import CardList from '../../components/cardList.vue'
	export default {
		data() {
			return {
				TabCur: 0,
				tabSelects: ["推荐", "最新"],
				booklists: []
			}
		},
		components: {
			CardList
		},
		created() {
			this.getData()
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			getData() {
				let booklists = [{
						"user": {
							"img": "https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png",
							"name": "用户名1"
						},
						"books": {
							"name": "书单名1",
							"intro": "简介1",
							"collect_counts": 6,
							"like_counts": 6,
							"time": "2018年12月4日",
							"lists": [{
									"img": "../../static/logo.png",
									"name": "cc1"
								},
								{
									"img": "../../static/logo.png",
									"name": "cc2"
								},
								{
									"img": "../../static/logo.png",
									"name": "cc3"
								},
								{
									"img": "../../static/logo.png",
									"name": "cc4"
								}
							]
						}
					},
					{
						"user": {
							"img": "https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png",
							"name": "用户名2"
						},
						"books": {
							"name": "书单名2",
							"intro": "简介2",
							"collect_counts": 8,
							"like_counts": 5,
							"time": "2018年12月5日",
							"lists": [{
									"img": "../../static/logo.png",
									"name": "cc1"
								},
								{
									"img": "../../static/logo.png",
									"name": "cc2"
								}
							]
						}
					}
				];
				this.booklists = booklists;
			}
		}
	}
</script>

<style>
	.search {
		position: absolute;
		top: 32%;
		right: 20px;
	}

	.booklist {
		background-color: #edf6ff;
	}
</style>
