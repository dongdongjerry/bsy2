<template>
  <div class="pokedex">
    <vTitle title="图鉴">图鉴</vTitle>
    <ul class="pokedex-nav">
    	<li v-for="(item, index) in pokedexNav" @click="jump(item)">
  			<span class="img-box"><img v-lazy="item.img" alt="item.name"></span>
  			<h4>{{item.name}}</h4>
    	</li>
    </ul>
  </div>
</template>

<script>
import vTitle from '#/common/titleCommon'
export default {
  created () {
    // 图鉴一级导航数据
    this.getNavData();
  },
  data () {
  	return {
      type: '',             // 类型
      pokedexNav: '',       // 图鉴导航
  	}
  },
  methods: {
  	getNavData (id) {
  		let url = id?'photostrategy/boards/'+id+'/':'photostrategy/types/';
  		this.$http.apiV0(url).then(data => {
        this.pokedexNav = data.data;
    	});
  	},
  	jump (e) {
  		switch (e.name){
  			case '天空资料':
  			this.getNavData(e.id);
  			break;
  			case '物品手册':
  			this.getNavData(e.id);
  			break;
  			case '战斗手册':
  			this.getNavData(e.id);
  			break;
  			case '天空问答':
  				this.$router.push({name:'pokedexSky', query: {id: e.id, title: e.name}});
  				break;
  			case '称号图鉴':
  				this.$router.push({name:'pokedexTitle', query: {id: e.id, title: e.name}});
  				break;
  			default: this.$router.push({name:'pokedexList', query: {id: e.id, title: e.name}});
  		}
  	}
  },
  components: {
    vTitle
  }
}
</script>

<style type="text/scss" lang="scss">
	$src: '../../common/img/';
	.pokedex-nav{
		overflow: hidden;
		li{
			display: block;
			height: .9rem;
			padding: .25rem .2rem;
			position: relative;
			border-bottom: 5px solid #fff;
			.img-box{
				float:left;
				width: .9rem;
				height: .9rem;
				margin:0 .4rem 0 .8rem;
			}
			h4{
				line-height:.9rem;
				font-size: .36rem;
				color: #3C2819;
				font-weight: bold;
			}
			&:after{
				content: '';
				position: absolute;
				top: .42rem;
				right: .4rem;
				width: .34rem;
				height: .54rem;
				background: url( $src + 'ico-handbook-left.png') no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>
