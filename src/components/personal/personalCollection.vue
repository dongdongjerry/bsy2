<template>
  <div class="personalCollection">
    <vTitle title="个人收藏"></vTitle>
    <div class="collection-search">
      <input type="text" placeholder="搜 索" v-model="searchKey">
      <i class="ico-search" v-show="searchKey.length === 0"></i>
    </div>
    <ul class="collection-list">
      <li v-for="item in collectionData" v-show="collectionShow(item.title)">
        <router-link :to="{path: '/', params: {id: item.id}}">
          <h4>{{item.title}}</h4>
          <p>{{item.author}}<span>{{item.create_dt}}</span></p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  export default {
    name: 'personalCollection',
    components: {
      vTitle
    },
    data () {
      return {
        collectionData: [],  // 个人收藏数据
        searchKey: '',
        collectionShow (title) {
          if (this.searchKey.length === 0){
            return true;
          } else {
            return title.indexOf(this.searchKey) > -1;
          }
        },
        popupView: 'false'
      }
    },
    created () {
      this.$http.apiV1('users/10/strategies/collects/', {params: {page: 1, limit: 10}}).then(data =>{
        this.collectionData = data.data;
      })
    }
  };
</script>

<style type="text/scss" lang="scss">
  .personalCollection{
    padding:0.2rem .2rem;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    .collection-search{
      padding-bottom: 0.3rem;
      border-bottom: 1px #cdc1b2 solid;
      position: relative;
      input{
        width: 100%;
        background: rgba(215, 210, 201, 0.4);
        border: 1px #9B8662 solid;
        border-radius: 0.05rem;
        text-align: center;
        font-size: 0.22rem;
        color: #513A2F;
        line-height: 0.45rem;
      }
      .ico-search{
        position: absolute;
        top: 14%;
        left: 42%;
        width: .25rem;
        height: .25rem;
        background: url("../../common/img/ico-search-02.png") center no-repeat;
        background-size: .25rem auto;
      }
    }
    .collection-list{
      padding: .3rem 0 0;
      li{
        padding: 0 0 .2rem;
        border-bottom: 1px #cdc1b2 solid;
        h4{
          font-weight: 600;
          color: #3c180c;
          font-size: 0.36rem;
          line-height: 0.55rem;
        }
        p{
          margin-top: 0.1rem;
          color: #604E45;
          line-height: 0.35rem;
          font-size: 0.32rem;
          span{
            display: inline-block;
            padding-left: .3rem;
          }
        }
      }
    }
  }
</style>
