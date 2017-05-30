<template>
	<transition name="flyin">
		<div v-show="showFlag" class="food" ref="foodDetail">
			<div class="food-content">
				<div class="header-image">
					<img :src="food.image" alt="foodImg">
					<!-- 返回按钮 -->
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				
				<div class="content-detail">
					<div class="detail-title">
						<h3 class="food-name">{{ food.name }}</h3>
						<div class="food-info">
							<span class="sell-count">月售{{ food.sellCount }}份</span>&nbsp;&nbsp;
							<span class="rating">好评率{{ food.rating }}%</span>
						</div>
						<div class="food-price">
							<span class="price">￥{{ food.price }}</span>
							<span class="old-price" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
						</div>
						<span class="add-to-cart" v-show="!food.count || food.count===0" @click.stop.prevent="addToCart($event)">加入购物车</span>
						<div class="cartcontrol-wrapper" v-show="food.count>0">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</div>
					<div v-show="food.info">
						<split></split>
						<div class="detail-info">
							<h3 class="title">商品介绍</h3>
							<p class="info">{{ food.info }}</p>
						</div>
					</div>
					
					<div>
						<split></split>
						<div class="detail-ratings">
							<div class="rating-header">
								<h3 class="title">商品评价</h3>
								<ratingselect :fromParent="toChildRatings" :ratings="food.ratings" @toggle-content="toggleCon" @selected="selected"></ratingselect>
							</div>

							<div class="rating-wrapper">
								<ul v-show="food.ratings && food.ratings.length">
									<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
										<div class="user">
											<span class="name">{{ rating.username }}</span>
											<img :src="rating.avatar" alt="头像" class="avatar">
										</div>
										<div class="time">{{ rating.rateTime | formatDate }}</div>
										<p class="text">
											<span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{ rating.text }}
										</p>
									</li>
								</ul>
								<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
							</div>
						</div>
					</div>
					
				</div><!-- content detail -->
			</div><!-- food content -->
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import CartControl from '../cart_control/cartcontrol'
	import Split from '../split/split'
	import RatingSelect from '../rating_select/ratingselect'
	import {formatDate} from '../../common/js/date.js'

	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2

	export default {
		data () {
			return {
				showFlag: false,
				toChildRatings: {
					selectType: ALL,
					onlyContent: false,
					desc: {
						all: '全部',
						positive: '推荐',
						negative: '吐槽'
					}
				}
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		components: {
			cartcontrol: CartControl,
			split: Split,
			ratingselect: RatingSelect
		},
		methods: {
			showDetail () {
				this.showFlag = true

				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.foodDetail, {
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			hide () {
				this.showFlag = false
			},
			addToCart (event) {
				if (!event._constructed) {
					return
				}
				Vue.set(this.food, 'count', 1)
			},
			selected (data) {
				this.toChildRatings.selectType = data
				// 数据更新后 更新dom
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			toggleCon (data) {
				this.toChildRatings.onlyContent = data
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			needShow (type, text) {
				if (this.toChildRatings.onlyContent && !text) {
					return false
				}
				if (this.toChildRatings.selectType === ALL) {
					return true
				} else {
					return type === this.toChildRatings.selectType
				}
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>

<style scoped>
	.food.flyin-enter-active,
	.food.flyin-leave-active {
		transition: all 0.2s linear;
	}
	.food.flyin-enter-active {
		transform: translate3d(0, 0, 0);
	}
	.food.flyin-enter,
	.food.flyin-leave-active {
		transform: translate3d(100%, 0, 0);
	}
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 46px;
		width: 100%;
		background-color: rgb(255, 255, 255); 
		z-index: 30;
		transform: translate3d(0, 0, 0);
	}
	.food .header-image {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.header-image>img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.header-image .back {
		font-size: 20px;
		font-weight: 200;
		color: rgba(255, 255, 255, 1);
		padding: 10px;
		position: absolute;
		top: 10px;
		left: 10px;
	}
	.content-detail {
	}
	.content-detail .detail-title {
		padding: 18px;
		position: relative;
	}
	.content-detail .detail-title .food-name {
		margin: 0;
		font-size: 14px;
		font-weight: 700;
		line-height: 14px;
		color: rgb(7, 17, 27);
	}
	.detail-title .food-info {
		font-size: 10px;
		line-height: 10px;
		margin-top: 8px;
		color: rgb(147, 153, 159);
	}
	.detail-title .food-price {
		margin-top: 18px;
	}
	.food-price .price {
		font-size: 14px;
		font-weight: 700;
		line-height: 24px;
		color: rgb(240, 20, 20);
	}
	.food-price .old-price {
		font-size: 1px;
		font-weight: 700;
		line-height: 24px;
		color: rgb(147, 153, 159);
		text-decoration: line-through;
	}
	.content-detail .add-to-cart {
		display: inline-block;
		width: 74px;
		height: 24px;
		font-size: 10px;
		text-align: center;
		padding: 0 12px;
		line-height: 24px;
		color: rgb(255, 255, 255);
		border-radius: 12px;
		background-color: rgb(0, 160, 220);
		position: absolute;
		right: 18px;
		bottom: 16px;
	}
	.content-detail .cartcontrol-wrapper{
		position: absolute;
		right: 16px;
		bottom: 12px;
	}
	/*商品介绍*/
	
	.content-detail .detail-info {
		padding: 18px;
	}
	.title {
		font-size: 14px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		margin: 0;
		margin-bottom: 6px;
	}
	.content-detail .detail-info .info {
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
		color: rgb(77, 85, 93);
		padding: 0 8px;
	}
	.detail-ratings .rating-header {
		padding: 18px 18px 0;
	}
	.detail-ratings .rating-wrapper {
		padding: 0 18px;
		border-top: 2px solid rgba(7, 17, 27, 0.1);
	}
	/*评论列表*/
	.rating-wrapper .rating-item {
		padding: 16px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		position: relative;
	}
	.rating-item .user {
		position: absolute;
		right: 0;
		top: 16px;
		font-size: 0;
	}
	.user .name {
		display: inline-block;
		margin-right: 6px;
		font-size: 10px;
		vertical-align: top;
		color: rgb(147, 153, 159);
	}
	.user .avatar {
		display: inline-block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	.rating-item .time {
		font-size: 10px;
		line-height: 12px;
		margin-bottom: 6px;
		color: rgb(147, 153, 159);
	}
	.rating-item .text {
		font-size: 12px;
		line-height: 16px;
		vertical-align: top;
		color: rgb(7, 17, 27); 
		margin-bottom: 0;
	}
	.text .icon-thumb_up,
	.text .icon-thumb_down {
		font-size: 12px;
		line-height: 16px;
		margin-right: 4px;
	}
	.text .icon-thumb_up {
		color: rgb(0, 160, 220);
	}
	.text .icon-thumb_down {
		color: rgb(147, 153, 159);
	}
	.no-rating {
		padding: 16px 0;
		font-size: 14px;
		color: rgb(147, 153, 159);
	}
</style>
