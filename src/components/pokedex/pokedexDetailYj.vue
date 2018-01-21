<template>
  <div class="pokedexDetail pokedexDetailFs">
    <pokedexDetailTitle :title="title" :isDisabled="isDisabled" @changeForm="changeForm" @submitData="submitData"></pokedexDetailTitle>
    <div class="pokedexDetail-hd">
			<a class="btn-changeHost" @click="popupVisible=true" title="修改记录"></a>
			<div class="img-box">
				<img :src="pokedexDetailData.img">
			</div>
			<div class="title">{{pokedexDetailData.name}}</div>
			<div class="info">
				<span v-if="pokedexDetailData.filter1">稀有度:{{dataXyd()}}</span>
			</div>
		</div>
		<div class="pokedexDetail-from">
			<ul>
				<li>
					<label>产出途径</label>
					<div class="textarea" contenteditable="true"><pre>{{dataCctj}}</pre></div>
					<textarea maxlength="300" v-model="dataCctj" :disabled="isDisabled"></textarea>
				</li>
				<li>                                  
					<label>物品描述</label>
					<div class="textarea" contenteditable="true"><pre>{{dataWpms}}</pre></div>
					<textarea maxlength="300" v-model="dataWpms" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>使用效果</label>
					<div class="textarea" contenteditable="true"><pre>{{dataSyxg}}</pre></div>
					<textarea maxlength="300" v-model="dataSyxg" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>额外效果</label>
					<div class="textarea" contenteditable="true"><pre>{{dataEwxg}}</pre></div>
					<textarea maxlength="300" v-model="dataEwxg" :disabled="isDisabled"></textarea>
				</li>
			</ul>
		</div>

		<mt-popup
      class="pop-host"
      v-model="popupVisible"
      position="center">
      <h4 class="title">最新编辑记录</h4>
      <ul>
      	<li v-for="item in changeListData">
      		<span>{{item.user}}</span>于<span>{{item.editor_dt}}</span>编辑
      	</li>
      </ul>
      <a class="btn-pop-sure" @click="popupVisible=false">确定</a>
    </mt-popup>
  </div>
</template>

<script>
		import pokedexDetailTitle from '#/pokedex/pokedexDetailTitle'
    export default {
    	components: {
    		pokedexDetailTitle
    	},
    	created () {
    		// 获取详情ID
    		this.id = this.$route.query.id;
    		// 详情数据请求
    		this.$http.apiV0(`photostrategy/${this.id}/`).then(data => {
		    	this.pokedexDetailData = data.data;
		    	this.title = this.pokedexDetailData.name;
		    	this.dataXydNum = this.pokedexDetailData.filter1['稀有度'];
		    	this.dataCctj = this.pokedexDetailData.kvs['产出途径'];
		    	this.dataWpms = this.pokedexDetailData.kvs['描述'];
		    	this.dataSyxg = this.pokedexDetailData.kvs['使用效果'];
		    	this.dataEwxg = this.pokedexDetailData.kvs['额外效果'];
		    });
		    // 修改历史记录数据请求 v1
		    this.$http.apiV1(`photostrategy/modifyrecord/${this.id}/`).then(data => {
		    	this.changeListData = data.data;
		    });
    	},
    	data () {
    		return { 
    			title: '', // 标题
    			pokedexDetailData: '',
    			dataXydNum: '',
    			dataXyd: ()=>{
    				let x = "";
    				for(let i = 0;i < this.dataXydNum;i++){
    					x += '★';
    				}
    				return x;
    			},
    			dataCctj: '',
    			dataWpms: '',
    			dataSyxg: '',
    			dataEwxg: '',
    			isDisabled: true,
    			popupVisible: false,
    			changeListData: ''
    		}
    	},
    	methods: {
    		changeForm (e) {
    			console.log(e);
    			this.isDisabled = !e;
    			this.$toast('请开始编辑内容');
    		},
    		submitData () {
    			let _data = {
	    				kvs: {
		    					'产出途径': this.dataCctj,
	    						'额外效果': this.dataEwxg,
	    						'使用效果': this.dataSyxg,
	    						'描述': this.dataWpms
		    				}
	    			};
	    		this.$http.apiV1(`photostrategies/${this.id}/`, _data, 'post', this.$ac02).then(data =>{
	    				if(data.success) {
	    					this.isDisabled = true; 
	    					this.$toast('修改成功');
	    				} else {
	    					this.$toast('修改失败');
	    				}
	        });
    		}
    	}
    };
</script>

<style type="text/scss" lang="scss">
  .pokedexDetailFs{}
</style>