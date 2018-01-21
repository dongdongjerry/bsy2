<template>
  <div class="searchList search">
    <vTitle title="搜索"></vTitle>
    <header class="search-top">
      <input type="text" placeholder="请输入关键字搜索" v-model="searchVal" id="search">
      <a class="sure" @click="getData(searchVal);add(searchVal)">确定</a>
    </header>
    <section class="search-recommend" v-if="pokedexData.length>0">
      <h4 class="search-title title-border">图鉴</h4>
      <ul class="search-history">
        <li v-for="(item, index) in pokedexData" v-if="index<3">
          <router-link :to="{path: '/'}">
          {{item.title}}
          </router-link>
        </li>
      </ul>
      <router-link :to="{path: '/searchMore',query: {keyWord: searchVal, type: 1}}" class="search-more" v-if="pokedexData.length>3">查看更多“{{searchVal}}”图鉴 &gt;&gt;</router-link>
    </section>
    <section class="search-recommend" v-if="raidersData.length>0">
      <h4 class="search-title title-border">攻略</h4>
      <ul class="search-history">
        <li v-for="(item, index) in raidersData" v-if="index<3">
          <router-link :to="{path: '/'}">
            {{item.title}}
          </router-link></li>
      </ul>
      <router-link :to="{path: '/searchMore',query: {keyWord: searchVal, type: 0}}" class="search-more" v-if="raidersData.length>3">查看更多“{{searchVal}}”攻略 &gt;&gt;</router-link>
    </section>
    <section class="search-recommend" v-if="pokedskyData.length>0">
      <h4 class="search-title title-border">天空问答</h4>
      <ul class="search-history">
        <li v-for="(item, index) in pokedskyData" v-if="index<3">
          <router-link :to="{path: '/'}">
            {{item.title}}
          </router-link>
        </li>
      </ul>
      <router-link :to="{path: '/searchMore',query: {keyWord: searchVal, type: 2}}" class="search-more" v-if="pokedskyData.length>3">查看更多“{{searchVal}}”天空问答 &gt;&gt;</router-link>
    </section>
    <section class="search-recommend" v-if="noticeData.length>0">
      <h4 class="search-title title-border">资讯</h4>
      <ul class="search-history">
        <li v-for="(item, index) in noticeData" v-if="index<3">
          <router-link :to="{path: '/'}">
          {{item.title}}
          </router-link></li>
      </ul>
      <router-link :to="{path: '/searchMore',query: {keyWord: searchVal, type: 3}}" class="search-more" v-if="noticeData.length>3">查看更多“{{searchVal}}”资讯 &gt;&gt;</router-link>
    </section>
  </div>
</template>

<script>
import vTitle from '#/common/titleCommon'
import Store from '~/js/store';
export default {
  name: 'searchList',
  components: {
    vTitle,
    Store
  },
  created () {
    this.searchVal = this.$route.query.keyWord;
    this.getData(this.searchVal, true);
  },
  data () {
    return {// 搜索关键字
      pokedexData: [],  // 1 图鉴数据
      raidersData: [],  // 0 攻略数据
      noticeData: [],   // 3 资讯数据
      pokedskyData: [],  // 2 天空问答数据
      searchHistory: []  // 搜索历史
    }
  },
  methods: {
    add (word) {
      if (!word) {
        this.$toast('搜索不能为空');
        return;
      }
      this.searchHistory = Store.fetchArray('searchHistory');
      let repeatKeyWord = Store.fetchArray('searchHistory').find((value, index, arr) => {
        return Object.is(word, value)
      }); // 是否存在重复的关键字
      if (word.length > 0 && repeatKeyWord === undefined) { // 不重复and不为空的情况下保存历史记录
        this.searchHistory.unshift(word); // 向前插入,前面是最新的历史记录
        if (this.searchHistory.length > 10) this.searchHistory.pop(); // 只保存10条历史记录
        Store.saveArray('searchHistory', this.searchHistory);
      }
    },
    getData (keyWord, one) {
      // 更新当前路由
      if (!one) this.$router.push({name: 'searchList', query: {keyWord: keyWord}});
      // 更新数据
      this.raidersData = [];
      this.pokedexData = [];
      this.pokedskyData = [];
      this.noticeData = [];
      this.$http.apiV0('search/', {params: {word: keyWord}}).then(data => {
        if (data.data) {
          data.data.map(e => {
            switch (e.type) {
              case 0:this.raidersData.push(e);break;
              case 1:this.pokedexData.push(e);break;
              case 2:this.pokedskyData.push(e);break;
              case 3:this.noticeData.push(e);break;
            }
          })
        }
      })
    }
  }
};
</script>

<style type="text/scss" lang="scss">
  .search.searchList{
    box-sizing: border-box;
    padding: .4rem 0 .2rem;
    .search-top{
      width: 7rem;
      margin: 0 auto;
      .sure{
        width: 18%;
        padding: .06rem 0;
        float: right;
        border: 1px #B96145 solid;
        display: block;
        color: #F5EABA;
        background: #8B4531;
        border-radius: 0.05rem;
        font-size: 0.28rem;
        text-align: center;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }
      input{
        width: 80%;
        height: 0.5rem;
        line-height: 0.5rem;
        background-size: 5% auto;
        border: 1px #826830 solid;
        border-radius: 0.05rem;
        font-size: 0.28rem;
        text-indent: 2.5em;
        color: #513A2F;
        display: block;
        float: left;
        box-sizing: border-box;
        background: url("../../common/img/ico-search.png") 3% 50% no-repeat;
        background-size: .45rem auto;
      }
    }
    .search-recommend{
      width: 7rem;
      margin: .3rem auto 0;
      .search-title{
        font-size: 0.34rem;
        color: #623E30;
        line-height: 0.45rem;
        text-indent: 0.35rem;
        position: relative;
        &:before{
          content: "";
          position: absolute;
          width: 0.08rem;
          height: 0.25rem;
          position: absolute;
          top: 0.11rem;
          left: 0.15rem;
          background: #623E30;
        }
      }
      .title-border{
        padding-bottom: .2rem;
        border-bottom: 1px solid #cdc1b2;
      }
      .search-history{
        width: 100%;
        overflow: hidden;
        li{
          position: relative;
          border-bottom: 1px #cdc1b2 solid;
          padding: 0.12rem 0;
          a{
            display: block;
            font-size: 0.3rem;
            color: #6F4E42;
            padding: 0 .3rem;
          }
        }
      }
      .search-more{
        font-size: 0.24rem;
        color: #933D3D;
        line-height: 0.55rem;
        margin-left: 0.2rem;
      }
    }

  }
</style>
