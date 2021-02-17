<template>
	<view class="zai-read-box skin" :class="skinValue">
		<!--封面层-->
		<view class="zai-read-cover-box"  :class="coverShow?'show':''">
			<view class="zai-read-cover" :style="{transform: `translateX(${coverInfo.translate + coverInfo.move}px)`, transition: `all ${animationSeconds}s ease`}">
				<view class="zai-cover-v">
					<text class="zai-cover-cor"></text>
					<text class="zai-cover-cor"></text>
					<text class="zai-cover-cor"></text>
					<text class="zai-cover-cor"></text>
					<view class="zai-cover-info">
						<view class="zai-cover-figure">
							<image :src="BookData.img" mode="widthFix" class="zai-cover-img"></image>
						</view>
						<view class="zai-cover-title">{{BookData.title}}</view>
						<view class="zai-cover-author">{{BookData.author}} 著</view>


					</view>

					<view class="zai-cover-copy">
						<view class="ell">本书的所有内容抓取自免费小说网站</view>
						<view class="text-gray">©版权所有 请支持正版</view>
					</view>
				</view>
				<view class="zai-cover-h" @click="coverClick"></view>
			</view>
		</view>

		<!--阅读层-->
		<view class="zai-read " :class="layoutValue">
			<view class='zai-content'>
				<view class="zai-article">
					<text class="text-bold">{{chapterCurrent.detail.directory_title?chapterCurrent.detail.directory_title:''}}</text>
					<view class="zai-section" id='readerBook' :style="{transform: `translateX(${translateX + move}px)`, transition: `all ${animationSeconds}s ease`, fontSize: `${fontSize}rem`}"
					 v-html="ReadContent"></view>
				</view>
			</view>

			<view class="zai-hover-box" v-if="layoutValue == 'V'" @click="onCenter"></view>
		</view>

		<!--操作层-->
		<view class="zai-opt-box" :class="optShow?'show':''">

			<!--底层空白层-->
			<view class="zai-off-hover" @click="onToEnd"></view>

			<!--底部操作层-->
			<view class="cu-bar tabbar bg-black zai-opt-footer">
				<view class="action text-gray" @click="asideClick">
					<view class="cuIcon-sort"></view>
					<view>目录</view>
				</view>
				<view class="action text-gray" @click="optBotClick">
					<view class="cuIcon-read"></view>
					<view>章节</view>
				</view>
				<view class="action text-gray" @click="optSetClick">
					<view class="cuIcon-wenzi"></view>
					<view>设置</view>
				</view>
			</view>

			<!--章节层-->
			<view class="cu-bar bg-black zai-opt-bot" :class="optBotShow?'show':''">
				<view class="action" :class="chapterCurrent.index == 0 ?'text-gray':''" @click="previousReadClick">
					<text class="cuIcon-back"></text>
					<text>上一章</text>
				</view>
				<view class="content text-bold">{{BookData.name}}</view>
				<view class="action" :class="chapterCurrent.index == BookList.count-1 ?'text-gray':''" @click="nexReadClick">
					<text>下一章</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>

			<!--设置层-->
			<view class="bg-black zai-opt-bot" :class="optSetShow?'show':''">

				<!--字体大小层-->
				<view class="cu-bar solid-bottom">
					<view class="action" @click="fontSizeMove">
						<text class="cuIcon-move"></text>
					</view>
					<view class="content" style="width: calc(100% - 182rpx); pointer-events: all;">
						<slider :value="fontSizeSlider" activeColor="#f37b1d" backgroundColor="#464646" block-color="#f37b1d" block-size="12"
						 min="1" max="8" @change="fontSizeChange" @changing="fontSizeChange" />
					</view>
					<view class="action" @click="fontSizeAdd">
						<text class="cuIcon-add"></text>
					</view>
				</view>

				<!--样式层-->
				<view class="grid col-5 padding-sm solid-bottom">
					<view class="padding-xs" v-for="(item,index) in skinData" :key="index">
						<button class="cu-btn block line-orange text-xl text-bold btn-skin" :class="item.key" v-if="item.checked">
							<text class="cuIcon-check text-orange"></text>
						</button>
						<button class="cu-btn block btn-skin" @tap="skinCheckbox(index,item.key)" :class="item.key" v-else></button>
					</view>
				</view>

			</view>

		</view>

		<!--章节目录层-->
		<view class="zai-aside" :class="asideShow?'show':''">
			<!--底层空白层-->
			<view class="zai-off-hover" @click="asideShow = false"></view>

			<!--目录层-->
			<view class="zai-aside-content">
				<view class="bg-white text-orange text-center padding zai-nav-title">章节目录</view>

				<view class="zai-chapter-tab-x">
					<view class="cu-bar bg-white">
						<view class="action">
							<text>共{{BookList.count}}章</text>
						</view>
					</view>
					<view class="cu-bar zai-title-f">
						<view class="action">
							<text class="text-sm">正文卷</text>
						</view>
					</view>
					<!--章节列表-->
					<view class="cu-list menu bg-white">
						<view class="cu-item" v-for="(item,index) in BookList.data" :key="index" @click="details(index)">
							<view class="content" :class="chapterCurrent.index==index?'text-orange':''">
								{{item.directory_title}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageTotal: 0,
				pageCurrent: 0,
				translateX: 0,
				startPoint: 0,
				move: 0,
				animationSeconds: 0.3,
				fontSize: 1,
				clearance: 16,
				optShow: false,
				asideShow: false,
				optBotShow: false,
				optSetShow: false,
				order: '倒序',
				listData: [],
				fontSizeSlider: 2,
				skinData: [],
				skinValue: 'default',
				layoutData: [],
				layoutValue: 'V',//滑动方式，上下滑动
				domInfo: {},
				coverShow: true,
				BookData: {}, //书的基本信息
				coverInfo: {
					startPoint: 0,
					move: 0,
					translate: 0
				},
				ReadContent: '',
				BookList: {},//书的章节信息
				chapterCurrent:{},//当前章节
				BookInfo: {},
				addBtn: true,
			}
		},
		onLoad(option) { //接受参数
			if (option) {
				const item = JSON.parse(decodeURIComponent(option.item));
				this.BookData = item.detail
				this.BookList = item.chapter
				this.iniGetBookInfo();

			}

			this.skinData = [{
					key: 'default',
					checked: true
				}, {
					key: 'blue',
					checked: false
				},
				{
					key: 'green',
					checked: false
				}, {
					key: 'light',
					checked: false
				},
				{
					key: 'night',
					checked: false
				}
			];
			this.layoutData = [{
				key: 'V',
				name: '上下滑动',
				checked: false
			}];
		},
		onReady() {

		},
		
		methods: {
			//获取初始的书籍信息
			iniGetBookInfo() {

				if (this.BookData.index > 1 || this.BookData.page > 1) {
					//封面
					this.coverShow = false;
				}
				//获取书籍内容
				this.details(0)
			},
			/* 上一章 */
			previousReadClick() {
				if(this.chapterCurrent.index==0){
					this.coverShow=true
					uni.showToast({
						title:'已经是第一章'
					})
				}else{
					this.details(this.chapterCurrent.index-1)
					this.optShow=false
					/* 回到顶部 */
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: 300
					});
				
				}
				console.log("点击上一章")
			},
			/* 下一章 */
			nexReadClick() {
				if(this.chapterCurrent.index==this.BookList.count-1){
					uni.showToast({
						title:'没有更多了'
					})
				}else{
					this.details(this.chapterCurrent.index+1)
					this.optShow=false
					/* 回到顶部 */
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: 300
					});
					
				}
				console.log("点击下一章")
			},
			
			/**获取当前章节
			 * @param {Object} item当前章节信息
			 */
			details(index) {
				console.log("点击哪一章"+index)
				console.log(this.BookList.data[index])
				this.chapterCurrent={"detail":this.BookList.data[index],"index":index}
				this.GetReadContent()
				this.asideShow=false
				this.optShow=false
				/* 回到顶部 */
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
				
			},
			
			//获取书的内容
			GetReadContent() {
				let websiteUrl = this.chapterCurrent.detail.directory_url[0]
				// console.log(websiteUrl)
				uni.request({
					url: websiteUrl,
					method: 'GET',
					header: {
						'Content-Type': 'application/json',
						// token : uni.getStorageSync("TOKEN")
					},
					// timeout: 10000,
					dataType: 'html',
					success: res => {
						console.log(res.data);
						var htmls=res.data						
						var content1;
						content1=htmls.split('#footid')
						console.log("截取的数据");					
						var content2=content1[1].split('供读书爱好者学习交流之用')
						console.log(content2)
						var content3=content2[0].split('</div>')
						console.log(content3[1]);
						//去除掉横线后面的东西
						var content4=content3[1].split('<hr')
						this.ReadContent=content4[0]
					},
					fail: () => {},
					complete: () => {}
				});
			},

			
			coverClick() {
				this.calculateCoverTranslate('click');
			},
			calculateCoverTranslate(sort) {
				if (sort == 'left' || sort == 'click') {
					this.coverInfo.translate = -(this.domInfo.offsetWidth + this.clearance);
				} else if (sort == 'right') {
					this.coverInfo.translate = this.domInfo.offsetWidth + this.clearance;
				}
				setTimeout(() => {
					this.coverShow = false;
				}, 300);
			},
			
			onToEnd() {
				this.optShow = false;
				this.optBotShow = false;
				this.asideShow = false;
				this.optSetShow = false;
			},
			onCenter() {
				this.optShow = true;
			},
			asideClick() {
				this.optBotShow = false;
				this.optSetShow = false;
				if (this.asideShow == true) {
					this.asideShow = false;
				} else {
					this.asideShow = true;
				}
			},
			optBotClick() {
				this.asideShow = false;
				this.optSetShow = false;
				if (this.optBotShow == true) {
					this.optBotShow = false;
				} else {
					this.optBotShow = true;
				}
			},
			optSetClick() {
				this.optBotShow = false;
				this.asideShow = false;
				if (this.optSetShow == true) {
					this.optSetShow = false;
				} else {
					this.optSetShow = true;
				}
			},
			fontSizeMove() {
				let Size = this.fontSizeSlider;
				if (Size > 1) {
					let num = Size - 1;
					this.fontSizeSlider = num;
					this.SetFontSize(num);
				}
			},
			fontSizeAdd() {
				let Size = this.fontSizeSlider;
				if (Size < 8) {
					let num = Size + 1;
					this.fontSizeSlider = num;
					this.SetFontSize(num);
				}
			},
			fontSizeChange(e) {
				let num = e.detail.value;
				this.SetFontSize(num);
			},
			SetFontSize(num) {
				if (num == 1) {
					this.fontSize = 0.875;
				} else if (num == 2) {
					this.fontSize = 1;
				} else if (num == 3) {
					this.fontSize = 1.125;
				} else if (num == 4) {
					this.fontSize = 1.25;
				} else if (num == 5) {
					this.fontSize = 1.375;
				} else if (num == 6) {
					this.fontSize = 1.5;
				} else if (num == 7) {
					this.fontSize = 1.625;
				} else if (num == 8) {
					this.fontSize = 1.75;
				}
			},
			skinCheckbox(index, key) {
				let items = this.skinData;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					this.skinData[i].checked = false;
				}
				this.skinData[index].checked = true;
				this.skinValue = key;

				if (key == 'default') {
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#c4b395'
					});
				} else if (key == 'blue') {
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#cad9e8'
					});
				} else if (key == 'green') {
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#d1edd1'
					});
				} else if (key == 'light') {
					uni.setNavigationBarColor({
						frontColor: '#000000',
						backgroundColor: '#e6e6e6'
					});
				} else if (key == 'night') {
					uni.setNavigationBarColor({
						frontColor: '#ffffff',
						backgroundColor: '#1a1a1a'
					});
				}
			},
		
			
		}
	}
</script>

<style lang="less">
	.zai-read-cover-box,
	.zai-read-cover,
	.zai-aside,
	.H,
	.zai-opt-box,
	.zai-off-hover {
		position: fixed;
		top: 0;
		left: 0;
	}

	.zai-read-box,
	.zai-read-box,
	.zai-read-cover,
	.H,
	.zai-opt-box,
	.zai-off-hover {
		width: 100%;
		height: 100%;
	}

	.zai-off-hover,
	.zai-aside-content,
	.zai-chapter-tab-x {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.zai-read-box {
		position: relative;

		.zai-read-cover-box {
			z-index: 9999;
			display: none;
		}

		.zai-read-cover-box.show {
			display: block;
		}

		.zai-read-cover {
			z-index: 999;
			box-shadow: 0 0 19rpx rgba(0, 0, 0, .2);
			color: rgba(0, 0, 0, .85);
			transition: transform .25s, opacity .25s;

			.zai-cover-v {
				position: absolute;
				top: 29rpx;
				right: 39rpx;
				bottom: 29rpx;
				left: 39rpx;
				text-align: center;
				white-space: nowrap;
				border-top: 2rpx solid rgba(0, 0, 0, .2);
				border-bottom: 2rpx solid rgba(0, 0, 0, .2);

				&::after {
					display: inline-block;
					height: 80%;
					content: '';
					vertical-align: middle;
				}

				.zai-cover-cor {
					position: absolute;
					width: 19rpx;
					height: 19rpx;
					text-align: left;

					&:nth-of-type(1) {
						top: -2rpx;
						left: -10rpx;
					}

					&:nth-of-type(2) {
						top: -2rpx;
						right: -10rpx;
						transform: scaleX(-1);
					}

					&:nth-of-type(3) {
						right: -10rpx;
						bottom: -2rpx;
						transform: scale(-1, -1);
					}

					&:nth-of-type(4) {
						bottom: -2rpx;
						left: -10rpx;
						transform: scaleY(-1);
					}

					&::after,
					&::before {
						position: absolute;
						content: '';
						border: 2rpx solid rgba(0, 0, 0, .2);
					}

					&::before {
						width: 10rpx;
						height: 10rpx;
						border-width: 0 2rpx 2rpx 0;
					}

					&::after {
						top: 10rpx;
						left: 10rpx;
						width: 6rpx;
						height: 6rpx;
						border-radius: 0 2rpx 2rpx 2rpx;
					}
				}

				.zai-cover-info {
					display: inline-block;
					width: 100%;
					vertical-align: middle;
					line-height: 1.5;

					.zai-cover-figure {
						display: inline-block;
						padding: 6rpx;
						border: 2rpx solid #efece5;
						background-color: #fcfcfa;

						.zai-cover-img {
							display: block;
							width: 5.625rem;
							height: 7.5rem;
							filter: grayscale(100%);
						}
					}

					.zai-cover-title {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size: 1.4rem;
						font-weight: 700;
					}

					.zai-cover-author {
						color: rgba(0, 0, 0, .4);
						font-size: 0.8rem;
					}

					.zai-cover-data {
						margin-top: 3.25rem;

						.action {
							line-height: 1.5;
							font-size: 34rpx;

							.title {
								font-weight: bold;
							}

							.text-gray {
								color: rgba(0, 0, 0, .4);
								font-size: 0.8rem;
							}
						}
					}
				}

				.zai-cover-copy {
					font-size: 0.7rem;
					position: absolute;
					right: 0;
					bottom: 1.3125rem;
					left: 0;
					line-height: 1.5;

					.ell {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.text-gray {
						color: rgba(0, 0, 0, .4);
					}
				}
			}

			.zai-cover-h {
				position: absolute;
				top: 39rpx;
				right: 29rpx;
				bottom: 39rpx;
				left: 29rpx;
				border-right: 2rpx solid rgba(0, 0, 0, .2);
				border-left: 2rpx solid rgba(0, 0, 0, .2);
			}
		}

		.zai-aside {
			right: 0;
			bottom: 0;
			z-index: 3;
			overflow: hidden;
			visibility: hidden;
			transition: visibility .25s;

			.zai-off-hover {
				transition: opacity .25s;
				background-color: #000;
				opacity: 0;
			}

			.zai-aside-content {
				left: 5.5rem;
				color: #969ba3;
				transition: transform .15s;
				transform: translateX(100%);
				background-color: #f6f7f9;

				.zai-nav-title {
					border-bottom: 2rpx solid #f37b1d;
					z-index: 9;
				}

				.zai-chapter-tab-x {
					top: 2.6rem;
					overflow: auto;

					.zai-title-f {
						min-height: 65rpx;
					}
				}
			}
		}
	}

	.zai-aside.show {
		visibility: visible;
		transition: none;

		.zai-off-hover {
			opacity: .6;
		}

		.zai-aside-content {
			transform: translate(0, 0);
		}
	}

	.skin.default {

		.zai-read-cover,
		.zai-read {
			background: url(../../../static/images/skin-default-t.jpg) no-repeat center top,
				url(../../../static/images/skin-default-b.jpg) no-repeat center bottom,
				url(../../../static/images/skin-default-m.jpg) repeat-y center 217rpx;
			background-size: 100%;
			color: rgba(0, 0, 0, .85);
		}
	}

	.skin.blue {

		.zai-read-cover,
		.zai-read {
			background: #cad9e8;
		}
	}

	.skin.green {

		.zai-read-cover,
		.zai-read {
			background: #d1edd1;
		}
	}

	.skin.light {

		.zai-read-cover,
		.zai-read {
			background: #e6e6e6;
		}
	}

	.skin.night {

		.zai-read-cover,
		.zai-read {
			background: #1a1a1a;
			color: rgba(255, 255, 255, .5);
		}
	}

	.zai-read {
		.zai-content {
			.zai-article {
				font-size: 1rem;
				line-height: 1.8;
				overflow: hidden;
				min-height: calc(100vh - 79rpx);
				margin: 0 29rpx;
				text-align: justify;

				.zai-section {
					overflow: hidden;
					min-height: inherit;
				}
			}
		}

		.zai-page-num {
			position: absolute;
			bottom: 20rpx;
			left: 30rpx;
			color: rgba(0, 0, 0, .4);
		}

		.zai-hover-box {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.flex-wrap {
				height: 100%;

				.zai-hover-left {
					height: 100%;
				}

				.zai-hover-centre {
					height: 100%;
				}

				.zai-hover-right {
					height: 100%;
				}
			}
		}
	}

	.V {
		padding: 0.5rem 0;
	}

	.H {
		.zai-content {
			position: absolute;
			top: 0.5rem;
			bottom: 1rem;
			overflow: hidden;
			width: 100%;
			border-top: 0;

			.zai-article {
				height: 100%;
				min-height: 100%;

				.zai-section {
					overflow: visible;
					height: 100%;
					columns: calc(100vw - 55rpx) 1;
					column-gap: 29rpx;
				}
			}
		}
	}

	.zai-opt-box {
		visibility: hidden;
		transition: opacity .15s, visibility .15s;
		opacity: 0;
		z-index: 2;

		.zai-join-book {
			position: absolute;
			top: 1rem;
			right: 0;
			font-size: 0.7rem;
			line-height: 2rem;
			padding: 0 .5rem 0 .75rem;
			transition: color .15s, transform .15s;
			transform: translateX(100%);
			border-radius: 3rem 0 0 3rem;
		}

		.zai-opt-footer {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			transform: translateY(100%);
			transition: opacity .15s, transform .15s, visibility .15s;
			border-bottom: 0;
		}

		.zai-opt-bot {
			position: absolute;
			right: 0;
			bottom: 100rpx;
			left: 0;
			visibility: hidden;
			transform: translateY(.5px);
			opacity: 0;
			transition: opacity .15s, transform .15s, visibility .15s;
			border-bottom: 2rpx solid rgba(255, 255, 255, .1);

			.solid-bottom {
				border-bottom: 2rpx solid rgba(255, 255, 255, .1);
			}

			.btn-skin.default {
				background: url(../../../static/images/skin-default-s.png);
				background-size: 100% 100%;
			}

			.btn-skin.blue {
				background: #cad9e8;
			}

			.btn-skin.green {
				background: #d1edd1;
			}

			.btn-skin.light {
				background: #e6e6e6;
			}

			.btn-skin.night {
				background: #1a1a1a;
			}
		}
	}

	.zai-opt-bot.show {
		visibility: visible;
		transition: none;
		opacity: 1;
	}

	.zai-opt-box.show {
		visibility: visible;
		transition: none;
		opacity: 1;

		.zai-join-book {
			transform: translateX(0);
		}

		.zai-opt-footer {
			transform: translateY(0);
		}
	}
</style>
