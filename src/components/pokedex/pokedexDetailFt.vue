<template>
  <div class="pokedexDetail pokedexDetailFt">
    <pokedexDetailTitle :title="title" :isDisabled="isDisabled" @changeForm="changeForm" @submitData="submitData"></pokedexDetailTitle>
		<div class="pokedexDetail-hd">
			<a class="btn-changeHost" @click="popupVisible=true" title="修改记录"></a>
			<div class="img-box">
				<img v-lazy="pokedexDetailData.img">
			</div>
			<div class="title">{{pokedexDetailData.name}}</div>
			<div class="info">
				<span v-if="pokedexDetailData.filter1">主炮类型:{{pokedexDetailData.filter1['主炮类型']}}</span>
			</div>
		</div>
		<div class="pokedexDetail-from">
			<h4 class="pokedexDetail-from-item-hd ico-01">初始属性</h4>
			<ul>
				<li class="wid50">
					<label>火力</label>
					<input v-model="dataList01Hl" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>装甲</label>
					<input v-model="dataList01Zj" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>机动</label>
					<input v-model="dataList01Jd" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>幸运</label>
					<input v-model="dataList01Xy" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
			</ul>
			<h4 class="pokedexDetail-from-item-hd ico-02">满改造属性</h4>
			<ul>
				<li class="wid50">
					<label>火力</label>
					<input v-model="dataList02Hl" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>装甲</label>
					<input v-model="dataList02Zj" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>机动</label>
					<input v-model="dataList02Jd" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>幸运</label>
					<input v-model="dataList02Xy" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
			</ul>
			<ul>
				<li>
					<label>主炮名称</label>
					<input v-model="dataListZpmc" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li>
					<label>发动时机</label>
					<input v-model="dataListFdsj" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
			</ul>
			<h4 class="pokedexDetail-from-item-hd ico-03">主炮效果</h4>
			<ul>
				<li>
					<label>威力</label>
					<input v-model="dataList03Wl" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li>
					<label>特殊</label>
					<input v-model="dataList03Ts" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
			</ul>
			<ul>
				<li>
					<label>光环效果</label>
					<input v-model="dataListGhxg" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li>
					<label>获取途径</label>
					<input v-model="dataListHqtj" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
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
		    	this.dataList01Hl = this.pokedexDetailData.kvs['初始属性'][0]['火力'];
		    	this.dataList01Zj = this.pokedexDetailData.kvs['初始属性'][0]['装甲'];
		    	this.dataList01Jd = this.pokedexDetailData.kvs['初始属性'][0]['机动'];
		    	this.dataList01Xy = this.pokedexDetailData.kvs['初始属性'][0]['幸运'];
		    	this.dataList02Hl = this.pokedexDetailData.kvs['满改造属性'][0]['火力'];
		    	this.dataList02Zj = this.pokedexDetailData.kvs['满改造属性'][0]['装甲'];
		    	this.dataList02Jd = this.pokedexDetailData.kvs['满改造属性'][0]['机动'];
		    	this.dataList02Xy = this.pokedexDetailData.kvs['满改造属性'][0]['幸运'];
		    	this.dataListZpmc = this.pokedexDetailData.kvs['主炮名称'];
		    	this.dataListFdsj = this.pokedexDetailData.kvs['发动时机'];
		    	this.dataList03Wl = this.pokedexDetailData.kvs['主炮效果'][0]['威力'];
		    	this.dataList03Ts = this.pokedexDetailData.kvs['主炮效果'][0]['特殊'];
		    	this.dataListGhxg = this.pokedexDetailData.kvs['光环效果及数值'];
		    	this.dataListHqtj = this.pokedexDetailData.kvs['获取途径'];
		    });
		    // 修改历史记录数据请求 v1
		    this.$http.apiV1(`photostrategy/modifyrecord/${this.id}/`).then(data => {
		    	this.changeListData = data.data;
		    });
    	},
    	data () {
    		return {
    			title: '',     // 头部
    			pokedexDetailData: '',  //详情数据
    			dataListZpmc: '',   // 主炮名称
    			dataListFdsj: '',   // 发动时机
    			dataList01Hl: '',   // 初始属性火力
    			dataList01Zj: '',		// 初始属性装甲
    			dataList01Jd: '',   // 初始属性机动
    			dataList01Xy: '',   // 初始属性幸运
    			dataList02Hl: '',   // 满改造属性火力
    			dataList02Zj: '',   // 满改造属性装甲
    			dataList02Jd: '',   // 满改造属性机动
    			dataList02Xy: '',   // 满改造属性幸运
    			dataList03Wl: '',   // 主炮效果威力
    			dataList03Ts: '',   // 主炮效果特殊
    			dataListGhxg: '',   // 光环效果
    			dataListHqtj: '',   // 获取途径
    			popupVisible: false,  // 编辑提示弹窗
    			changeListData: '',   // 修改历史记录
    			isDisabled: true     // 是否可以编辑 true(不可编辑) false(可编辑)
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
		    					'主炮名称': this.dataListZpmc,
	    						'初始属性': [
	    							{
	    								'火力': this.dataList01Hl,
	    								'幸运': this.dataList01Xy,
	    								'机动': this.dataList01Jd,
	    								'装甲': this.dataList01Zj
	    							}
	    						],
		    					'满改造属性': [
	    							{
	    								'火力': this.dataList02Hl,
	    								'幸运': this.dataList02Xy,
	    								'机动': this.dataList02Jd,
	    								'装甲': this.dataList02Zj
	    							}
	    						],
		    					'主炮效果': [
	    							{
	    								'威力': this.dataList03Wl,
	    								'特殊': this.dataList03Ts
	    							}
	    						],
		    					'发动时机': this.dataListFdsj,
		    					'光环效果及数值': this.dataListGhxg,
		    					'获取途径': this.dataListHqtj,
		    					'对白': ''
		    				}
	    			};
	    		this.$http.apiV1(`photostrategies/${this.id}/`, _data, 'post', this.$ac02).then(data =>{
	    				if(data.success) {
	    					this.isDisabled = true; 
	    					this.$toast('修改成功');
	    					console.log(_data);
	    				} else {
	    					this.$toast('修改失败');
	    				}
	        });
    		}
    	}
    };
</script>

<style type="text/scss" lang="scss">
  .pokedexDetailFt{}
</style>
