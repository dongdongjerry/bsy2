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
					<label>分类</label>
					<select v-model="selected" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
						<option v-for="(item, index) in dataFl" :selected="index===dateFlIndex">{{item}}</option>
					</select>
				</li>
				<li>
					<label>基础属性</label>
					<div class="textarea" contenteditable="true"><pre>{{dataJcsx}}</pre></div>
					<textarea maxlength="300" v-model="dataJcsx" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>神器属性</label>
					<div class="textarea" contenteditable="true"><pre>{{dataSqsx}}</pre></div>
					<textarea maxlength="300" v-model="dataSqsx" :disabled="isDisabled"></textarea>
				</li>
				<li>                                  
					<label>列传</label>
					<div class="textarea" contenteditable="true"><pre>{{dataLz}}</pre></div>
					<textarea maxlength="300" v-model="dataLz" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>称号加成</label>
					<div class="textarea" contenteditable="true"><pre>{{dataChjc}}</pre></div>
					<textarea maxlength="300" v-model="dataChjc" :disabled="isDisabled"></textarea>
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
		    	this.dataXydNum = this.pokedexDetailData.kvs['稀有度'];
		    	this.dataFl = this.pokedexDetailData.kvs['分类'];
		    	this.selected = this.pokedexDetailData.filter1['分类'];
		    	this.dataJcsx = this.pokedexDetailData.kvs['基础属性'];
		    	this.dataSqsx = this.pokedexDetailData.kvs['神器属性'];
		    	this.dataLz = this.pokedexDetailData.kvs['列传'];
		    	this.dataChjc = this.pokedexDetailData.kvs['称号加成'];
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
    			dataFl: '',
    			dataJcsx: '',
    			dataSqsx: '',
    			dataLz: '',
    			dataChjc: '',
    			isDisabled: true,
    			popupVisible: false,
    			changeListData: '',
    			selected: '',
    			dateFlIndex: ''
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
    					filter1: this.selected,
	    				kvs: {
		    					'分类': this.dataFl,
	    						'列传': this.dataLz,
	    						'基础属性': this.dataJcsx,
	    						'神器属性': this.dataSqsx,
	    						'称号加成': this.dataChjc,
	    						'稀有度': this.dataXydNum
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
