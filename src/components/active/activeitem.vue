<template>
  <div class="activeitem">
    <ul>
      <li v-for="(item, index) in activeData">
        <router-link to="/">
          <img :src='item.cover_url' :alt="item.title">
          <span class="activeitem-tip" :class="tipClass(item.flag)">已结束</span>
          <div class="activeitem-intro">
            <h4>{{item.title}}</h4>
            <p class="activeitem-time">{{item.begin_dt}}——{{item.end_dt}}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  // [item.flag === 0 ? '' : (item.flag === 1 ? '' : 'end')]
    export default {
      name: 'activeitem',
      data () {
        return {
          tipClass: (flag) => {
            switch (flag) {
              case 0 :return 'dns';break;
              case 1 :return 'ing';break;
              case 2 :return 'end';break;
            }
          }
        }
      },
      props: [
        'activeData'
      ]
    }
</script>

<style type="text/scss" lang="scss">
  $url: '../../common/img/';
  .activeitem{
    ul{
      overflow: hidden;
      padding-top: .4rem;
      li{
        position: relative;
        width: 6.82rem;
        margin: 0 auto 0.3rem;
        border: 1px solid #efdfc9;
        border-radius: .05rem;
        background: #fff;
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
