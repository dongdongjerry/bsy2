<template>
<div class="pokedexTitle">
	<vTitle :title="title"></vTitle>
	<div class="tab-list">
		<div class="tab-list-type">
			<div class="tab-item" :class="{'on': tabIsShow01}">
        <p class="selected-text" @click="tabIsShow01=!tabIsShow01">{{activeTab01}}</p>
        <ul>
          <li @click="changeArticleList(index, item)" v-for="(item, index) in tabList">{{item}}</li>
        </ul>
      </div>
		</div>
	</div>
  <router-view></router-view>
</div>
</template>

<script>
		import vTitle from '#/common/titleCommon'
    export default {
    	components: {
		    vTitle,
		  },
    	created () {
    		this.id = this.$route.query.id;
    		this.title = this.$route.query.title;
    		this.$http.apiV0(`photostrategy/get_list_by_filter/${this.id}/`).then(data => {
		    	this.tabList = data.data.filter1['称号类型'];
		    	this.activeTab01 = this.tabList[0];
    			this.$router.push({name:'pokedexTitleMx', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
		    });
		  },
    	data () {
    		return {
    			title: '',
    			tabList: '',
    			tabIsShow01: false,
    			activeTab01: ''
    		}
    	},
    	methods: {
		   changeArticleList (tab, e) {
    		this.tabIsShow01 = false;
      	this.activeTab01 = e;
      	switch(e){
      		case '冒险系': 
      			this.$router.push({name:'pokedexTitleMx', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
      			break;
      		case '魔法系': 
      			this.$router.push({name:'pokedexTitleMf', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
      			break;
      		case '战士系': 
      			this.$router.push({name:'pokedexTitleZs', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
      			break;
      		case '巨龙系': 
      			this.$router.push({name:'pokedexTitleJl', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
      			break;
      		case '恶魔系': 
      			this.$router.push({name:'pokedexTitleEm', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
      			break;
      		case '机械学': 
      			this.$router.push({name:'pokedexTitleJx', query: {id: this.id,filter1: this.activeTab01,title: this.title}});
      			break;
      	}

		   }
			}
    };
</script>

<style type="text/scss" lang="scss">
  .pokedexTitle{}
</style>
