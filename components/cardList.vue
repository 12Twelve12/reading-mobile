<template>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar comment solids-top">
					<BookListCard v-bind:booklist="item" v-for="(item,index) in booklists" :key="index"></BookListCard>
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
	}
</script>

<style>

</style>
