<template>
  <div class="personal">
    <vTitle title="个人"></vTitle>
    <section class="section-border">
      <div class="personal-ban" :style="setBackWall()">
          <p class="personal-header">
            <span class="personal-hp">
              <img :src='personalDate.head_photo' alt="头像" >
            </span>
            <span class="personal-nickname">{{personalDate.nickname}}</span>
          </p>
      </div>
      <div class="personal-content">
        <ul class="personal-list">
          <li><router-link to="/personalContent">
            <img src="../../common/img/ico-per-more.png" alt="更多">
            <p>我的内容</p>
          </router-link></li>
          <li><router-link to="/personalMessage">
            <img src="../../common/img/ico-per-message.png" alt="更多">
            <p :class="{'hasmesg': personalDate.has_unread_message}">消息通知</p>
          </router-link></li>
          <li><router-link to="/">
            <img src="../../common/img/ico-per-collect.png" alt="更多">
            <p>我的收藏</p>
          </router-link></li>
          <li><router-link to="/personalDraft">
            <img src="../../common/img/ico-per-draft.png" alt="更多">
            <p>草稿箱</p>
          </router-link></li>
        </ul>
      </div>
    </section>
    <section class="section-border">
      <div class="personal-content">
        <div class="personal-score">
          <p class="title"><i></i>战绩信息</p>
          <table>
            <tbody>
            <tr>
              <td>联盟名字</td>
              <td>{{personalDate.group_name}}</td>
            </tr>
            <tr>
              <td>冈布奥总星阶</td>
              <td>{{personalDate.pet_stars_num}}</td>
            </tr>
            <tr>
              <td>世界树果实</td>
              <td>{{personalDate.fruit_num}}</td>
            </tr>
            <tr>
              <td>最高探索等级</td>
              <td>{{personalDate.max_explore_level}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="section-border">
    <div class="personal-content">
      <div class="personal-score">
        <p class="title"><i></i>我的投稿
        <router-link to="/" class="more">更多 ></router-link>
        </p>
      </div>
      <ul class="personal-str">
        <li v-for="(item, index) in strategyData">
          <img :src="item.cover_url" alt="">
          <div class="str-intro">
            <h4>{{item.title}}</h4>
            <div>
              <span class="str-time">
                {{item.create_dt.substr(0,item.create_dt.indexOf(' '))}}
              </span>
              <span class="str-com">
                <i class="ico-com"></i>
                {{item.comment_count}}
              </span>
              <span class="str-like">
                <router-link :to="{path: '/'}"></router-link>
                <i class="ico-like"></i>
                {{item.like_count}}
              </span>

            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  export default {
    name: 'personal',
    components: {
      vTitle
    },
    created () {
      this.$http.apiV0('user/info?ac=' + this.$ac02).then(data => {
        this.personalDate = data.data;
      });
      this.$http.apiV1('users/10/strategies/', {params: {page: 1, limit: 1}}).then(data =>{
        this.strategyData = data.data
      })
    },
    data () {
      return {
        personalDate: [], // 个人信息
        strategyData: [],
        setBackWall () {
          // 设置个人信息背景图片
          if (this.personalDate.backwall !== null) {
            return this.personalDate.backwall;
          }
        }
      }
    }
  };
</script>

<style type="text/scss" lang="scss">
  $url: '../../common/img/';
  .personal-content{
    width: 7.1rem;
    margin: 0 auto;
  }
  .section-border{
    padding-bottom: .2rem;
    border-bottom: .05rem solid #fff;
  }
  .personal{
      padding-top: .4rem;
    .personal-ban{
      position: relative;
      width: 7.1rem;
      height: 3.55rem;
      margin: 0 auto;
      background: url($url + "index-banner01.jpg") center no-repeat;
      background-size: 100% 100%;
      .personal-header{
        position: absolute;
        bottom: -.15rem;
        left: .2rem;
        vertical-align: middle;
        span{
          display: block;
          float: left;
        }
      }

      .personal-hp{
        display: inline-block;
        width: .9rem;
        height: .9rem;
        border-radius: 50%;
        background: url($url + 'personal-head-bg.png') center no-repeat;
        background-size: 100% 100%;

        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #ffffff;
        }
      }
      .personal-nickname{
        /*line-height: 1.2rem;*/
        line-height: 1.2rem;
        text-indent: 0.3em;
        color: #ffffff;
        font-size: 0.36rem;
        margin-bottom: 0rem;
      }
      .backwall{
        width: 7.1rem;
        height: 3.55rem;
        border-radius: 0.05rem;
      }
    }
    .personal-list{
      margin-top: .2rem;
      overflow: hidden;
      li{
        float: left;
        width: 25%;
        text-align: center;
        a{
          color: #542d18;
          font-size: 0.24rem;
          font-style: normal;
        }
        img{
          width: auto;
          height: .5rem;
        }
        .hasmesg:after{
          content: '';
          display: inline-block;
          vertical-align: top;
          width: .15rem;
          height: .15rem;
          border-radius: 50%;
          background: #963b28;
        }
      }
    }
    .personal-score{
      margin-top: .2rem;
      .title{
        font-size: 0.36rem;
        border-bottom: 1px #cdc1b2 solid;
        padding-bottom: 0.1rem;
        color: #3c180c;
        text-indent: 0.25em;
        margin-bottom: 0.2rem;
        i{
          display: block;
          float: left;
          margin-left: .2rem;
          margin-top: .05rem;
          width: .055rem;
          height: .45rem;
          background: #3c180c;
        }
        .more{
          float: right;
          font-size: .30rem;
          color: #3c180c;
          margin-top: 0.05rem;
        }
      }
      table{
        color: #3c180c;
        font-style: inherit;
        margin-left: 0.3rem;
        tr{
          text-align: left;
          height: 0.5rem;
          td{
            height: 0.3rem;
            width: 2.5rem;
            font-size: 0.26rem;
          }
        }
      }
    }
    .personal-str{
      overflow: hidden;
      li{
        margin-bottom: 0.2rem;
        padding: 0 0.2rem 0.2rem;
        overflow: hidden;
        img{
          width: 2.4rem;
          height: 1.4rem;
          border-radius: .1rem;
          float: left;
        }
        .str-intro{
          float: right;
          width: 61%;
        }
        h4{
          font-size: 0.34rem;
          color: #3c180c;
          line-height: 0.45rem;
          height: 0.85rem;
          /*padding-left: 0.1rem;*/
          margin-bottom: .1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .str-time{
          display: inline-block;
          /*width: .31rem;*/
          padding-left: .36rem;
          background: url($url + "ico-time.png") left bottom no-repeat;
          background-size: .3rem;
        }
        .str-like{
          float: right;
          padding-left: .36rem;
          background: url($url + "icon-likes.png") left center no-repeat;
          background-size: .3rem;
          margin-right: .3rem;
        }
        .str-com{
          float: right;
          padding-left: .36rem;
          background: url($url + "ico-per-message.png") left bottom no-repeat;
          background-size: .3rem;
        }
      }
    }
  }
</style>
