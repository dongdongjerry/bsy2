<template>
 	<header class="vTitle pokedexDetailTitle">
  	<router-link to="/home" class="btn-return"></router-link>
		<h2 class="title">{{title}}</h2>
		<a class="btn-edit" v-if="isDisabled" @click="changeFormInfo()"></a>
		<a class="btn-save" v-if="!isDisabled" @click="submitForm()">提交</a>
  </header>
</template>

<script>
  export default {
	props: [
	  'title',
      'isDisabled'
	],
	data () {
	  return {
		
	  }
	},
	methods: {
	  changeFormInfo () {
		this.$http.apiV1(`photostrategies/users/${this.$uid}/power/`).then(data => {
          let a = data.data.result; // 编辑权限
          if(a){
            this.isDisabled = a;
            this.$emit('changeForm', a);
          }else{
            this.$router.push({name:'pokedexPowerTips'});
          }
        });
	  },
      submitForm () {
        this.$emit('submitData');
      }
	}
  };
</script>

<style type="text/scss" lang="scss">
</style>
