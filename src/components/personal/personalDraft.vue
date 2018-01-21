<template>
  <div class="personalDraft">
    <vTitle title="草稿箱"></vTitle>
    <ul class="personalDraft-list">
      <li v-for="(item,index) in draftData">
        <div class="draft-box">
          <p class="draft-head">
            文章投稿
            <i class="ico-draft" @click="popupVisible = true;setDelId(item.id, index)"></i>
          </p>
          <router-link :to="{path: '/'}">
            <h4 class="draft-title">{{item.title}}</h4>
            <p class="time">最后编辑时间：{{item.last_dt}}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <mt-popup
      class = 'pop'
      v-model="popupVisible"
      position="center">
      <p>是否删除草稿</p>
      <span class="commit" @click="popupVisible = false;del()">是</span>
      <span class="exit" @click="popupVisible = false;setDelId(-1,-1)">否</span>
    </mt-popup>
  </div>
</template>

<script>
  import vTitle from '#/common/titleCommon'
  export default {
    name: 'personalDraft',
    components: {
      vTitle
    },
    data () {
      return {
        draftData: [],          // 草稿箱数据
        popupVisible: false,    // 提示删除弹窗
        deleteId: -1,           // 要删除的攻略id
        deleteIndex: -1         // 要删除的攻略index
      }
    },
    created () {
      this.$http.apiV1('users/10/strategies/drafts/', {params: {page: 1, limit: 10}}).then(data => {
        this.draftData = data.data;
      })
    },
    methods: {
      setDelId (id, index) {
        this.deleteId = id;
        this.deleteIndex = index;
//        window.location.reload();
      },
      del () {
        this.$http.apiV1('strategies/' + this.deleteId + '/delete/', '', 'post',);
        this.draftData.splice(this.deleteIndex,1);
      }
    }
  };
</script>

<style type="text/scss" lang="scss">
  $url: '../../common/img/';
  .personalDraft{
    .personalDraft-list{
      overflow: hidden;
      padding-top: .2rem;
      li {
        .draft-box{
          padding: 0 .2rem;
        }
        padding-bottom: .2rem;
        border-bottom: 0.2rem solid #fff;
        .draft-head {
          padding-bottom: .2rem;
          font-size: 0.24rem;
          color: #604e45;
          border-bottom: 1px #cdc1b2 solid;
          .ico-draft {
            float: right;
            display: block;
            width: .24rem;
            height: .29rem;
            background: url($url + "ico-content_delete.png") center no-repeat;
            background-size: .24rem auto;
          }
        }
        .draft-title{
          font-size: 0.32rem;
          color: #3c180c;
          margin: 0.1rem 0;
        }
        .time{
          font-size: 0.24rem;
          color: #604e45;
        }
      }
    }
    .pop{
      width: 4.17rem;
      padding: 0.2rem;
      font-size: 0.34rem;
      text-align: center;
      color: #fff;
      background: #42372c;
      border-radius: 0.25rem;
      p{
        margin-bottom: 0.2rem;
      }
      .commit{
        display: inline-block;
        width: 49%;
        float: left;
        color: #fff;
      }
      .exit{
        display: inline-block;
        width: 49%;
        float: left;
        color: #fff;
        border-left: 1px solid #fff;
      }
    }
  }
</style>
