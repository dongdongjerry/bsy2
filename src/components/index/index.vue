<template>
  <div class="index">
    <router-view class="index-content"></router-view>
    <div class="index-Footer">
      <router-link to="/home">首页</router-link>
      <router-link to="/raiders">攻略</router-link>
      <router-link to="/pokedex">图鉴</router-link>
      <router-link to="/active">活动</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  $src: '../../common/img/';
  .index{
    height: 100%;
    .index-Footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.22rem;
      background: #4f3f2c;
      display: flex;
      text-align: center;
      z-index: 98;
      a {
        flex: 1;
        padding: .2rem 0;
        font-size: .24rem;
        color: #fff;
        &:before {
          content: '';
          display: block;
          width: .5rem;
          height: .55rem;
          margin: 0 auto;
        }
        &:nth-child(1):before {
          background: url($src + 'ico-vFooter-home.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(2):before {
          background: url($src + 'ico-vFooter-strategy.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(3):before {
          background: url($src + 'ico-vFooter-compose.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(4):before {
          background: url($src + 'ico-vFooter-active.png') no-repeat;
          background-size: 100% 100%;
        }
        &.router-link-active {
          background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#4c3d29), to(#3d2e1b));
        }
      }
    }
    .index-content {
      width: 100%;
      height: calc(100% - 1.2rem);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
  }
</style>
