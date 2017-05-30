<template>
	<div class="support-box" :class="iconType">
		<span v-show="showIcon" :class="classMap[supIcon]" class="icon"></span>
	</div>
</template>

<script>
	export default {
		props: {
			supIcon: {
				type: Number
			},
			size: {
				type: Number
			}
		},
		computed: {
			iconType () {
				return 'icon' + this.size
			},
			showIcon () {
				return this.supIcon >= 0
			}
		},
	  created () {
	  	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
	  }
	}
</script>

<style scoped>
	.support-box {
		display: inline-block;
	}
	.support-box .icon1 .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.icon1 .decrease {
		background-image: url('decrease_1@2x.png');
	}
	.icon1 .discount {
		background-image: url('discount_1@2x.png');
	}
	.icon1 .guarantee {
		background-image: url('guarantee_1@2x.png');
	}
	.icon1 .invoice {
		background-image: url('invoice_1@2x.png');
	}
	.icon1 .special {
		background-image: url('special_1@2x.png');
	}

	.icon2 .icon{
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.icon2 .decrease {
		background-image: url('decrease_2@2x.png');
	}
	.icon2 .discount {
		background-image: url('discount_2@2x.png');
	}
	.icon2 .guarantee {
		background-image: url('guarantee_2@2x.png');
	}
	.icon2 .invoice {
		background-image: url('invoice_2@2x.png');
	}
	.icon2 .special {
		background-image: url('special_2@2x.png');
	}

	.icon3 .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		vertical-align: top;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.icon3 .decrease {
		background-image: url('decrease_3@2x.png');
	}
	.icon3 .discount {
		background-image: url('discount_3@2x.png');
	}
	.icon3 .guarantee {
		background-image: url('guarantee_3@2x.png');
	}
	.icon3 .invoice {
		background-image: url('invoice_3@2x.png');
	}
	.icon3 .special {
		background-image: url('special_3@2x.png');
	}

	.icon4 .icon{
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.icon4 .decrease {
		background-image: url('decrease_4@2x.png');
	}
	.icon4 .discount {
		background-image: url('discount_4@2x.png');
	}
	.icon4 .guarantee {
		background-image: url('guarantee_4@2x.png');
	}
	.icon4 .invoice {
		background-image: url('invoice_4@2x.png');
	}
	.icon4 .special {
		background-image: url('special_4@2x.png');
	}
</style>
