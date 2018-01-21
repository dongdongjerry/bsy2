<template>
  <div class="pokedexList">
  	<vTitle :title="title"></vTitle>
    <pokedexTabList :tabListData="tabListData" @changeTab="changeTab"></pokedexTabList>
    <div class="page-infinite-wrapper">
	    <div class="pokedex-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="100"
          infinite-scroll-immediate-check="full">
        <div v-for="item in listData" class="pokedex-list-item">
        	<router-link :to="{name: goRounter(), query: {id: item.id}}">
	          <div class="img-box">
	            <img v-lazy="item.img" :alt="item.name">
	          </div>
	          <p>{{item.name}}</p>
          </router-link>
        </div>
	     </div>
      <p v-show="loading" v-if="" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    	</div>
    </div>
  </div>
</template>

<script>
		import vTitle from '#/common/titleCommon'
		import pokedexTabList from '#/pokedex/pokedexTabList'
    export default {
    	created () {
		    // 攻略类型数据
		    this.title = this.$route.query.title;
		    this.id = this.$route.query.id;
		    this.$http.apiV0(`photostrategy/get_list_by_filter/${this.id}/`).then(data => {
		    	this.tabListData = data.data;
		    });
		  },
		  data () {
		  	return {
		  		title: '',
		  		tabListData: '', // 下拉数据
		  		listData: [],  // 列表数据
		  		page: 1, // 文章滚动加载页码
		  		limit: 28, // 每页显示28条
	        listLength: '', // 判断是否需要继续滚动加载
	        loading: false, // 控制是否可以加载
	        full: true, // 是否手动
		  	}
		  },
		  methods: {
		    changeTab (e) {
		    	console.log(e);
		    	if(e[0] === Object.keys(this.tabListData.filter1)[0]) e[0] = '';
		    	if(e[1]){
		    		if(e[1] === Object.keys(this.tabListData.filter2)[0]) e[1] = '';
		    	} 
		    	this.page = 1;
	        this.listLength = '';
	        this.loading = false;
	        this.$http.apiV0(`photostrategy/get_list_by_filter/${this.id}/`, {params: {page: this.page, limit: this.limit, filter1: e[0], filter2: e[1]}}).then((data) => {
	            this.listLength = data.data.data.length;
	            this.listData = data.data.data;
	        });
	        this.page++;
		    },
		    // 下拉加载
	      loadMore () {
	        if (this.listLength === 0){
	          this.loading = false;
	          return;
	        }
	        this.loading = true;
	        this.$http.apiV0(`photostrategy/get_list_by_filter/${this.id}/`, {params: {page: this.page, limit: this.limit}}).then((data) => {
	          setTimeout(() => {
	            this.listLength = data.data.data.length;    // 是否继续滚动
	            this.listData.push.apply(this.listData, data.data.data);
	            this.loading = false;
	          }, 1500);
	        });
	        this.page++;
	      },
	      goRounter () {
	      	switch(this.title){
			    	case '冈布奥图鉴': return 'pokedexDetailGbo';break;
			    	case '飞艇图鉴': return 'pokedexDetailFt';break;
			    	case '符石图鉴': return 'pokedexDetailFs';break;
			    	case '装备图鉴': return 'pokedexDetailZb';break;
			    	case '神器图鉴': return 'pokedexDetailSq';break;
			    	case '道具图鉴': return 'pokedexDetailDj';break;
			    	case '药剂图鉴': return 'pokedexDetailYj';break;
			    	case '魔法图鉴': return 'pokedexDetailMf';break;
			    	case '技能图鉴': return 'pokedexDetailJn';break;
			    	case '怪物图鉴': return 'pokedexDetailGw';break;
			    }
	      }
		  },
		  components: {
		    vTitle,
		    pokedexTabList  
		  }
    };
</script>

<style type="text/scss" lang="scss">
  .pokedexList{
  	.page-infinite-wrapper{
  		height: calc(100% - 1.1rem);
  	}
  	.pokedex-list{
  		margin-top: .2rem;
  		overflow: hidden;
  		padding: 0 .2rem;
  		.pokedex-list-item{
  			float: left;
  			width: 25%;
  			margin-top: .2rem;
  			height: 1.65rem;
  			.img-box{
  				margin: 0 auto;
  				width: .9rem;
  				height: .9rem;
  			}
  			p{
  				padding: 0 20%;
  				text-align: center;
  				font-size: .22rem;
  				color: #3C2519;
  				overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
  			}
  		}
  	}
  }
</style>
