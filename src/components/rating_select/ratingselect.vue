<template>
	<div class="rating-select">
		<div class="rating-type">
			<span class="type-btn positive" :class="{'active':fromParent.selectType===2}" @click="select(2, $event)">{{ fromParent.desc.all }} <span class="rating-count">{{ ratings.length }}</span>
			</span>
			<span class="type-btn positive" :class="{'active':fromParent.selectType===0}" @click="select(0, $event)">{{ fromParent.desc.positive }} <span class="rating-count">{{ posRatings.length }}</span>
			</span>
			<span class="type-btn negative" :class="{'active':fromParent.selectType===1}" @click="select(1, $event)">{{ fromParent.desc.negative }} <span class="rating-count">{{ negRatings.length }}</span>
			</span>
		</div>
		<div class="switch" :class="{'active':fromParent.onlyContent}" @click="toggleContent($event)">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>

	</div>
</template>

<script>
	const POSITIVE = 0
	const NEGATIVE = 1
	const ALL = 2

	export default {
		props: {
			ratings: {
				type: Array,
				default () {
					return []
				}
			},
			fromParent: {
				type: Object
			}
			// selectType: {
			// 	type: Number,
			// 	default: ALL
			// },
			// onlyContent: {
			// 	type: Boolean,
			// 	default: false
			// },
			// desc: {
			// 	type: Object,
			// 	default () {
			// 		return {
			// 			all: '全部',
			// 			positive: '满意',
			// 			negative: '不满意'
			// 		}
			// 	}
			// }
		},
		computed: {
			posRatings () {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negRatings () {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			}
		},
		methods: {
			select (type, event) {
				if (!event._constructed) {
					return
				}
				this.fromParent.selectType = type
				this.$emit('selected', type)
			},
			toggleContent (event) {
				if (!event._constructed) {
					return
				}
				this.fromParent.onlyContent = !this.fromParent.onlyContent
				this.$emit('toggle-content', this.fromParent.onlyContent)
			}
		}
	}
</script>

<style scoped>
	.rating-select {}
	.rating-type {
		padding: 12px 0 18px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	.type-btn {
		display: inline-block;
		padding: 8px 12px;
		font-size: 12px;
		line-height: 16px;
		color: rgb(77, 85, 93);
		border-radius: 1px;
		margin-right: 8px;
	}
	.type-btn.positive {
		background-color: rgba(0, 160, 220, 0.2);
	}
	.type-btn.positive.active {
		color: rgb(255, 255, 255);
		background-color: rgb(0, 160, 220);
	}
	.type-btn.negative {
		background-color: rgba(77, 85, 93, 0.2);
	}
	.type-btn.negative.active {
		color: rgb(255, 255, 255);
		background-color: rgb(77, 85, 93);
	}
	.type-btn .rating-count {
		font-size: 8px;
	}
	.switch {
		font-size: 0;
		padding: 12px 0;
	}
	.icon-check_circle {
		font-size: 24px;
		color: rgb(147, 153, 159);
		line-height: 24px;
	}
	.switch.active .icon-check_circle {
		color: rgb(0, 160, 220);
	}
	.switch .text {
		display: inline-block;
		font-size: 12px;
		color: rgb(147, 153, 159);
		line-height: 24px;
		margin-left: 8px;
		vertical-align: top;
	}
</style>
