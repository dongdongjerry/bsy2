<template>
  <div class="search">
    <vTitle title="搜索"></vTitle>
    <header class="search-top">
      <input type="text" placeholder="请输入关键字搜索" v-model="searchVal" id="search">
      <a class="sure" @click="add(searchVal)">确定</a>
    </header>
    <section class="search-recommend">
      <h4 class="search-title">推荐热搜</h4>
      <ul class="search-hot">
        <li v-for="hotItem in searchHotData">
          <a @click="add(hotItem)">
            {{hotItem}}
          </a>
          </li>
      </ul>
    </section>
    <section class="search-recommend" v-if="hasHistory">
      <h4 class="search-title title-border">历史记录</h4>
      <ul class="search-history">
        <li v-for="(hisItem, index) in searchHistory">
          <router-link :to="{path: '/searchList', query: {keyWord: hisItem}}">
            {{hisItem}}
          </router-link>
          <span class="clearHistory" @click="remove(index)">&times;</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  import Store from '~/js/store'
  export default {
    name: 'search',
    components: {
      vTitle,
      Store
    },
    watch: {
      searchHistory: {
        handler (searchHistory) {
          Store.saveArray('searchHistory', searchHistory);
        },
        deep: true
      }
    },
    data () {
      return {
        keyword: '',         // 搜索关键字
        searchHotData: [],   // 热搜数据
        hasHistory: false,   // 是否有搜索历史
        searchHistory: Store.fetchArray('searchHistory'),   // 搜索历史数据
        searchVal: ''        // 用户输入数据
      }
    },
    created () {
      // 请求热搜数据
      this.$http.apiV0('search/hot/').then(data => {
        this.searchHotData = data.data;
      });
      this.hasHistory = this.searchHistory.length > 0;
    },
    methods: {
      add (word) {
        if (!word) {
          this.$toast('搜索不能为空');
          return;
        }
        let repeatKeyWord = Store.fetchArray('searchHistory').find((value, index, arr) => { return Object.is(word, value) }); // 是否存在重复的关键字
        if (word.length > 0 && repeatKeyWord === undefined) { // 不重复and不为空的情况下保存历史记录
          this.searchHistory.unshift(word); // 向前插入,前面是最新的历史记录
          if (this.searchHistory.length > 10) this.searchHistory.pop(); // 只保存10条历史记录
          Store.saveArray('searchHistory', this.searchHistory);
        }
        // 跳转到搜索详情页
        this.$router.push({path: '/searchList', query: {keyWord: word}});
      },
      remove (i) {
        this.searchHistory.splice(i, 1);  // 删除当前历史记录
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
.search{
  box-sizing: border-box;
  padding: .4rem 0 .2rem;
  .search-top{
    width: 7rem;
    margin: 0 auto;
    .sure{
      width: 18%;
      height: 0.5rem;
      line-height: 0.5rem;
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
    .search-hot{
      overflow: hidden;
      margin-top: .2rem;
      li{
        float: left;
        position: relative;
        height: 0.5rem;
        width: 25%;
        font-size: 0.24rem;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        margin-bottom: 0.1rem;
        a{
          width: 90%;
          color: #6F4E42;
          font-size: 0.28rem;
          height: 100%;
          line-height: 0.5rem;
          overflow: hidden;
          border: 1px #80655B solid;
          border-radius: 0.05rem;
          text-overflow: ellipsis;
          display: inline-block;
          text-align: center;
          box-sizing: border-box;

        }
      }
    }
    .search-history{
      li{
        position: relative;
        border-bottom: 1px #cdc1b2 solid;
        padding: 0.12rem 0;
        overflow: hidden;
        a{
          display: block;
          font-size: 0.3rem;
          color: #6F4E42;
          box-sizing: border-box;
          padding: 0 .5rem 0 .3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .clearHistory{
          position: absolute;
          top:50%;
          right: 0;
          transform: translate(0,-50%);
          color: #6F4E42;
          font-size: 0.35rem;
          padding: 0 .15rem;
        }

      }
    }
  }

}
</style>
