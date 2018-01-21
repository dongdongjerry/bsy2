<template>
  <div class="pokedexPowerQus">
    <pokedexDetailTitle title="投稿攻略" :isDisabled="isDisabled" @submitData="submitData"></pokedexDetailTitle>
    <div class="listQ-box">
    	<p class="title">第一步：答题25道</p>
    	<div class="listQ">
    		<div class="listQ-item" v-show="itemShow(index)" v-for="(item, index) in listQ">
    			<p>{{index + 1}}.{{item.question}}</p>
    			<div class="radio-box" v-for="(item2, index) in item.answers">
    				<input type="radio" :name="setRadioName(item.id)" :id="addItemId(item.id,index)" @click="radioChecked(item.id,index)">
    				<label :for="addItemId(item.id, index)" >{{item2.answer}}</label>
    			</div>
    		</div>
    	</div>
			<div class="btn-box">
				<a title="上一页" v-show="nowPage > 1" @click="nowPage--;">上一页</a>
				<a title="下一页" v-show="nowPage < maxPage()" @click="nowPage++;">下一页</a>
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
  		this.$http.apiV1(`photostrategies/questions/`,{params: {limit:this.limit}}).then(data => {
	    	this.listQ = data.data;
	    });
  	},
  	data () {
  		return {
  			isDisabled: false,
  			listQ: '',     // 问题列表数据
  			limit: 100,
  			nowPage: 1,
  			showPage: 5,  // 每页显示个数
  			answers: [],	 // 答案
  			maxPage () {   // 总共页数
  				return this.listQ.length / this.showPage;
  			},
  			itemShow (index) {   // 当前显示区间
  				return index >= this.showPage * (this.nowPage - 1) && index < this.showPage * this.nowPage;
  			}
  		}
  	},
  	methods: {
  		// 按钮name
  		setRadioName (index) {
  			return 'question_' + index;
  		},
  		// 按钮ID
  		addItemId (id,index) {
  			return 'question_' + id + '_' + index;
  		},
  		// 按钮选择
  		radioChecked (id,index) {
  			this.answers[id - 6] = index;
  		},
  		// 提交答案
  		submitData () {
  			// 正确答案
  			// this.answers = [0,1,0,2,0,2,2,1,1,2,1,0,1,2,2,1,1,0,2,0,2,2,1,1,2];
  			let length = this.answers.length;
  			if(length < this.listQ.length || !this.answers.indexOf('empty')){
  				this.$toast('您有未填写的题目,请填写完整后再提交');
  			}
  			else{
  				let data = {
  					answer_ids: this.answers
  				};
  				// 答案接口数据
  				this.$http.apiV1('/photostrategies/questions/verify/', data, 'post').then(data =>{
  					let result = data.data.result;
  					if(result){
  						this.$toast('恭喜您回答正确率超过90%,准备进入下一步');
  					}
  					else{
  						this.$toast('非常抱歉,您的答案正确率低于90%,如果是攻略大神的话，一定可以全对！');
  					}
  				});
  			}
  		}
  	}
  };
</script>

<style type="text/scss" lang="scss">
  .pokedexPowerQus{
  	.listQ-box{
  		margin-top: .5rem;
  		padding: 0 .3rem;
  		.title{
  			font-size: .48rem;
  			font-weight: bold;
  			color: #865840;
  			padding-bottom: .2rem;
  			border-bottom: 1px #cdc1b2 solid;
  		}
  		.listQ-item{
  			margin: .2rem 0;
  			color: #865840;
  			font-size: .34rem;
  			p{
  				line-height: .6rem;
  			}
  			.radio-box{
  				line-height: .5rem;
  				input[type="radio"]{
  					opacity: 0;
  					&:checked + label:before{
  						background:#c6ad80;
  						border-color: #441900;
  						border-width: .08rem;
  						width:.22rem;
  						height: .22rem;
  					}
  					&:checked + label:after{
  						display:block;
  					}
  				}
  				label{
  					position: relative;
  					padding-left: .2rem;
  					&:before{
  						content: '';
  						position: absolute;
  						width: .3rem;
							height: .3rem;
							border: 2px solid #825f4b;
							border-radius: 50%;
							left: -.32rem;
							top: .04rem;
  					}
  				}
  			}
  		}
  	}
  	.btn-box{
  		overflow: hidden;
  		text-align: center;
  		margin: .5rem 0;
  		a{
  			display: inline-block;
  			padding: .1rem .25rem;
  			background: #8b4531;
  			color: #f5eaba;
  			border-radius: .1rem;
  			margin: 0 .2rem;
  			font-size: .26rem;
  		}
  	}
  }
</style>
