<template>
  <div class="pokedexDetail pokedexDetailGbo">
    <pokedexDetailTitle :title="title" :isDisabled="isDisabled" @changeForm="changeForm" @submitData="submitData"></pokedexDetailTitle>
		<div class="pokedexDetail-hd">
			<a class="btn-changeHost" @click="popupVisible=true" title="修改记录"></a>
			<div class="img-box">
				<img :src="pokedexDetailData.img">
			</div>
			<div class="title">{{pokedexDetailData.name}}</div>
			<div class="info">
				<span v-if="pokedexDetailData.filter1">称号:{{pokedexDetailData.filter1['称号']}}</span>
				<span v-if="pokedexDetailData.filter2">阵营:{{pokedexDetailData.filter2['阵营']}}</span>
			</div>
		</div>
		<div class="pokedexDetail-from">
			<ul>
				<li class="wid50">
					<label>攻击力</label>
					<input v-model="dataGjl" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>魔力</label>
					<input v-model="dataMl" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>生命值</label>
					<input v-model="dataSmz" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="wid50">
					<label>魔法值</label>
					<input v-model="dataMfz" maxlength="8" class="textarea input" v-if="pokedexDetailData.kvs" :disabled="isDisabled">
				</li>
				<li class="mt10">
					<label>角色列传</label>
					<div class="textarea" contenteditable="true"><pre>{{dataJslz}}</pre></div>
					<textarea maxlength="300" v-model="dataJslz" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>世界树发言</label>
					<div class="textarea" contenteditable="true"><pre>{{dataSjsfy}}</pre></div>
					<textarea maxlength="300" v-model="dataSjsfy" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>武器</label>
					<div class="textarea" contenteditable="true"><pre>{{dataWq}}</pre></div>
					<textarea maxlength="300" v-model="dataWq" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>专属天赋</label>
					<div class="textarea" contenteditable="true"><pre>{{dataTf}}</pre></div>
					<textarea maxlength="300" v-model="dataTf" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>专属技</label>
					<div class="textarea" contenteditable="true"><pre>{{dataZsj}}</pre></div>
					<textarea maxlength="300" v-model="dataZsj" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>专属技能</label>
					<div class="textarea" contenteditable="true"><pre>{{dataZsjn}}</pre></div>
					<textarea maxlength="300" v-model="dataZsjn" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>来源</label>
					<div class="textarea" contenteditable="true"><pre>{{dataLy}}</pre></div>
					<textarea maxlength="300" v-model="dataLy" :disabled="isDisabled"></textarea>
				<li>
					<label>雕像属性</label>
					<div class="textarea" contenteditable="true"><pre>{{dataDxsx}}</pre></div>
					<textarea maxlength="300" v-model="dataDxsx" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>命运之链</label>
					<div class="textarea" contenteditable="true"><pre>{{dataMyzl}}</pre></div>
					<textarea maxlength="300" v-model="dataMyzl" :disabled="isDisabled"></textarea>
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
    		this.id = this.$route.query.id;
    		// 详情数据请求
    		this.$http.apiV0(`photostrategy/${this.id}/`).then(data => {
		    	this.pokedexDetailData = data.data;
    			this.title     = this.pokedexDetailData.name;
		    	this.dataGjl   = this.pokedexDetailData.kvs['攻击力'];
		    	this.dataMl    = this.pokedexDetailData.kvs['魔力'];
		    	this.dataSmz   = this.pokedexDetailData.kvs['生命值'];
		    	this.dataMfz   = this.pokedexDetailData.kvs['魔法值'];
		    	this.dataJslz  = this.pokedexDetailData.kvs['列传'];
		    	this.dataSjsfy = this.pokedexDetailData.kvs['世界树发言'];
		    	this.dataWq    = this.pokedexDetailData.kvs['武器'];
		    	this.dataTf    = this.pokedexDetailData.kvs['专属天赋'];
		    	this.dataZsj   = this.pokedexDetailData.kvs['专属技'];
		    	this.dataZsjn  = this.pokedexDetailData.kvs['专属技能'];
		    	this.dataLy    = this.pokedexDetailData.kvs['来源'];
		    	this.dataDxsx  = this.pokedexDetailData.kvs['雕像属性'];
		    	this.dataMyzl  = this.pokedexDetailData.kvs['命运之链'];
		    });
		    // 修改历史记录数据请求 v1
		    this.$http.apiV1(`photostrategy/modifyrecord/${this.id}/`).then(data => {
		    	this.changeListData = data.data;
		    });
    	},
    	data () {
    		return {
    			title: '',
    			pokedexDetailData: '',  // 详情数据
    			dataGjl: '',   					// 攻击力
    			dataMl: '',    					// 魔力
    			dataSmz: '',  					// 生命值
    			dataMfz: '',						// 魔法值
    			dataJslz: '',						// 角色列传
    			dataSjsfy: '',					// 世界树发言
    			dataWq: '',							// 武器
    			dataTf: '',							// 专属天赋
    			dataZsj: '',						// 专属技
    			dataZsjn: '',						// 专属技能
    			dataLy: '',							// 来源
    			dataDxsx: '',						// 雕像属性
    			dataMyzl: '',						// 命运之链
    			changeListData: '',			// 修改历史记录数据
    			popupVisible: false,    // 历史记录弹窗
    			isDisabled: true   // 是否可以编辑 true(不可编辑) false(可编辑)
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
    					filter1: this.pokedexDetailData.filter1['称号'],
	    				filter2: this.pokedexDetailData.filter2['阵容'],
	    				kvs: {
	    						'专属天赋': this.dataTf,
	    						'专属技': this.dataZsj,
	    						'专属技能': this.dataZsjn,
	    						'世界树发言': this.dataSjsfy,
	    						'列传': this.dataJslz,
	    						'命运之链': this.dataMyzl,
	    						'攻击力': this.dataGjl,
		    					'魔力': this.dataMl,
		    					'生命值': this.dataSmz,
		    					'魔法值': this.dataMfz,
		    					'武器': this.dataWq,
		    					'来源': this.dataLy,
		    					'雕像属性': this.dataDxsx
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
    	},
    };
</script>

<style type="text/scss" lang="scss">
</style>
