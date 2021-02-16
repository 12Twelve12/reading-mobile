<template>
	<!-- 大家都在看 -->
	<view>
		<view class="flex solid-bottom padding ">
			<view class="text-xl">大家都在看</view>
		</view>
		<view class="padding bg-white card margin-top">
			<view class="flex  p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub ">
					<view class="cu-avatar round sm bg-red">1</view>
				</view>
				<view class="flex-twice ">
					<view class="cu-avatar" style="background-image:url(../../../static/logo.png);width: 68px;height: 90px;"></view>
				</view>
				<view class="flex-treble ">
					<view class="text-bold text-lg " style="padding-bottom: 40px;">书名</view>
					<view class="text-sm text-gray">作者</view>
				</view>
			</view>
			<view class="flex  p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub ">
					<view class="cu-avatar round sm bg-blue">2</view>
				</view>
				<view class="flex-twice ">
					<view class="cu-avatar" style="background-image:url(../../../static/logo.png);width: 70px;height: 91px;"></view>
				</view>
				<view class="flex-treble ">
					<view class="text-bold text-lg" style="padding-bottom: 40px;">书名</view>
					<view class="text-sm text-gray">作者</view>
				</view>
			</view>
			<view class="flex  p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub ">
					<view class="cu-avatar round sm bg-green">3</view>
				</view>
				<view class="flex-twice ">
					<view class="cu-avatar" style="background-image:url(../../../static/logo.png);width: 70px;height: 91px;"></view>
				</view>
				<view class="flex-treble ">
					<view class="text-bold text-lg" style="padding-bottom: 40px;">书名</view>
					<view class="text-sm text-gray">作者</view>
				</view>
			</view>
			<view class="flex  p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub ">
					<view class="padding text-lg text-blod">4</view>
				</view>
				<view class="flex-twice ">
					<view class="cu-avatar" style="background-image:url(../../../static/logo.png);width: 70px;height: 91px;"></view>
				</view>
				<view class="flex-treble ">
					<view class="text-bold text-lg" style="padding-bottom: 40px;">书名</view>
					<view class="text-sm text-gray">作者</view>
				</view>
			</view>
		</view>
	<!-- 	<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item" >
						<view class="cu-avatar round">1</view>
						<view class="content">
							<view class="flex">
								<view class="cu-avatar" style="background-image:url(../../../static/logo.png);width: 70px;height: 91px;"></view>
								<view class="flex-twice padding-sm margin-xs">
									<view>书名</view>
									<view class="text-sm text-gray">作者</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view> -->
</view>
		


</template>

<script>
</script>

<style scoped>
	image {
		width: 85px;
		height: 110px;
	}
	.card{
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
</style>
