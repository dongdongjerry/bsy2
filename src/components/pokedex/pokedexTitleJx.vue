<template>
 <div class="pokedexTitleList pokedexTitleJx">
   <router-link to="/" v-for="(item, index) in dataList" :key="index">
   	<div class="img-box">
   		<img :src="item.img" alt="item.name">
   	</div>
   	<p>{{item.name}}</p>
   </router-link>
 </div>
</template>

<script>
    export default {
    	created () {
    		this.id = this.$route.query.id;
    		this.filter1 = this.$route.query.filter1;
    		this.$http.apiV0(`photostrategy/get_list_by_filter/${this.id}/`, {params: {page: this.page, limit: this.limit, filter1: this.filter1}}).then((data) => {
	            this.dataList = data.data.data;
	        });
    	},
    	data () {
    		return {
    			dataList: '',
    			dataTitle: '',
    			page: 1,
    			limit: 50
    		}
    	}
    };
</script>

<style type="text/scss" lang="scss">

  .pokedexTitleJx{
  	a{
  		&:before{
  			width: .5rem;
  			right: -.4rem;
  		}
  		&:nth-child(1){
				left: .2rem;
				top: 3.9rem;
				&:after{
					display:none;
				}
  		}
  		&:nth-child(2){
				left: 1.5rem;
				top: 3.9rem;
				&:after{
					display:none;
				}
  		}
  		&:nth-child(3){
				left: 2.8rem;
				top: 3.9rem;
				&:after{
					display:none;
				}
  		}
  		&:nth-child(4){
				left: 4.1rem;
				top: 3.9rem;
				&:before{
					width: .3rem;
					right: -.18rem;
				}
				&:after{
					height: 2rem;
				}
  		}
  		&:nth-child(5){
				left: 5.7rem;
				top: 2.9rem;
				&:before,&:after{
					display:none;
				}
  		}
  		&:nth-child(6){
				left: 5.7rem;
				top: 4.8rem;
				&:before,&:after{
					display:none;
				}
  		}
  	}
  }
</style>
