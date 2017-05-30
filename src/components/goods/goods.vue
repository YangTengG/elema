<template>
	<div>
		<div class="goods">
			<!-- 左侧 -->
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item, index) in goods" :class="{'current':currentIndex === index}" class="menu-item" @click="selectMenu(index, $event)">
						<div class="item-wrapper">
							<support :size="3" :supIcon="item.type"></support>
							<span class="title">{{ item.name }}</span>
						</div>
					</li>
				</ul>
			</div>

			<!-- 右侧 -->
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h3 class="category-name">{{ item.name }}</h3>

						<ul>
							<li v-for="food in item.foods" @click="selectFood(food, $event)" class="food-item">
								<div class="media food-item-content">
									<div class="food-icon media-left">
										<img :src="food.icon" alt="foodimg">
									</div>

									<div class="media-body food-item-detail">
										<h4 class="media-heading food-name">{{food.name}}</h4>
										<p v-show="food.description" class="desc">{{ food.description  }}</p>
										<div class="extra">
											<span>月售{{ food.sellCount }}份</span>&nbsp;&nbsp;
											<span>好评率{{ food.rating }}%</span>
										</div>
										<div class="price">
											<span>￥{{ food.price }}</span>&nbsp;
											<span v-show="food.oldPrice" class="old-price">￥{{ food.oldPrice }}</span>
										</div>
									</div>

									<!-- cartcontrol 组件 -->
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>

					</li>
				</ul>
			</div>

			<!-- shoppingcart -->
			<shoppingcart :foodsSelected="foodsSelected" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shoppingcart>
		</div>

		<!-- fooddetai component -->
		<fooddetail :food="selectedFood" ref="fooddetail"></fooddetail>
	</div>
</template>

<script>
	import Support from '../support/support'
	import BScroll from 'better-scroll'

	import ShoppingCart from '../shopping_cart/shoppingCart'
	import CartControl from '../cart_control/cartcontrol'
	import FoodDetail from '../foodDetail/food'

	const ERR_OK = 0

	export default {
		data () {
			return {
				goods: [],
				listHeights: [],
				scrollY: 0,
				selectedFood: {}
			}
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHeights.length; i++) {
					let height1 = this.listHeights[i]
					let height2 = this.listHeights[i + 1]
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i
					}
				}
			},
			foodsSelected () {
				let foods = []
				this.goods.forEach((item) => {
					item.foods.forEach((food) => {
						if (food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			support: Support,
			shoppingcart: ShoppingCart,
			cartcontrol: CartControl,
			fooddetail: FoodDetail
		},
		methods: {
			selectMenu (index, event) {
				// 处理PC端浏览器点击事件
				if (!event._constructed) {
					return
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 300)
			},
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				})

				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3
				})
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight () {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let height = 0
				this.listHeights.push(height)
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeights.push(height)
				}
			},
			// 食物详情
			selectFood (food, event) {
				if (!event._constructed) {
					return
				}
				this.selectedFood = food
				this.$refs.fooddetail.showDetail()
			}
		},
		created () {
			this.$http.get('/api/goods').then((res) => {
				res = res.body
				if (res.errno === ERR_OK) {
					this.goods = res.data
					// 处理异步,防止内容还未加载完就执行，获取不到元素的高度导致无法滑动
					this.$nextTick(() => {
						this._initScroll()
						this._calculateHeight()
					})
				}
			})
		}
	}
</script>

<style scoped>
	.goods {
		display: flex;
		width: 100%;
		position: absolute;
		top: 174px;
		bottom: 46px;
		overflow: hidden;
	}

	/*左侧菜单*/
	.menu-wrapper {
		flex: 0 0 80px;
		width: 80px;
		background-color: #f3f5f7;
	}
	.menu-wrapper .menu-item {
		display: table;
		height: 54px;
		padding: 0 12px;
		line-height: 14px;
		background-color: #f3f5f7;
	}
	.menu-wrapper .menu-item.current {
		position: relative;
		z-index: 10;
		margin-top: -1px;
		font-weight: 700;
		background-color: #fff;
	}
	.menu-wrapper .menu-item.current .item-wrapper{
		border-bottom: 0;
	}
	.menu-item .item-wrapper {
		display: table-cell;
		width: 56px;
		font-size: 0;
		text-align: center;
		vertical-align: middle;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.menu-item .item-wrapper .support-box {
		display: inline-block;
		margin-right: 2px;
		vertical-align: middle;
	}
	.menu-item .item-wrapper .title {
		font-size: 12px;
		font-weight: 200;
		line-height: 14px;
		vertical-align: middle;
		color: rgb(20, 20, 20);
	}

	/*右侧食物列表*/
	.foods-wrapper {

	}
	.food-list .category-name {
		height: 26px;
		font-size: 12px;
		color: rgb(147, 153, 159);
		line-height: 26px;
		margin: 0;
		padding-left: 14px;
		border-left: 2px solid #d9dde1;
		background-color: #f3f5f7;
	}
	.food-list .food-item {
		position: relative;
		padding: 0 18px;
	}
	.food-list .food-item .food-item-content {
		padding: 18px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.food-list .food-item:last-child .food-item-content {
		border-bottom: 0;
	}
	.food-list .food-item .food-item-content .food-icon>img {
		width: 57px;
	}

	/**/
	.food-item-content .food-item-detail {
		padding-top: 2px;
	}
	.food-item-content .food-item-detail .food-name {
		font-size: 14px;
		line-height: 14px;
		margin-bottom: 0;
		color: rgb(7, 17, 27);
	}
	.food-item-content .food-item-detail .desc,
	.food-item-content .food-item-detail .extra {
		font-size: 10px;
		line-height: 10px;
		color: rgb(147, 153, 159);
		margin-top: 8px;
		margin-bottom: 0;
	}
	.food-item-content .food-item-detail .desc {
		line-height: 14px;
	}
	.food-item-content .food-item-detail .price {
		font-size: 14px;
		font-weight: 700;
		line-height: 24px;
		margin-top: 4px;
		color: rgb(240, 20, 20);
	}
	.food-item-content .food-item-detail .price .old-price {
		font-size: 10px;
		color: rgb(147, 153, 159);
		text-decoration: line-through;
	}

	/*cart control*/
	.food-item .cartcontrol-wrapper {
		position: absolute;
		bottom: 10px;
		right: 18px;
	}
</style>
