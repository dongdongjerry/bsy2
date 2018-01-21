<template>
  <div class="pokedexSkyEdit">
    <pokedexDetailTitle :title="title" :isDisabled="isDisabled" @changeForm="changeForm" @submitData="submitData"></pokedexDetailTitle>
    <div class="edit-box">
    <img :src="wdImg">
    	<form class="edit-img" enctype="multipart/form-data" :class="{noImg: !wdImg}" @submit.prevent="submit" ref="imgFile">
    		<input type="file" name="image" class="btn-file" :disabled="isDisabled" @change="updateImg($event)" accept="image/jpeg,image/png,image/gif">
    	</form>
    	<div class="textarea-box">
    		<div contenteditable="true" class="edit-text">{{textQ}}</div>
    		<textarea class="edit-q" :disabled="isDisabled" placeholder="请在此处输入问题" v-model="textQ"></textarea>
    	</div>
    	<div class="textarea-box">
    		<div contenteditable="true" class="edit-text">{{textA}}</div>
    		<textarea class="edit-a" :disabled="isDisabled" placeholder="请在此处输入答案" v-model="textA"></textarea>
    	</div>
    </div>
  </div>
</template>

<script>
	import pokedexDetailTitle from '#/pokedex/pokedexDetailTitle'
  export default {
  	components: {
	    pokedexDetailTitle
	  },
	  created () {
	  	this.id = this.$route.query.id;
	  	if(this.id){
		  	this.$http.apiV1(`photostrategies/tiankongwenda_index/${this.id}/`).then(data => {
			    	this.dataWd = data.data;
			    	this.textQ = this.dataWd.question;
			    	this.textA = this.dataWd.answer;
			    	this.wdImg = this.dataWd.img;
			    });
	  	}
	  },
	  data () {
	  	return {
	  		title: '编辑问答',
	  		isDisabled: true,
	  		dataWd: '',
	  		textQ: '',
	  		textA: '',
	  		wdImg: '',
	  		imgId: '',
	  	}
	  },
	  methods: {
    		changeForm (e) {
    			this.isDisabled = !e;
    			this.wdImg = "";
    			this.$toast('请开始编辑内容');
    		},
    		submitData () {
    			let _data = {
    					answer: this.textA,
    					question: this.textQ
	    			};
	    		this.$http.apiV1(`photostrategies/tiankongwenda/${this.id}/`, _data, 'post', this.$ac02).then(data =>{
	    				if(data.success) {
	    					this.isDisabled = true;
	    					this.$toast('修改成功');
	    				} else {
	    					this.$toast('修改失败');
	    				}
	        });
    		},
    		submit () {
    			let fromData = new FormData(this.$refs.imgFile);
    			fromData.append('extra', 'others');
    			 this.$http.apiV1('image/', fromData, 'post', this.$ac02).then(data =>{
		      	console.log(data);
		      });
    		},
    		updateImg (e) {
          this.submit(e);
//    			 let file = e.target.files[0];
//    			 let reader = new FileReader();
//    			 let that = this;
//    			 reader.readAsDataURL(file);
//		       reader.onload = function(e) {
//		         that.wdImg = this.result;
//		       }
		     //  let image = new FormData();
		     //  image.append('url', that.wdImg);
		     //  image.append('extra', 'other');
		     //  console.log(image);
		     //  this.$http.apiV1('image/', image, 'post', this.$ac02).then(data =>{
		     //  	console.log(data);
		     //  });
    		}
    	}
  };
</script>

<style type="text/scss" lang="scss">
	$src: '../../common/img/';
  .pokedexSkyEdit{
  	padding: .3rem;
  	.edit-box{
  		.edit-img{
  			position: relative;
  			margin-bottom: .4rem;
  			min-height: 2.2rem;
  			&.noImg{
  				background: url($src + 'bg-img-update.png') no-repeat;
  				background-size: 100% 100%;
  			}
  			img{
  				display: block;
					margin: 0 auto;
					max-width: 100%;
  			}
  			.btn-file{
  				position: absolute;
  				top: 0;
  				left: 0;
  				width: 100%;
  				height: 100%;
  				opacity: 0;
  			}
  		}
  		.textarea-box{
  			position: relative;
  			overflow: hidden;
  			font-size: .34rem;
  			color: #a1998f;
  			padding-bottom: .2rem;
  			&:nth-child(2){
  				margin-bottom: .2rem;
  			}
  			.edit-text{
  				min-height: .5rem;
  				height: auto;
  				position: relative;
  				opacity: 0;
  			}
  			textarea{
  				color: #a1998f;
	  			position: absolute;
	  			z-index: 4;
	  			left: 0;
	  			top: 0;
	  			width: 100%;
	  			height: calc(100% - 1px);
	  			background: none;
	  			border: none;
	  			outline: none;
	  			resize: none;
	  			overflow: hidden;
	  			&::placeholder{
	  				color: lightgrey;
	  			}
	  		}
	  		.edit-q{
	  			border-bottom:1px solid #000;
	  			font-weight: bold;
	  		}
  		}
  	}
  }
</style>
