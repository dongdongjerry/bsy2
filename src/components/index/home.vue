<template>
  <div class="home">
    <vTitle title="首页"></vTitle>
    <div class="page-infinite-wrapper">
      <div class="user-info">
        <router-link class='user-pic img-box' to="/personal">
          <img :src="user.head_photo">
        </router-link>
        <p class="user-name">{{user.nickname}}</p>
        <div class="user-order-box">
          <p class="user-order">今日密令：{{user.today_secret}}</p>
          <button type="button" class="btn-copy-order" 
            v-clipboard:copy="user.today_secret"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">
            Copy!
          </button>
        </div>
        <router-link to="/personal" class="btn-user"></router-link>
      </div>
      <mt-swipe :auto="0" class="home-swipe" :show-indicators="false">
        <mt-swipe-item :key="index" v-for="(item, index) in swipeList">
          <router-link :to="{path: '/'}">
            <img v-lazy="item.cover_url">
            <p class="title">【{{typeText(item.type)}}】{{item.title}}</p>
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
      <div class="page-infinite-hd">
        <h3>最新文章</h3>
        <div class="tab">
          <a href="javascript:;" @click="changeArticleList('0')">时间</a>
          <a href="javascript:;" @click="changeArticleList('1')">热度</a>
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
            <router-link :to="{path: '/index'}" class="title">【{{typeText(item.type)}}】{{item.title}}</router-link>
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
    <a class="btn-edit" :class="{'on': popupVisible}" @click="popupVisible=true" title="编辑"></a>
    <mt-popup
      class="pop-edit"
      v-model="popupVisible"
      position="center">
      <router-link class="btn-theme" to="/">主题攻略</router-link>
      <router-link class="btn-pokedex" to="/pokedex">图鉴攻略</router-link>
    </mt-popup>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  export default {
    components: {
      vTitle
    },
    created () {
      // 引入复制插件
      Vue.use(VueClipboard); 
      // 轮播数据
      this.$http.apiV0('article/slide/').then(data => {
        this.swipeList = data.data;
      });
      // 用户数据
      this.$http.apiV0('user/info/', {params: {ac: this.$ac01}}).then(data => {
        this.user = data.data;
        Vue.prototype.$uid = data.data.id;
      });
    },
    data () {
      return {
        user: '', // 用户信息
        type: 0,
        articleLists: [], // 文章列表
        page: 1, // 文章滚动加载页码
        articleLength: '', // 判断是否需要继续滚动加载
        loading: false, // 控制是否可以加载
        full: true, // 是否手动
        swipeList: [], // 轮播图
        popupVisible: false //编辑弹窗

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
        this.$http.apiV0('article/flow/', {params: {page: this.page, order:this.type}}).then((data) => {
          setTimeout(() => {
            this.articleLength = data.data.length;
            this.articleLists.push.apply(this.articleLists, data.data);
            this.loading = false;
          }, 1500);
        });
        this.page++;
      },
      // 最新文章类别筛选
      changeArticleList (type) {
        this.type = type;
        this.page = 1;
        this.articleLength = '';
        this.loading = false;
        this.$http.apiV0('article/flow/', {params: {page: this.page, order: this.type}}).then((data) => {
            this.articleLength = data.data.length;
            this.articleLists = data.data;
        });
        this.page++;
      },
      // 文章类型转为文本格式
      typeText (num) {
        return num ? '攻略' : '资讯';
      },
      // 复制今日密令 
      onCopy: function (e) {
        this.$toast('今日密令复制成功！');
      },
      onError: function (e) {
        this.$toast('今日密令复制失败~~');
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  $swipeTitleHei: .6rem;
  $src: '../../common/img/';
  .home{
    .user-info{
      position: relative;
      height: .75rem;
      padding: .22rem .6rem .22rem 1.15rem;
      background: url($src + 'bg-user-info.png') no-repeat;
      background-size: 100% 100%;
      .user-pic{
        position: absolute;
        left: .22rem;
        top: .22rem;
        width: .75rem;
        height: .75rem;
        background:url($src + 'personal-head-bg.png') no-repeat;
        background-size: .75rem auto;
      }
      .user-name{
        font-size: .3rem;
        color: #39312f;
      }
      .user-order-box{
        position: relative;
        .user-order{
          margin-top: .07rem;
          font-size: .2rem;
          color: #575757;
        }
        .btn-copy-order{
          position: absolute;
          top: 0;
          left:0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .btn-user{
        position:absolute;
        right: .22rem;
        top: .25rem;
        width: .35rem;
        height:.6rem;
        background:url($src + 'ico-handbook-left.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .home-swipe{
      margin-top: .2rem;
      height: 4.2rem;
      .mint-swipe-items-wrap{
        border-radius: 10px;
        transform: rotate(0deg);
      }
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .title{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-indent: .2rem;
        height: $swipeTitleHei;
        line-height: $swipeTitleHei;
        background: rgba(0,0,0,.3);
        color: #fff;
        font-size: .3rem;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
      }
    }
    .page-infinite-hd{
      margin-top: .2rem;
      height: .6rem;
      line-height: .6rem;
      position: relative;
      h3{
        position: relative;
        font-size: .3rem;
        padding-left: .23rem;
        &:before{
          content: '';
          position: absolute;
          left: 0;
          top: .14rem;
          height: .32rem;
          background: #40180c;
          width:2px;
        }
      }
      .tab{
        position: absolute;
        right: 0;
        top: .07rem;
        height: .5rem;
        line-height: .5rem;
        border-radius: 5px;
        overflow: hidden;
        transform: rotate(0deg);
        a{
          float: left;
          position: relative;
          width: 1.2rem;
          text-align: center;
          background: #463423;
          color: #fff;
          font-size: .28rem;
          &:before{
            content: '';
            position: absolute;
            left: 0;
            top: .1rem;
            height: .32rem;
            background: #FFF;
            width:2px;
          }
          &:nth-child(1):before{
            display:none;
          }
        }
      }
    }
    .page-infinite-wrapper{
      height: 100%;
      padding:.2rem;
      box-sizing: border-box;
    }
    .page-infinite-list{
      margin-top: .2rem;
    }
    .page-infinite-listitem{
      position: relative;
      padding: .2rem 0 .2rem 2.6rem;
      border-top: 1px #cdc1b2 solid;
      border-bottom: 1px #cdc1b2 solid;
      height: 1.4rem;
      .img-box{
        position:absolute;
        left: 0;
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
    .btn-edit{
      position: fixed;
      right: -.2rem;
      top: 70%;
      width: .95rem;
      height: .95rem;
      border-radius: 50%;
      background:url($src + 'ico-edit.png') no-repeat center center rgba(0,0,0,.2);
      background-size: .51rem .51rem;
      transition: all .5s;
      &.on{
        right: .4rem;
      }
    }
    .pop-edit{
      background:none;
      text-align: center;
      width: 100%;
      a{
        display: inline-block;
        margin:0 .3rem;
        padding-top: 1.9rem;
        width: 1.77rem;
        position: relative;
        line-height: .4rem;
        color: #fff;
        font-size: .3rem;
        &.btn-theme{
          background:url($src + 'ico-edit-theme.png') no-repeat;
          background-size: 1.77rem auto;
        }
        &.btn-pokedex{
          background:url($src + 'ico-edit-pokedex.png') no-repeat;
          background-size: 1.77rem auto;
        }
      }
    }
  }
</style>
