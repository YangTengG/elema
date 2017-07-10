<template>
	<div class="header">
		<div class="content-wrapper clearfix">
			<div class="">
				<div class="seller-avatar">
					<img :src="seller.avatar" alt="avatar" class="avatar">
				</div>

				<div class="seller-content">
					<div class="seller-title">
						<span class="brand"></span>
						<span class="seller-name">{{ seller.name }}</span>
					</div>

					<div class="delivery-time">
						{{ seller.description }} / {{ seller.deliveryTime }} 分钟送达
					</div>

					<div v-if="seller.supports" class="seller-support">
						<span class="sup-icon" :class="classMap[seller.supports[0].type]"></span><span class="sup-des">{{ seller.supports[0].description }}</span>
					</div>
				</div>

				<div v-if="seller.supports" @click="showDetail" class="supports-count"><span class="count">{{ seller.supports.length }}个</span><i class="glyphicon glyphicon-menu-right arrow-r"></i></div>
			</div>
		</div>

		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
			<i class="glyphicon glyphicon-menu-right arrow-r"></i>
		</div>

		<div class="bg-blur">
			<img :src="seller.avatar" alt="">
		</div>
		
		<!-- 弹出层 -->
		<div v-show="detailShow" class="bulletin-detail">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<p class="text-center detail-seller-name">{{ seller.name }}</p>
					<div class="star-wrapper text-center">
						<star :size="48" :score="seller.score"></star>
					</div>

					<div class="detail-title">
						<div class="line"></div>
						<div class="title">优惠信息</div>
						<div class="line"></div>
					</div>
					<div class="supports-content">
						<ul v-if="seller.supports">
							<li v-for="(item, index) in seller.supports">
								<span class="sup-icon" :class="classMap[item.type]"></span>
							  <span class="sup-des">{{ item.description }}</span>
							</li>
						</ul>
					</div>

					<div class="detail-title">
						<div class="line"></div>
						<div class="title">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin-content">
						<span>{{ seller.bulletin }}</span>
					</div>

				</div>
			</div>
			<div class="detail-close" @click="closeDetail">
				<i class="icon-close"></i>
			</div>
		</div>

	</div>
</template>

<script>
  import Star from 'components/star/star'

	export default {
		data () {
			return {
				detailShow: false
			}
		},
	  props: {
	    seller: {
	      type: Object
	    }
	  },
	  components: {
	  	star: Star
	  },
	  created () {
	  	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
	  },
	  methods: {
	  	showDetail () {
	  		this.detailShow = true
	  	},
	  	closeDetail () {
	  		this.detailShow = false
	  	}
	  }
	}
</script>

<style scoped>
  @import url('/common/iconStyle.css');

	.header {
		position: relative;
		background-color: rgba(7, 17, 27, 0.5);
	}
	.content-wrapper {
		width: 100%;
		height: 106px;
		padding: 24px 12px 18px 24px;
		position: relative;
	}

	/*avatar*/
	.seller-avatar {
		float: left;
	}
	.seller-avatar>img {
		width: 64px;
		height: 64px;
		border-radius: 4px;
	}

	/*content*/
	.seller-content {
		float: left;
		margin-left: 16px;
		color: rgb(255, 255, 255);
	}
	.seller-content .seller-title {
		margin-top: 2px;
	}
	.seller-title .brand {
		display: inline-block;
		width: 30px;
		height: 18px;
		background: url(brand@2x.png) no-repeat;
		background-size: 30px 18px;
	}
	.seller-title .seller-name {
		font-size: 16px;
		font-weight: bold;
		line-height: 18px;
		margin-right: 6px;
		vertical-align: top;
	}
	.seller-content .delivery-time {
		margin: 8px 0 10px;
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
	}
	.seller-content .seller-support {
		font-size: 10px;
		font-weight: 200;
		line-height: 12px;
	}
	.seller-support .sup-icon {
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.seller-support .decrease {
		background-image: url('decrease_1@2x.png');
	}
	.seller-support .discount {
		background-image: url('discount_1@2x.png');
	}
	.seller-support .guarantee {
		background-image: url('guarantee_1@2x.png');
	}
	.seller-support .invoice {
		background-image: url('invoice_1@2x.png');
	}
	.seller-support .special {
		background-image: url('special_1@2x.png');
	}

	.supports-count {
		position: absolute;
		right: 12px;
		bottom: 18px;
		height: 24px;
		line-height: 24px;
		padding: 0px 8px;
		border-radius: 12px;
		color: rgb(255, 255, 255);
		background-color: rgba(0, 0, 0, 0.2);
	}
	.supports-count .count {
		font-size: 10px;
		font-weight: 200;
		line-height: 12px;
		margin-right: 2px;
	}
	.supports-count .arrow-r {
		font-size: 10px;
		line-height: 12px;
	}

	/*公告*/
	.bulletin-wrapper {
		padding: 0 22px 0 12px;
		width: 100%;
		height: 28px;
		line-height: 28px;
		color: rgb(255, 255, 255);
		background-color: rgba(7, 17, 27, 0.2);
		position: relative;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bulletin-wrapper .bulletin-title {
		display: inline-block;
		width: 22px;
		height: 12px;
		background: url('bulletin@2x.png') no-repeat;
		background-size: 22px 12px;
	}
	.bulletin-wrapper .bulletin-text {
		vertical-align: top;
		font-size: 10px;
		margin-left: 4px;
	}
	.bulletin-wrapper .arrow-r {
		position: absolute;
		right: 12px;
		top: 8px;
		font-size: 10px;
		color: rgb(255, 255, 255);
	}

	/*背景模糊效果*/
	.bg-blur {
		width: 100%;
		height: 100%;
		padding-top: 24px;
		overflow: hidden;
		
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		filter: blur(10px);
	}
	.bg-blur>img {
		display: block;
		margin: 0 auto;
	}

	/*公告详情页*/
	.bulletin-detail {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: auto;
		background-color: rgba(7, 17, 27, 0.8);

		backdrop-filter: blur(10px);
	}
	.detail-wrapper {
		min-height: 100%;
	}
	.detail-wrapper .detail-main {
		width: 80%;
		margin: 64px auto;
		color: rgb(255, 255, 255);
		padding-bottom: 64px;
	}
	.star-wrapper {
		line-height: 24px;
		margin: 6px auto 28px auto;
	}

	.detail-main .detail-seller-name {
		font-size: 16px;
		font-weight: 700;
		line-height: 16px;
	}

	.detail-title {
		display: flex;
		margin-bottom: 24px;
	}
	.detail-title .line {
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.detail-title .title {
		padding: 0 12px;
		font-size: 14px;
		font-weight: 700;
		line-height: 14px;
	}

	/*优惠信息*/
	.supports-content {
		font-size: 0;
		padding: 0 12px;
		margin-bottom: 28px;
	}
	.supports-content li {
		margin-bottom: 12px;
	}
	.supports-content li:last-child {
		margin-bottom: 0;
	}
	.supports-content .sup-icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.supports-content .decrease {
		background-image: url('decrease_2@2x.png');
	}
	.supports-content .discount {
		background-image: url('discount_2@2x.png');
	}
	.supports-content .guarantee {
		background-image: url('guarantee_2@2x.png');
	}
	.supports-content .invoice {
		background-image: url('invoice_2@2x.png');
	}
	.supports-content .special {
		background-image: url('special_2@2x.png');
	}

	.supports-content .sup-des {
		font-size: 12px;
		font-weight: 200;
		line-height: 16px;
	}
	.bulletin-content {
		padding: 0 12px;
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
	}

	/*底部关闭按钮*/
	.detail-close {
		position: relative;
		width: 32px;
		height: 32px;
		color: rgba(255, 255, 255, 0.5);
		margin: -64px auto 0 auto;
		font-size: 32px;
		clear: both;
	}
</style>
