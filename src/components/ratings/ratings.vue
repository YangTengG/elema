<template>
	<div class="ratings" ref="ratingsScroll">
		<div class="scroll-wrapper">
			<div class="ratings-content">
				<div class="overview">
					<div class="overview-left">
						<h3 class="score">{{ seller.score }}</h3>
						<div class="title">综合评分</div>
						<div class="rank-rate">高于周边商家{{ seller.rankRate }}%</div>
					</div>
					<div class="overview-right">
						<div class="score-wrapper">
							<span class="title">服务态度</span>
							<star :size="36" :score="seller.serviceScore"></star>
							<span class="score">{{ seller.serviceScore }}</span>
						</div>
						<div class="score-wrapper">
							<span class="title">商品评分</span>
							<star :size="36" :score="seller.foodScore"></star>
							<span class="score">{{ seller.foodScore }}</span>
						</div>
						<div class="delivery-wrapper">
							<span class="title">送达时间</span>
							<span class="delivery-time">{{ seller.deliveryTime }}分钟</span>
						</div>
					</div>
				</div>
			</div>
			<split></split>
			<div class="ratingselect-wrapper">
				<ratingselect :fromParent="ratingstochild" :ratings="ratings"  @toggle-content="toggleCon" @selected="selected"></ratingselect>
			</div>
			<div class="ratings-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" alt="img">
						</div>
						<div class="rating-content">
							<span class="name">{{ rating.username }}</span>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
							</div>
							<p class="text">{{ rating.text }}</p>
							<div class="recommend" v-show="rating.recommend.length!==0">
								<span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>
								<span v-for="item in rating.recommend" class="recommend-item">{{ item }}</span>
							</div>
							<span class="rate-time">{{ rating.rateTime | formatDate }}</span>
						</div>
						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import Star from '../star/star'
	import Split from '../split/split'
	import RatingSelect from '../rating_select/ratingselect'

	import {formatDate} from '../../common/js/date.js'

	const ERR_OK = 0
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2

	export default {
		data () {
			return {
				ratings: [],
				ratingstochild: {
					selectType: ALL,
					onlyContent: false,
					desc: {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		created () {
			this.$http.get('/api/ratings').then((res) => {
				res = res.body
				if (res.errno === ERR_OK) {
					this.ratings = res.data

					this.$nextTick(() => {
						this._initScroll()
					})
				}
			})
		},
		filters: {
			formatDate (time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		methods: {
			_initScroll () {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.ratingsScroll, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			},
			toggleCon (data) {
				this.ratingstochild.onlyContent = data
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			selected (data) {
				this.ratingstochild.selectType = data
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			needShow (type, text) {
				if (this.ratingstochild.onlyContent && !text) {
					return false
				}
				if (this.ratingstochild.selectType === ALL) {
					return true
				} else {
					return type === this.ratingstochild.selectType
				}
			}
		},
		components: {
			star: Star,
			split: Split,
			ratingselect: RatingSelect
		}
	}
</script>

<style scoped>
	.ratings {
		width: 100%;
		position: absolute;
		top: 174px;
		left: 0;
		bottom: 0;
		overflow: hidden;
	}
	.ratings .overview {
		display: flex;
		padding: 18px 0;
	}
	.overview .overview-left {
		flex: 0 0 137px;
		width: 137px;
		padding: 6px 0;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.4);
	}
	.overview .overview-left .score {
		font-size: 24px;
		line-height: 28px;
		color: rgb(255, 153, 0);
		margin-top: 0;
		margin-bottom: 6px;
	}
	.overview .overview-left .title {
		font-size: 12px;
		line-height: 12px;
		color: rgb(7, 17, 27);
		margin-bottom: 8px;
	}
	.overview .overview-left .rank-rate {
		font-size: 10px;
		line-height: 10px;
		color: rgb(147, 153, 159);
	}
	/*overview-right*/
	.overview .overview-right {
		flex: 1;
		padding: 6px 0 6px 24px;
	}
	.overview-right .score-wrapper {
		font-size: 0;
		margin-bottom: 8px;
	}
	.overview-right .score-wrapper .title {
		display: inline-block;
		font-size: 12px;
		line-height: 18px;
		margin-right: 12px;
		vertical-align: top;
		color: rgb(7, 17, 27);
	}
	.overview-right .score-wrapper .star {
		display: inline-block;
	}
	.overview-right .score-wrapper .score {
		display: inline-block;
		vertical-align: top;
		margin-left: 12px;
		font-size: 12px;
		line-height: 18px;
		color: rgb(255, 153, 0);
	}
	.overview-right .delivery-wrapper {
		font-size: 0;
	}
	.overview-right .delivery-wrapper .title {
		font-size: 12px;
		line-height: 18px;
		margin-right: 12px;
		color: rgb(7, 17, 27);
	}
	.overview-right .delivery-wrapper .delivery-time {
		font-size: 12px;
		line-height: 18px;
		color: rgb(147, 153, 159);
	}
	.ratings .ratingselect-wrapper {
		padding: 6px 18px 0;
	}
	.ratings .ratings-wrapper {
		padding: 0 18px;
		border-top: 2px solid rgba(7, 17, 27, 0.1); 
	}
	.ratings-wrapper .rating-item {
		display: flex;
		padding: 18px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.rating-item .avatar {
		flex: 0 0 28px;
		width: 28px;
		margin-right: 12px;
	}
	.rating-item .avatar>img {
		display: block;
		width: 28px;
		height: 28px;
		border-radius: 50%;
	}
	.rating-item .rating-content {
		flex: 1;
		position: relative;
	}
	.rating-item .rating-content .name {
		font-size: 10px;
		line-height: 12px;
		margin-bottom: 4px;
		color: rgb(7, 17, 27);
	}
	.rating-item .rating-content .star-wrapper {
		margin-bottom: 6x;
	}
	.rating-content .star-wrapper .star {
		display: inline-block;
	}
	.rating-content .star-wrapper .delivery {
		margin-left: 6px;
		font-size: 10px;
		font-weight: 200;
		color: rgb(147, 153, 159);
		line-height: 12px;
	}
	.rating-content .text {
		font-size: 12px;
		line-height: 18px;
		color: rgb(7, 17, 27);
		margin: 6px 0 8px;
	}
	.rating-content .recommend {
		line-height: 16px;
		font-size: 0;
	}
	.rating-content .recommend .icon-thumb_up {
		font-size: 12px;
		line-height: 16px;
		vertical-align: top;
		color: rgb(0, 160, 220);
		vertical-align: top;
	}
	.rating-content .recommend .icon-thumb_down {
		font-size: 12px;
		line-height: 16px;
		color: rgb(183, 187, 191);
	}
	.rating-content .recommend .recommend-item {
		font-size: 9px;
		line-height: 16px;
		color: rgb(147, 153, 159);
		border: 1px solid rgba(7, 17, 27, 0.1);
		background-color: #fff;
		border-radius: 2px;
		margin-left: 8px;
		padding: 0 6px;
		vertical-align: top;
	}
	.rate-time {
		display: inline-block;
		position: absolute;
		top: 0;
		right: 0;
	}

	@media only screen and (max-width: 320px) {
		.overview .overview-left {
			flex: 0 0 120px;
			width: 120px;
		}
		.overview .overview-right {
			padding-left: 6px;
		}
	}
</style>
