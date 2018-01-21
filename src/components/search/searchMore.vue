<template>
  <div class="searchMore">
    <vTitle title="搜索"></vTitle>
    <header class="search-top">
      <input type="text" placeholder="请输入关键字搜索" v-model="searchVal" id="search">
      <router-link :to="{path: '/searchList', query: {keyWord: searchVal}}" class="sure">确定</router-link>
    </header>
    <section class="search-recommend">
      <h4 class="search-title title-border" v-model="typeText">{{typeText}}</h4>
      <div class="page-infinite-list"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="100"
           infinite-scroll-immediate-check="full">
        <ul  class=" search-history">
          <li v-for="item in searchData"><router-link :to="{path: '/'}">{{item.title}}</router-link></li>
        </ul>
      </div>
      <p v-show="loading" v-if="" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </section>
  </div>
</template>

<script>
import vTitle from '#/common/titleCommon'
export default {
  name: 'searchMore',
  components: {
    vTitle
  },
  created () {
    this.searchVal = this.$route.query.keyWord;
    this.type = this.$route.query.type.toString();
    switch (this.type) {
      case '0' : this.typeText = '攻略';break;
      case '1' : this.typeText = '图鉴';break;
      case '2' : this.typeText = '天空问答';break;
      case '3' : this.typeText = '资讯天空问答';break;
    }
  },
  data () {
    return {
      searchVal: '',   // 搜索关键字
      searchData: [],  // 搜索结果
      type: '',        // 结果类型
      typeText: '',    // 结果类型的文字描述
      loading: false,  // 控制加载
      listLength: '',  // 加载判定
      full: true, // 是否手动
      page: 1
    }
  },
  methods: {
    // 下拉加载
    loadMore () {
      if (this.listLength === 0) {
        this.loading = false;
        return;
      }
      this.loading = true;
      this.$http.apiV0('search/', {params: {word: this.searchVal, page: this.page}}).then((data) => {
        setTimeout(() => {
          this.listLength = 0;
          data.data.map(e => {
            if (e.type.toString() === this.type) {
              this.searchData.push(e);
              this.listLength ++ ;
            }
          });
          this.loading = false;
        }, 500);
      });
      this.page++;
    }
  }
};
</script>

<style type="text/scss" lang="scss">
  .searchMore{
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
    }

  }
</style>
