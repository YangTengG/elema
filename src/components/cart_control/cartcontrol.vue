<template>
	<div class="cart-control">
		
		<span class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCount($event)" v-show="food.count>0"></span><span class="cart-count" v-show="food.count>0">{{ food.count }}</span><span class="cart-add icon-add_circle" @click.stop.prevent="addCount($event)"></span>
		
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCount (event) {
				if (!event._constructed) {
					return
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count ++
				}
			},
			decreaseCount (event) {
				if (!event._constructed) return
				this.food.count --
			}
		}
	}
</script>

<style scoped>
	.cart-control .cart-count {
		display: inline-block;
		width: 12px;
		line-height: 24px;
		vertical-align: top;
		font-size: 10px;
		color: rgb(147, 153, 159);
		text-align: center;
	}
	.cart-control .cart-decrease,
	.cart-control .cart-add {
		padding: 6px;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0, 160, 220);
	}
</style>
