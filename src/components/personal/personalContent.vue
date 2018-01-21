<template>
  <div class="personalContent">
    <div class="vTitle">
      <router-link :to="{path: '/personal'}" class="btn-return"></router-link>
      <div class="nav">
        <button @click="active = 'tab-01'"><span :class="{'on': active === 'tab-01'}">我的文章</span></button>
        <button @click="active = 'tab-02'"><span :class="{'on': active === 'tab-02'}">我的评论</span></button>
      </div>
    </div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-01">
        <ul class="tab-01"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100"
            infinite-scroll-immediate-check="full">
          <li v-for="articleItem in articleData">
            <p :class="setStatue(articleItem.status)" class="statue">
              {{articleItem.status}}
              <router-link :to="{path: '/'}"></router-link>
            </p>
            <div class="article-content">
              <img :src="articleItem.cover_url" alt="">
              <div class="article-info">
                <h4>{{articleItem.title}}</h4>
                <div>
                  <span class="time">{{articleItem.create_dt.substr(0,articleItem.create_dt.indexOf(' '))}}</span>
                  <span class="comment">{{articleItem.comment_count}}</span>
                  <span class="like">{{articleItem.like_count}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p v-show="loading" v-if="" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-02">
        <ul class="tab-02">
          <li v-for="comment in commentData">
            <p class="comment-text">{{comment.comment_content}}</p>
            <p class="comment-time">{{comment.comment_create_dt}}</p>
            <div class="comment-content">
              <p class="reply-comment">{{comment.strategy_author}}：{{comment.reply_comment}}</p>
              <div class="article-info-02">
                <img :src="comment.strategy_cover_url" alt="">
                <div>
                  <h4>{{comment.strategy_title}}</h4>
                  <p>{{comment.strategy_author}}<span class="time-02">{{comment.strategy_create_dt.substr(0,comment.strategy_create_dt.indexOf(' '))}}</span></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
    export default {
      name: 'personalContent',
      data () {
        return {
          active: 'tab-01',
          commentData: [],         // 评论数据
          articleData: [],         // 文章数据
          articleLength: '',       // 判断是否需要继续加载文章数据
          page1: 1,                // 文章数据页码
          full: true,              // 是否需要手动
          loading: false,          // 控制是否可以加载
          setStatue (statue) {
            return statue === '已审核通过' ? 'pass' : '';
          }
        }
      },
      created () {
        this.$http.apiV1('users/10/strategies/comments/send/', {params: {page: 1, limit: 10}}).then(data => {
          this.commentData = data.data;
        });
      },
      methods: {
        // 文章加载方法
        loadMore () {
          if (this.articleLength === 0) {
            this.loading = false;
            return;
          }
          this.loading = true;
          this.$http.apiV1('users/10/strategies/', {params: {page: this.page1, limit: 10}}).then(data => {
            setTimeout(() => {
              this.articleData.push.apply(this.articleData, data.data);
              this.articleLength = data.data.length;
              this.loading = false;
            }, 1500);
          });
          this.page1++;
        }
      }
    };
</script>

<style type="text/scss" lang="scss">
  .personalContent{
    .vTitle{
      .nav{
        display: flex;
        button{
          display: block;
          float: left;
          flex: 1;
          text-align: center;
          background: none;
          border: none;
          outline:none;
          span{
            font-size: 0.4rem;
            line-height: 0.85rem;
            color: #ffffff;
            &.on{
              padding-bottom: 0.08rem;
              border-bottom: 1px #ffffff solid;
            }
          }
        }
      }
    }
    .statue{
      padding: 0.2rem 0.3rem .1rem;
      overflow: hidden;
      color: #813c3c;
      border-bottom: 1px #cdc1b2 solid;
      &.pass{
        color: #4b7e3f;
      }
      a{
        display: block;
        width: .34rem;
        height: .34rem;
        float: right;
        background: url("../../common/img/btn-edit.png") center no-repeat;
        background-size: .34rem auto;
      }
    }
    .tab-01{
      padding-bottom: .2rem;
      li{
        border-bottom: .1rem solid #fff;
      }
    }
    .article-content{
      overflow: hidden;
      padding: .2rem;
      .article-info{
        float: left;
        overflow: hidden;
        padding-left: .3rem;
        width: 60%;
        h4{
          font-size: 0.34rem;
          color: #3c180c;
          line-height: 0.45rem;
          height: 1rem;
          padding-left: 0.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        span{
          font-size: 0.28rem;
          color: #704631;
          line-height: 0.35rem;
        }
        .time{
          padding-left: .35rem;
          background: url("../../common/img/ico-time.png") left center no-repeat;
          background-size: .3rem auto;
        }
        .like{
          float: right;
          padding-left: .4rem;
          background: url("../../common/img/icon-likes.png") left center no-repeat;
          background-size: .3rem auto;
        }
        .comment{
          float: right;
          margin-left: .2rem;
          padding-left: .4rem;
          background: url("../../common/img/ico-content-ping.png") left center no-repeat;
          background-size: .3rem auto;
        }

      }
      img{
        width: 2.4rem;
        height: 1.4rem;
        display: block;
        float: left;
        border-radius: 0.1rem;
      }
    }
    .tab-02 {
      li {
        padding: .2rem .3rem;
        border-bottom: .1rem solid #fff;
        .comment-text{
          font-size: 0.3rem;
          color: #3c180c;
          line-height: 0.4rem;
          overflow: hidden;
        }
        .comment-time{
          font-size: 0.24rem;
          color: #806b5b;
          margin-bottom: 0.1rem;
        }
        .comment-content{
          margin: 0 auto;
          overflow: hidden;
          background: #faecd6;
          border: 1px solid #dfd1c1;
          padding: 0.1rem;
          border-radius: 0.1rem;
          .reply-comment{
            font-size: 0.28rem;
            color: #3c180c;
            line-height: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            letter-spacing: 1px;
          }
          .article-info-02{
            img{
              display: block;
              float: left;
              width: 1.9rem;
              height: 1.1rem;
              border-radius: 0.1rem;
              max-height: 1.2rem;
            }
            div{
              float: left;
              width: 60%;
              padding-left: .3rem;
              h4{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.28rem;
                color: #742929;
                line-height: 0.42rem;
                min-height: 0.8rem;
              }
              p{
                color: rgb(128,107,91);
                font-size: .12rem;
              }
              .time-02{
                float: right;
              }
            }
          }
        }
      }
    }
  }
</style>
