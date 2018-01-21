<template>
  <div class="pokedexPowerTips">
		<vTitle title="图鉴攻略"></vTitle>
    <div class="tip-text">
    	<p>你还没有获得图鉴<br>攻略的撰写权限噢</p>
    	<router-link to="pokedexPowerQus">点我进行权限申请</router-link>
    </div>
  </div>
</template>

<script>
	import vTitle from '#/common/titleCommon'
  export default {
  	components: {
      vTitle
    },
    data () {
      return {
        
      }
    }
  };
</script>

<style type="text/scss" lang="scss">
  .pokedexPowerTips{
  	position: relative;
  	text-align: center;
  	height: calc(100vh - .9rem);
  	.tip-text{
  		position: absolute;
  		top: 50%;
  		left: 0;
  		width: 100%;
  		transform: translateY(-50%);
  		p{
  			font-size: .4rem;
  			color: #865840;
  			font-weight: bold;
				margin-bottom: .6rem;
  		}
			a{
				color: #946c50;
				font-size: .3rem;
				text-decoration: underline;
  		}
  	}
  }
</style>
