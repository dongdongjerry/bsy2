<template>
  <div class="pokedexSky">
    <vTitle :title="title"></vTitle>
    <div class="page-infinite-wrapper">
    	<router-link to="/pokedexSkyEdit" class="btn-new-q" title="编辑新问答">编辑新问答</router-link>
	    <div class="pokedex-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="100"
          infinite-scroll-immediate-check="full">
        <div v-for="item in listData" class="pokedex-list-item">
        	<router-link :to="{name: 'pokedexSkyEdit', query: {id: item.id}}">{{item.question}}</router-link>
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
  export default {
	  components: {
	    vTitle
	  },
  	created () {
	    this.title = this.$route.query.title;
	    this.id = this.$route.query.id;
	  },
	  data () {
	  	return {
	  		title: '',
	  		listData: [],
	  		page: 1, // 文章滚动加载页码
	  		limit: 17, // 每页显示17条
        listLength: '', // 判断是否需要继续滚动加载
        loading: false, // 控制是否可以加载
        full: true, // 是否手动
	  	}
	  },
	  methods: {
	  	loadMore () {
        if (this.listLength === 0){
          this.loading = false;
          return;
        }
        this.loading = true;
        this.$http.apiV0(`photostrategy/get_list_by_filter/${this.id}/`, {params: {page: this.page, limit: this.limit}}).then((data) => {
          setTimeout(() => {
            this.listLength = data.data.length;    // 是否继续滚动
            this.listData.push.apply(this.listData, data.data);
            this.loading = false;
          }, 1500);
        });
        this.page++;
      }
	  }
  };
</script>

<style type="text/scss" lang="scss">
	$src: '../../common/img/';
  .pokedexSky{
  	.btn-new-q{
  		display: block;
  		margin: .5rem 0 0;
  		height: .8rem;
  		background: url($src + 'btn-created-q.png') no-repeat;
  		background-size: 100% 100%;
  		text-align: center;
  		color: #E4B97A;
  		font-size: .26rem;
  		line-height: .8rem;
  	}
  	.page-infinite-wrapper{
  		padding: 0 .2rem .5rem;
  		height: calc(100% - 1.9rem);
  		overflow: hidden;
  		.pokedex-list{
  			margin-top:  .3rem;
  			border-bottom: 1px #cdc1b2 solid;
  		}
  		.pokedex-list-item{
  			a{
  				padding-bottom: .1rem;
  				line-height: .6rem;
  				font-size: .34rem;
  				color: #6F4E42;
  				border-top: 1px #cdc1b2 solid;
  				overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 2;
				  -webkit-box-orient: vertical;
				  word-break: break-all;
  			}
  		}
  	}
  }
</style>
