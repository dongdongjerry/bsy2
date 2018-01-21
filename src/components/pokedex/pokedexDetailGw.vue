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
				<span v-if="pokedexDetailData.filter1">迷宫：{{pokedexDetailData.filter1['迷宫'][0]}}</span>
			</div>
		</div>
		<div class="pokedexDetail-from">
			<ul>
				<li>
					<label>怪物特性</label>
					<div class="textarea" contenteditable="true"><pre>{{dataGwtx}}</pre></div>
					<textarea maxlength="300" v-model="dataGwtx" :disabled="isDisabled"></textarea>
				</li>
			</ul>
			<h4 class="pokedexDetail-from-item-hd ico-04">偷盗物品</h4>
			<ul>
				<li>                                  
					<label>普通物品</label>
					<div class="textarea" contenteditable="true"><pre>{{dataPtwp}}</pre></div>
					<textarea maxlength="300" v-model="dataPtwp" :disabled="isDisabled"></textarea>
				</li>
				<li>
					<label>高级物品</label>
					<div class="textarea" contenteditable="true"><pre>{{dataGjwp}}</pre></div>
					<textarea maxlength="300" v-model="dataGjwp" :disabled="isDisabled"></textarea>
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
		    	this.dataGwtx = this.pokedexDetailData.kvs['怪物特性'];
		    	this.dataPtwp = this.pokedexDetailData.kvs['偷盗物品'][0]['普通物品'];
		    	this.dataGjwp = this.pokedexDetailData.kvs['偷盗物品'][0]['高级物品'];
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
    			dataGwtx: '',
    			dataPtwp: '',
    			dataGjwp: '',
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
		    					'偷盗物品': [
		    						{
		    							'高级物品': this.dataGjwp,
		    							'普通物品': this.dataPtwp
		    						}
		    					],
	    						'怪物特性': this.dataGwtx
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