<template>
  <div class="personalMessage">
    <div class="vTitle">
      <router-link :to="{path: '/personal'}" class="btn-return"></router-link>
      <div class="nav">
        <button @click="active = 'tab-01'"><span :class="{'on': active === 'tab-01'}">评论</span></button>
        <button @click="active = 'tab-02'"><span :class="{'on': active === 'tab-02'}">点赞</span></button>
        <button @click="active = 'tab-03'"><span :class="{'on': active === 'tab-03'}">通知</span></button>
      </div>
    </div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-01">
        <div class="noData" v-if="commentData === undefined">
          暂无任何评论哦!
        </div>
        <ul class="tab-01">
          <li v-for="commentItem in commentData">
            <div class="comment-user">
              <img :src="commentItem.user_headphoto">
              <p class="comment-user-nickname">
                {{commentItem.user_nickname}}
                <span>{{commentItem.comment_create_dt}}</span>
              </p>
            </div>
            <p class="comment-content line-feed">{{commentItem.comment_content}}</p>
            <div class="comment-strategy">
              <router-link :to="{path: '/'}">
                <p class="reply-comment line-feed">{{commentItem.reply_comment}}</p>
                <div class="strategy-info">
                  <img :src="commentItem.strategy_cover_url" alt="">
                  <div class="strategy-content">
                    <h4>{{commentItem.strategy_title}}</h4>
                    <p>
                      {{commentItem.strategy_author}}
                      <span class="time">
                      {{commentItem.strategy_create_dt}}
                </span>
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-02">
        <div class="noData" v-if="likeData['最新'] === undefined">
          暂无任何点赞哦!
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-03">
        <div class="noData" v-if="noticeData=== undefined">
        </div>
        <ul class="tab-03">
          <li v-for="noticeItem in noticeData">
            <h4>
              {{noticeItem.title}}
              <span>{{noticeItem.create_dt.substr(0,noticeItem.create_dt.indexOf(' '))}}</span>
            </h4>
            <p>
              {{noticeItem.preview}}
            </p>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
    <vFooter></vFooter>
  </div>
</template>

<script>
    import vFooter from '#/common/vFooter'
    export default {
      components:{
        vFooter
      },
      data () {
        return {
          active: 'tab-01',    // tab切换
          commentData: [],     // 评论数据
          likeData: [],        // 点赞数据
          noticeData: []       // 通知数据
        }
      },
      created () {
        let url = 'users/10/strategies/comments/receive/';
        let url2 = 'users/10/strategies/likes/receive/';
        let url3 = 'notice/';
        this.$http.apiV1(url, {params: {page: 1, limit: 10}}).then(data => {
          this.commentData = data.data;
        });
        this.$http.apiV1(url2, {params: {extra: 'get_users_list'}}).then(data => {
          this.likeData = data.data;
        });
        this.$http.apiV0(url3, {params: {page: 1}}, 'get', this.$ac02).then(data => {
          this.noticeData = data.data;
        })
      },
      methods: {}
    };
</script>

<style type="text/scss" lang="scss">
  .personalMessage{
    padding-bottom: 1.22rem;
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
    .noData{
      width: 100%;
      margin-top: 50%;
      transform: translate(0,-50%);
      text-align: center;
      font-size: 0.32rem;
    }
    .tab-01{
      padding: 0 .2rem;
      li{
        overflow: hidden;
        padding:.4rem 0 .4rem;
        border-bottom: 1px #cdc1b2 solid;
        .comment-user{
          overflow: hidden;
          img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            float: left;
          }
          .comment-user-nickname{
            float: left;
            padding-left: .3rem;
            font-size: 0.28rem;
            color: #7e3636;
            span{
              display: block;
              padding-left: .3rem;
              margin-top: .1rem;
              font-size: 0.24rem;
              color: #806b5b;
              background: url("../../common/img/ico-time.png") left center no-repeat;
              background-size: auto .26rem;
            }
          }
        }
        .comment-content{
          font-size: 0.34rem;
          color: #3c180c;
          line-height: 0.4rem;
          overflow: hidden;
          padding-top: 0.1rem;
          margin-bottom: 0.2rem;
        }
        .comment-strategy{
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid #dfd1c1;
          padding: 0.1rem;
          box-sizing: border-box;
          background: #faecd6;
          .reply-comment{
            color: #3c180c;
            line-height: 0.4rem;
            margin-bottom: 0.1rem;
            font-size: .3rem;
            padding-top: 0;
          }
          .strategy-info{
            overflow: hidden;
            img{
              display: block;
              float: left;
              width: 1.9rem;
              height: 1.1rem;
              border-radius: 0.1rem;
            }
            .strategy-content{
              padding-left: .3rem;
              width: 68%;
              float: left;
              h4{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.3rem;
                color: #742929;
                line-height: 0.42rem;
                height: 0.8rem;
              }
              p{
                width: 100%;
                color: rgb(128, 107, 91);
                font-size: 0.28rem;
              }
              .time{
                display: block;
                float: right;
              }
            }
          }
        }
      }
    }
    .tab-03{
      li{
        padding: .2rem;
        border-bottom: .1rem #ffffff solid;
        h4{
          font-size: 0.36rem;
          font-weight: 600;
          color: #3c180c;
          line-height: 0.45rem;
          overflow: hidden;
          text-overflow: ellipsis;
          span{
            display: inline-block;
            width: 20%;
            font-size: 0.24rem;
            color: #604E45;
            float: right;
            line-height: 0.55rem;
          }
        }
        p{
          font-size: 0.28rem;
          color: #604E45;
          line-height: 0.35rem;
          padding: 0.05rem 0.06rem;
        }
      }
    }
    .line-feed{
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap
    }
  }
</style>
