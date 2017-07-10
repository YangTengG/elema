<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h3 class="title">{{ seller.name }}</h3>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{ seller.ratingCount }})</span>
					<span class="text">月售{{ seller.sellCount }}单</span>
				</div>
				<ul class="remark">
					<li class="remark-item">
						<h3 class="title">起送价</h3>
						<div class="content">
							<span class="stress">{{ seller.minPrice }}</span>元
						</div>
					</li>
					<li class="remark-item">
						<h3 class="title">商家配送</h3>
						<div class="content">
							<span class="stress">{{ seller.deliveryPrice }}</span>元
						</div>
					</li>
					<li class="remark-item">
						<h3 class="title">平均送达时间</h3>
						<div class="content">
							<span class="stress">{{ seller.deliveryTime }}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite($event)">
					<span class="icon-favorite" :class="{'active': favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<!-- 公告活动 -->
			<div class="supports-wrapper">
				<h3 class="title">公告活动</h3>
				<p class="bulletin">{{ seller.bulletin }}</p>
				<ul>
					<li v-for="item in seller.supports" class="support-item">
						<support :supIcon="item.type" :size="4"></support>
						<span class="desc">{{ item.description }}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<!-- 商家实景 -->
			<div class="seller-pics">
				<h3 class="title">商家实景</h3>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" alt="商家实景">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<!-- 商家信息 -->
			<div class="seller-infos">
				<h3 class="title">商家信息</h3>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{ info }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

	import BScroll from 'better-scroll'
	import Star from 'components/star/star'
	import Split from 'components/split/split'
	import Support from 'components/support/support'

	import {saveToLocal, loadFromLocal} from 'common/js/store.js'

	export default {
		data () {
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false)
				})()
			}
		},
		computed: {
			favoriteText () {
				return this.favorite ? '已收藏' : '未收藏'
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star: Star,
			split: Split,
			support: Support
		},
		methods: {
			toggleFavorite (event) {
				if (!event._constructed) {
					return
				}
				this.favorite = !this.favorite
				saveToLocal(this.seller.id, 'favorite', this.favorite)
			},
			_initScroll () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			},
			_initPicScroll () {
				if (!this.picScroll) {
					this.picScroll = new BScroll(this.$refs.picWrapper, {
						scrollX: true
					})
				} else {
					this.picScroll.refresh()
				}
			},
			_ulW () {
				if (this.seller.pics) {
					let picW = 120
					let margin = 6
					let ulW = (picW + margin) * this.seller.pics.length - margin
					this.$refs.picList.style.width = ulW + 'px'
				}
			}
		},
		mounted () {
			this._initScroll()
			this._ulW()
			this._initPicScroll()
		},
		watch: {
			seller: function () {
				this.$nextTick(() => {
					this._initScroll()
					this._ulW()
					this._initPicScroll()
				})
			}
		}
	}
</script>

<style scoped>
	.seller {
		width: 100%;
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}
	.seller-content .overview {
		padding: 18px;
	}
	.seller-content .overview .title {
		margin-top: 0;
		margin-bottom: 8px;
		font-size: 14px;
		line-height: 14px;
		color: rgb(7, 17, 27);
	}
	.seller-content .overview .desc {
		padding-bottom: 18px;
		font-size: 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.seller-content .overview .desc .star {
		display: inline-block;
		margin-right: 8px;
		vertical-align: top;
	}
	.seller-content .overview .desc .text {
		display: inline-block;
		margin-right: 12px;
		font-size: 10px;
		line-height: 18px;
		color: rgb(77, 85, 93);
	}
	.overview .remark {
		display: flex;
		padding-top: 18px;
		margin-bottom: 0;
	}
	.overview .remark .remark-item {
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
	}
	.overview .remark .remark-item:last-child {
		border-right: none;
	}
	.overview .remark .remark-item .title {
		font-size: 10px;
		line-height: 10px;
		color: rgb(147, 153, 159);
		margin-top: 0;
		margin-bottom: 4px; 
	}
	.overview .remark .remark-item .content {
		font-size: 10px;
		font-weight: 200;
		line-height: 24px;
		color: rgb(7, 17, 27);
	}
	.overview .remark .remark-item .content .stress {
		font-size: 24px;
	}
	.overview .favorite {
		width: 40px;
		position: absolute;
		right: 18px;
		top: 18px;
		font-size: 0;
		text-align: center;
	}
	.favorite .icon-favorite {
		display: block;
		font-size: 24px;
		line-height: 24px;
		margin-bottom: 4px;
		color: #d4d6d9;
	}
	.favorite .icon-favorite.active {
		color: rgb(240, 20, 20);
	}
	.favorite .text {
		font-size: 10px;
		line-height: 10px;
		color: rgb(77, 85, 93);
	}

	/*公告活动*/
	.seller-content .supports-wrapper {
		padding: 0 18px;
	}
	.supports-wrapper>ul {
		margin-bottom: 0;
	}
	.supports-wrapper .title {
		font-size: 14px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		margin: 18px 0 8px;
	}
	.supports-wrapper .bulletin {
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
		color: rgb(240, 20, 20);
		padding: 0 12px 16px;
		margin-bottom: 0;
	}
	.supports-wrapper .support-item {
		padding: 16px 12px;
		border-top: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	.support-item .support-box {
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
	}
	.support-item .desc {
		font-size: 12px;
		font-weight: 200;
		line-height: 16px;
		color: rgb(7, 17, 27);
	}

	/*商家实景*/
	.seller-content .seller-pics {
		padding: 18px;
	}
	.seller-pics .title {
		margin-top: 0;
		margin-bottom: 12px;
		font-size: 14px;
		line-height: 14px;
		color: rgb(7, 17, 27);
	}
	.pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.pic-wrapper .pic-list {
		font-size: 0;
		margin-bottom: 0;
	}
	.pic-list .pic-item {
		display: inline-block;
		width: 120px;
		height: 90px;
		margin-right: 6px;
	}
	.pic-list .pic-item:last-child {
		margin-right: 0;
	}
	.pic-list .pic-item>img {
		width: 120px;
		height: 90px;
	}
	/*商家信息*/
	.seller-infos {
		padding: 18px 18px 0;
	}
	.seller-infos .title {
		margin-top: 0;
		margin-bottom: 12px;
		font-size: 14px;
		line-height: 14px;
		color: rgb(7, 17, 27);
	}
	.seller-infos .info-item {
		padding: 16px 12px;
		border-top: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 12px;
		font-weight: 200;
		line-height: 16px;
	}

</style>
