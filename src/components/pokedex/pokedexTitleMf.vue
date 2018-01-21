<template>
 <div class="pokedexTitleList pokedexTitleMf">
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

  .pokedexTitleMf{
  	a{
  		
  		&:nth-child(1){
				left: .2rem;
				top: 5.9rem;
				&:after{
					height: 5rem;
				}
  		}
  		&:nth-child(2){
				left: 1.5rem;
				top: 3.35rem;
				&:after{
					height: 1.8rem;
				}
  		}
  		&:nth-child(3){
				left: 1.5rem;
				top: 8.3rem;
				&:after{
					height: 1.8rem;
				}
  		}
  		&:nth-child(4){
				left: 2.8rem;
				top: 2.44rem;
				&:after{
					height: 1.5rem;
				}
  		}
  		&:nth-child(5){
				left: 2.8rem;
				top: 4.26rem;
				&:after{
					height: 1.5rem;
				}
  		}
  		&:nth-child(6){
				left: 2.8rem;
				top: 7.4rem;
				&:after{
					height: 1.5rem;
				}
  		}
  		&:nth-child(7){
				left: 2.8rem;
				top: 9.2rem;
				&:after{
					height: 1.5rem;
				}
  		}
  		&:nth-child(8){
				left: 4.2rem;
				top: 1.7rem;
				&:after{
					height: 1rem;
				}
  		}
  		&:nth-child(9){
				left: 4.2rem;
				top: 3.2rem;
				&:after{
					height: 1rem;
					margin-top: -.3rem;
				}
  		}
  		&:nth-child(10){
				left: 4.2rem;
				top: 5.05rem;
				&:after{
					height: 1.2rem;
					margin-top: .1rem;
				}
  		}
  		&:nth-child(11){
				left: 4.2rem;
				top: 6.6rem;
				&:after{
					height: 1.2rem;
				}
  		}
  		&:nth-child(12){
				left: 4.2rem;
				top: 8.15rem;
				&:after{
					height: 1.1rem;
					margin-top: .35rem;
				}
  		}
  		&:nth-child(13){
				left: 4.2rem;
				top: 9.95rem;
				&:after{
					height: 1.2rem;
					margin-top: -.05rem;
				}
  		}
  		&:nth-child(14){
				left: 5.7rem;
				top: 1rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(15){
				left: 5.7rem;
				top: 2.15rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(16){
				left: 5.7rem;
				top: 3.4rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(17){
				left: 5.7rem;
				top: 4.5rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(18){
				left: 5.7rem;
				top:5.8rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(19){
				left: 5.7rem;
				top: 6.9rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(20){
				left: 5.7rem;
				top: 8rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(21){
				left: 5.7rem;
				top: 9.1rem;
				&:after,&:before{
					display: none;
				}
  		}
  		&:nth-child(22){
				left: 5.7rem;
				top: 10.2rem;
				&:after,&:before{
					display: none;
				}
  		}
  	}
  }
</style>
