<template>
	<div>
		<div class="shopping-cart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<!-- icon cart -->
					<div class="cart-logo-wrapper">
						<div class="cart-logo" :class="{'cart-highlight': totalCount>0}">
							<i class="icon-shopping_cart"></i>
							<div class="foods-num" v-show="totalCount">{{totalCount}}</div>
						</div>
						
					</div>
					<div class="total-price text-right" :class="{'price-highlight' : totalPrice>0}">￥{{ totalPrice }}</div>
					<div class="delivery-price">另需配送费￥{{ deliveryPrice }}元</div>
				</div>

				<!-- 右侧结算 -->
				<div class="content-right" :class="{'enough':totalPrice>=minPrice}">
					<span class="minPrice" @click.stop.prevent="pay">{{ payDesc }}</span>
				</div>
			</div>

			<!-- 购物车详情 -->
			<transition name='fold'>
				<div class="shoppingcart-list" v-show="isShow">
					<div class="list-header clearfix">
						<h3 class="cart-title">购物车</h3>
						<span class="empty pull-right" @click="emptyCart">清空</span>
					</div>

					<!-- 购物车清单 -->
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in foodsSelected">
								<span class="food-name">{{ food.name }}</span>
								<span class="food-price">￥{{ food.price * food.count }}</span>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>

		<!-- 蒙版 -->
		<transition name="fade">
			<div class="list-mask" v-show="isShow" @click="hideList">
			</div>
		</transition>
		
	</div>
</template>

<script>
	import CartControl from '../cart_control/cartcontrol'
	import BScroll from 'better-scroll'

	export default {
		data () {
			return {
				fold: true
			}
		},
		props: {
			foodsSelected: {
				type: Array
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			// 总价格
			totalPrice () {
				let total = 0
				this.foodsSelected.forEach((food) => {
					total += food.price * food.count
				})
				return total
			},
			// 购买总数量
			totalCount () {
				let count = 0
				this.foodsSelected.forEach((food) => {
					count += food.count
				})
				return count
			},
			// 结算按钮
			payDesc () {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}起送`
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}起送`
				} else {
					return '去结算'
				}
			},
			isShow () {
				if (!this.totalCount) {
					this.fold = true
					return false
				}
				let isShow = !this.fold

				if (isShow) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return isShow
			}
		},
		methods: {
			toggleList () {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			emptyCart () {
				this.foodsSelected.forEach((food) => {
					food.count = 0
				})
			},
			hideList () {
				this.fold = true
			},
			pay () {
				if (this.totalPrice < this.minPrice) {
					return
				}
				console.log(`支付${this.totalPrice}`)
			}
		},
		components: {
			cartcontrol: CartControl
		}
	}
</script>

<style scoped>
	.shopping-cart {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 46px;
		z-index: 50;
		background-color: #141d27;
	}
	.shopping-cart .content {
		display: flex;
		height: 100%;
		position: relative;
	}
	/*left*/
	.content .content-left{
		flex: 1;
	}
	.content-left .cart-logo-wrapper {
		width: 58px;
		height: 58px;
		line-height: 58px;
		text-align: center;
		background-color: #141d27;
		border-radius: 50%;

		position: absolute;
		bottom: 0;
		left: 12px;
	}
	.cart-logo-wrapper .cart-logo {
		width: 44px;
		height: 44px;
		margin: 7px auto;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		position: relative;
	}
	.cart-logo-wrapper .cart-logo .icon-shopping_cart {
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 24px;
		line-height:44px;
		color: rgba(255, 255, 255, 0.8);
	}
	/*购物车高亮状态*/
	.cart-logo-wrapper .cart-logo.cart-highlight{
		background-color: rgb(0, 160, 220);
	}
	.cart-logo-wrapper .cart-logo.cart-highlight .icon-shopping_cart {
		color: rgb(255, 255, 255);
	}
	.cart-logo-wrapper .foods-num {
		width: 24px;
		font-size: 9px;
		font-weight: 700;
		line-height: 16px;
		color: rgb(255, 255, 255);
		background-color: rgb(240, 20, 20);
		border-radius: 12px;
		box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		right: 0;
		margin-right: -10px;
		margin-top: -5px;
	}
	.content-left .total-price {
		display: inline-block;
		font-size: 16px;
		font-weight: 700;
		line-height: 24px;
		margin-top: 12px;
		margin-left: 80px;
		padding-right: 12px;
		color: rgba(255, 255, 255,0.4);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}
	.content-left .total-price.price-highlight {
		color: rgb(255, 255, 225);
	}
	.content-left .delivery-price {
		display: inline-block;
		padding-left: 12px;
		font-size: 14px;
		line-height: 24px;
		color: rgba(255, 255, 255,0.4);
	}

	/*content right*/
	.content .content-right {
		flex: 0 0 105px;
		width: 121px;
		padding: 0 8px;
		background-color: rgba(255, 255, 255, 0.4);
	}
	.content-right .minPrice {
		display: inline-block;
		width: 105px;
		height: 46px;
		text-align: center;
		font-size: 12px;
		font-weight: 700;
		line-height: 46px;
		color: rgba(255, 255, 255, 0.4);
	}
	.content-right.enough {
		background-color: green;
	}
	.content-right.enough .minPrice {
		color: rgb(255, 255, 255);
	}

	/*购物车详情*/
	.shoppingcart-list {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		transform: translate3d(0, -100%, 0);
	}
	.shoppingcart-list.fold-enter-active,
	.shoppingcart-list.fold-leave-active {
		transition: all 0.5s ease;
	}
	.shoppingcart-list.fold-enter-active {
		transform: translate3d(0, -100%, 0);
	}
	.shoppingcart-list.fold-leave-active,
	.shoppingcart-list.fold-enter {
		transform: translate3d(0, 0, 0);
	}
	.shoppingcart-list .list-header {
		height: 40px;
		padding: 0 18px;
		background-color: #f3f5f7;
		border-bottom: 2px solid rgba(7, 17, 27, 0.1);
	}
	.list-header .cart-title {
		display: inline-block;
		font-size: 14px;
		color: rgb(7, 17, 27);
		font-weight: 200;
		margin: 0;
		line-height: 40px;
	}
	.list-header .empty {
		font-size: 12px;
		line-height: 40px;
		color: rgb(0, 160, 220);
	}
	
	.list-content {
		padding: 0 18px;
		max-height: 217px;
		overflow: hidden;
		background: rgb(255, 255, 255);
	}
	.list-content .food {
		height: 48px;
		padding: 12px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		position: relative;
	}
	.list-content .food .food-name {
		font-size: 14px;
		color: rgb(7, 17, 27);
		line-height: 24px;

	}
	.list-content .food .food-price {
		font-size: 14px;
		font-weight: 700;
		color: rgb(240, 20, 20);
		line-height: 24px;
		position: absolute;
		right: 90px;
		bottom: 12px;
	}
	.list-content .cartcontrol-wrapper {
		position: absolute;
		bottom: 6px;
		right: -6px;
	}

	/*蒙版*/
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		backdrop-filter: blur(10px);
		/*opacity: 1;*/
		background-color: rgba(7, 17, 27, 0.6);
	}
	.list-mask.fade-enter-active,
	.list-mask.fade-leave-active {
		transition: all 0.5s ease;
	}
	.list-mask.fade-enter-active {
		opacity: 1;
		background-color: rgba(7, 17, 27, 0.6);
	}
	.list-mask.fade-enter,
	.list-mask.fade-leave-active {
		opacity: 0;
		background-color: rgba(7, 17, 27, 0);
	}
</style>
