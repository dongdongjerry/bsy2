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
				<span v-if="pokedexDetailData.filter1">魔法系别:{{pokedexDetailData.filter1['魔法系别']}}</span>
				<span v-if="pokedexDetailData.filter2">魔法阶位:{{pokedexDetailData.filter2['魔法阶位']}}</span>
			</div>
		</div>
		<div class="pokedexDetail-from">
			<ul>
				<li>
					<label>获取方式</label>
					<div class="textarea" contenteditable="true"><pre>{{dataHqfs}}</pre></div>
					<textarea maxlength="300" v-model="dataHqfs" :disabled="isDisabled"></textarea>
				</li>
				<li>                                  
					<label>描述</label>
					<div class="textarea" contenteditable="true"><pre>{{dataMs}}</pre></div>
					<textarea maxlength="300" v-model="dataMs" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>计算公式</label>
					<div class="textarea" contenteditable="true"><pre>{{dataJsgs}}</pre></div>
					<textarea maxlength="300" v-model="dataJsgs" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>强化要素</label>
					<div class="textarea" contenteditable="true"><pre>{{dataQhys}}</pre></div>
					<textarea maxlength="300" v-model="dataQhys" :disabled="isDisabled"></textarea>
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
		    	this.dataHqfs = this.pokedexDetailData.kvs['获取方式'];
		    	this.dataMs = this.pokedexDetailData.kvs['描述'];
		    	this.dataJsgs = this.pokedexDetailData.kvs['计算公式'];
		    	this.dataQhys = this.pokedexDetailData.kvs['强化要素'];
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
    			dataHqfs: '',
    			dataMs: '',
    			dataJsgs: '',
    			dataQhys: '',
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
		    					'获取方式': this.dataHqfs,
	    						'描述': this.dataMs,
	    						'计算公式': this.dataJsgs,
	    						'强化要素': this.dataQhys
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
