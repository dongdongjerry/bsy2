<template>
  <div class="pokedexDetail pokedexDetailFs">
    <pokedexDetailTitle :title="title" :isDisabled="isDisabled" @changeForm="changeForm" @submitData="submitData"></pokedexDetailTitle>
    <div class="pokedexDetail-hd">
			<a class="btn-changeHost" @click="popupVisible=true" title="修改记录"></a>
			<div class="img-box">
				<img :src="pokedexDetailData.img">
			</div>
			<div class="title">{{pokedexDetailData.name}}</div>
		</div>
		<div class="pokedexDetail-from">
			<ul>
				<li>
					<label>所属冈布奥</label>
					<div class="textarea" contenteditable="true"><pre>{{dataSsgba}}</pre></div>
					<textarea maxlength="300" v-model="dataSsgba" :disabled="isDisabled"></textarea>
				</li>
				<li>                                  
					<label>称号</label>
					<select v-if="pokedexDetailData.kvs" v-model="selected01" :disabled="isDisabled">
						<option v-for="(item, index) in dataCh" :selected="index===dateFlIndex">{{item}}</option>
					</select>
				</li>
				<li>
					<label>阵营</label>
					<select v-if="pokedexDetailData.kvs" v-model="selected02" :disabled="isDisabled">
						<option v-for="(item, index) in dataZy" :selected="index===dateFlIndex">{{item}}</option>
					</select>
				</li>
				<li>
					<label>描述</label>
					<div class="textarea" contenteditable="true"><pre>{{dataMs}}</pre></div>
					<textarea maxlength="300" v-model="dataMs" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>效果</label>
					<div class="textarea" contenteditable="true"><pre>{{dataXg}}</pre></div>
					<textarea maxlength="300" v-model="dataXg" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>能量获取方式</label>
					<div class="textarea" contenteditable="true"><pre>{{dataNlhqfs}}</pre></div>
					<textarea maxlength="300" v-model="dataNlhqfs" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>技能消耗</label>
					<div class="textarea" contenteditable="true"><pre>{{dataJnxh}}</pre></div>
					<textarea maxlength="300" v-model="dataJnxh" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>其他效果</label>
					<div class="textarea" contenteditable="true"><pre>{{dataQtxg}}</pre></div>
					<textarea maxlength="300" v-model="dataQtxg" :disabled="isDisabled"></textarea>
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
		    	this.dataSsgba = this.pokedexDetailData.kvs['所属冈布奥'];
		    	this.selected01 = this.pokedexDetailData.filter1['称号'];
		    	this.dataCh = this.pokedexDetailData.kvs['称号'];
		    	this.selected02 = this.pokedexDetailData.filter2['阵营'];
		    	this.dataZy = this.pokedexDetailData.kvs['阵营'];
		    	this.dataMs = this.pokedexDetailData.kvs['描述'];
		    	this.dataXg = this.pokedexDetailData.kvs['效果'];
		    	this.dataNlhqfs = this.pokedexDetailData.kvs['能量获取方式'];
		    	this.dataJnxh = this.pokedexDetailData.kvs['技能消耗'];
		    	this.dataQtxg = this.pokedexDetailData.kvs['其他效果'];
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
    			selected01: '',
    			selected02: '',
    			dateFlIndex: '',
    			dataSsgba: '',
    			dataCh: '',
    			dataZy: '',
    			dataMs: '',
    			dataXg: '',
    			dataNlhqfs: '',
    			dataJnxh: '',
    			dataQtxg: '',
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
    					filter1: this.selected01,
    					filter2: this.selected02,
	    				kvs: {
		    					'所属冈布奥': this.dataSsgba,
	    						'称号': this.dataCh,
	    						'阵营': this.dataZy,
	    						'描述': this.dataMs,
	    						'效果': this.dataXg,
	    						'能量获取方式': this.dataNlhqfs,
	    						'技能消耗': this.dataJnxh,
	    						'其他效果': this.dataQtxg,
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
