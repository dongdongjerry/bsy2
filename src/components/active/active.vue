<template>
  <div>
    <vTitle title="活动"></vTitle>
    <div class="page-infinite-wrapper">
    <div class="page-infinite-list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="50"
         infinite-scroll-immediate-check="full">
      <div class="activeitem">
        <ul>
          <li v-for="(item, index) in activeData">
            <router-link to="/">
              <img v-lazy='item.cover_url' :alt="item.title">
              <span class="activeitem-tip" :class="tipClass(item.flag)">已结束</span>
              <div class="activeitem-intro">
                <h4>{{item.title}}</h4>
                <p class="activeitem-time">{{item.begin_dt}}——{{item.end_dt}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
    </div>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  export default {
    name: 'active',
    components: {
      vTitle
    },
    created () {
    },
    data () {
      return {
        activeData: [],
        page: 1, // 文章滚动加载页码
        articleLength: '', // 判断是否需要继续滚动加载
        loading: false, // 控制是否可以加载
        full: true, // 是否手动
        tipClass: (flag) => {
          switch (flag) {
            case 0 :return 'dns';
            case 1 :return 'ing';
            case 2 :return 'end';
          }
        }
      }
    },
    methods: {
      loadMore () {
        if (this.articleLength === 0) {
          this.loading = false;
          return;
        }
        this.loading = true;
        this.$http.apiV0('activity', {params: {page: this.page}}).then((data) => {
          setTimeout(() => {
            this.articleLength = data.data.length;
            this.activeData.push.apply(this.activeData, data.data);
            this.loading = false;
          }, 1500);
        });
        this.page++;
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  $url: '../../common/img/';
  .activeitem{
    .page-infinite-wrapper{
      height: 100%;
    }
    ul{
      overflow: hidden;
      padding-top: .4rem;
      li{
        position: relative;
        width: 6.82rem;
        margin: 0 auto 0.3rem;
        border: 1px solid #efdfc9;
        border-radius: .05rem;
        background: #fff1de;
        a{
          display: block;
        }
        .activeitem-tip{
          position: absolute;
          top: .2rem;
          right: -.07rem;
          height: .6rem;
          padding: 0 .1rem 0 .25rem;
          color: #fff;
          font-size: .24rem;
          text-align: center;
          line-height: .5rem;
        }
        .end{
          background: url($url + 'pic-activity-end.png') center no-repeat;
          background-size: 100% 100%;
        }
        img{
          width: 6.82rem;
          height: 4.20rem;
          border-radius: .05rem .05rem 0 0;
        }
        .activeitem-intro{
          padding: .1rem 0 .2rem .2rem;
          background: #fff;
        }
        h4{
          color: #484848;
          font-size: 0.36rem;
        }
        .activeitem-time{
          color: #ababab;
          font-size: 0.2rem;
        }

      }
    }
  }
</style>
