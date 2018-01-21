<template>
	<div class="tab-list" :class="{'tab-list2': activeTab02}">
    	<div class="tab-list-type">
        <div class="tab-item" :class="{'on': tabIsShow01}">
          <p class="selected-text" @click="tabIsShow01=!tabIsShow01">{{activeTab01}}</p>
          <ul>
            <li @click="changeArticleList('1', item)" v-for="item in list01">{{item}}</li>
          </ul>
        </div>
        <div class="tab-item" :class="{'on': tabIsShow02}" v-if="activeTab02">
          <p class="selected-text" @click="tabIsShow02=!tabIsShow02">{{activeTab02}}</p>
          <ul>
            <li @click="changeArticleList('2', item)" v-for="item in list02">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
    	props: ['tabListData'],
    	watch: {
    		'tabListData' (val, oldval) {
    			this.activeTab01 = Object.keys(val.filter1)[0];
	    		if(val.filter2)this.activeTab02 = Object.keys(val.filter2)[0];
	    		this.list01 = val.filter1[this.activeTab01];
	    		if(val.filter2)this.list02 = val.filter2[this.activeTab02];
    		}
    	},
    	data () {
    		return {
    			tabIsShow01: false,
    			tabIsShow02: false,
    			activeTab01: '',
    			activeTab02: '',
    			list01: [],
    			list02: [],
    		}
    	},
    	methods: {
		   changeArticleList (tab, e) {
		    if(tab == '1'){
	    		this.tabIsShow01 = false;
	    		this.tabIsShow02 = false;
	      	this.activeTab01 = e;
		    }
		    else if(tab == "2"){
	    		this.tabIsShow01 = false;
	    		this.tabIsShow02 = false;
	      	this.activeTab02 = e;
		    }
		    	this.$emit('changeTab', [this.activeTab01, this.activeTab02]);
		   }
		}
  };
</script>

<style type="text/scss" lang="scss">
	
</style>
