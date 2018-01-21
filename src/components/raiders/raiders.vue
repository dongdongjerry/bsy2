<template>
  <div class="raiders">
    <vTitle title="攻略"></vTitle>
    <div class="raiders-box page-infinite-wrapper">
      <div class="tab-list">
        <div class="tab-item" :class="{'on': tabIsShow}">
          <p class="selected-text" @click="tabIsShow=!tabIsShow">{{activeTab}}</p>
          <ul>
            <li @click="changeArticleList(index)" v-for="(item, index) in articleTypeTab">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="page-infinite-list"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="100"
          infinite-scroll-immediate-check="full">
        <div v-for="item in articleLists" class="page-infinite-listitem">
            <div class="img-box">
              <img v-lazy="item.cover_url" :alt="item.title">
            </div>
            <router-link :to="{path: '/index'}" class="title">{{item.title}}</router-link>
            <div class="info">
              <span class="author">{{item.username}}</span>
              <span class="time">{{item.create_dt.slice(0,10)}}</span>
            </div>
        </div>
      </div>
      <p v-show="loading" v-if="" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
    </div>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  export default {
    name: 'strategy',
    components: {
      vTitle
    },
    created () {
      // 攻略类型数据
      this.$http.apiV0('themestrategy/types/', {params: {page: '1'}}).then(data => {
        this.articleTypeTab = data.data;
        this.articleTypeTab.unshift({id:'', name:'全部'});
      });
    },
    data () {
      return {
        articleLists: [], // 文章列表
        page: 1, // 文章滚动加载页码
        articleLength: '', // 判断是否需要继续滚动加载
        loading: false, // 控制是否可以加载
        full: true, // 是否手动
        articleTypeTab: [], // 文章类型数据
        type: '',
        tabIsShow: false, // tab下拉显示
        activeTab: '攻略类型'
      }
    },
    methods: {
      // 下拉加载
      loadMore () {
        if (this.articleLength === 0){
          this.loading = false;
          return;
        }
        this.loading = true;
        this.$http.apiV0('themestrategy/get_list_by_type/', {params: {page: this.page}}).then((data) => {
          setTimeout(() => {
            this.articleLength = data.data.length;
            this.articleLists.push.apply(this.articleLists, data.data);
            this.loading = false;
          }, 1500);
        });
        this.page++;
      },
      // 下拉筛选
      changeArticleList (index) {
        this.tabIsShow = false;
        this.activeTab = this.articleTypeTab[index].name;
        this.type = this.articleTypeTab[index].id;
        this.page = 1;
        this.articleLength = '';
        this.loading = false;
        let url = 'themestrategy/get_list_by_type/' + this.type + '/';
        this.$http.apiV0(url,{params: {page: this.page}}).then((data) => {
            this.articleLength = data.data.length;
            this.articleLists = data.data;
        });
        this.page++;
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  $src: '../../common/img/';
  .raiders{
    background: #fef9f3;
  }
  .page-infinite-wrapper{
    height: 100%;
    box-sizing: border-box;
  }
  .page-infinite-list{
    margin-top: .2rem;
  }
  .page-infinite-listitem{
    position: relative;
    padding: .2rem 0 .2rem 2.8rem;
    border-top: 2px #fff solid;
    border-bottom: 2px #fff solid;
    height: 1.4rem;
    background: #fff1de;
    .img-box{
      position:absolute;
      left: .2rem;
      top: .2rem;
      width: 2.4rem;
      height: 1.4rem;
      img{
        border-radius: 5px;
      }
    }
    .title{
      display: block;
      font-size: .34rem;
      height: .8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: .4rem;
      color: #3c180c;
    }
    .info{
      margin-top: .22rem;
      font-size: .28rem;
      span{
        margin-right: .05rem;
        &:before{
          content: '';
          display:inline-block;
          width: .23rem;
          height: .23rem;
          margin-right: .05rem;
          vertical-align: middle;
        }
        &.author:before{
          background: url($src + 'ico-edit-author.png') no-repeat;
          background-size: .23rem auto;
        }
        &.time:before{
          background: url($src + 'ico-time.png') no-repeat;
          background-size: .23rem auto;
        }
      }
    } 
  }
  .tab-list{
    position: relative;
    z-index: 3;
    padding: 0 .2rem;
    margin-top: .4rem;
    text-align: center;
    color: #fff1de;
    height:.7rem;
    display:flex;
    .tab-item{
      flex:1;
      &:nth-child(1){
        margin-left:0;
      }
      &.on{
        ul{
          max-height: 5rem;
        }
        .selected-text{
          border-radius:.1rem .1rem 0 0;
        }
      }
      .selected-text{
        border-bottom: 1px #896F49 solid;
        font-weight: bold;
        position: relative;
        z-index: 5;
        height: .7rem;
        line-height: .7rem;
        background: #4f3f2c;
        border-radius:.1rem;
        font-size: .28rem;
        &:after{
          content: '';
          display: inline-block;
          margin-left: .2rem;
          vertical-align: 2px;
          border-left: 0.06rem solid transparent;
          border-right: 0.06rem solid transparent;
          border-top: 0.1rem #fff1de solid;
        }
      }
      ul{
        margin-top: -.1rem;
        background: #4f3f2c;
        border-radius: 0 0 .1rem .1rem;
        overflow:hidden;
        max-height:0;
        height: auto;
        transition: max-height .5s ease;
        transform: translate(0,0,0);
        font-size: .22rem;
        li{
          height: .5rem;
          line-height: .5rem;
          border-top: 1px #896F49 solid;
        }
      }
    }
  }
</style>
