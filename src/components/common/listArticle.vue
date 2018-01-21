<template>
  <div class="list-article">

  </div>
  <div class="article-list">
    <div class="item" v-for="(item, index) in articleLists">
    	<a :href="item.link">
    		<div class="img-box">
    			<img :src="item.imgSrc" :alt="item.title">
    		</div>
    		<h3 class="title">{{item.title}}</h3>
    		<div class="info">
    			<span class="author">{{item.author}}</span>
    			<span class="time">{{item.time}}</span>
    		</div>
    	</a>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      // 首次添加文章数据
      for (let i = 1; i <= 10; i++) {
        this.list.push(i);
      }
    },
    data() {
      return {
        list: [],
        loading: false, // 控制是否可以加载
        allLoaded: false,
        full: false,
        wrapperHeight: 0
      };
    },
    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    },
    components: {}
  }
</script>

<style type="text/scss" lang="scss">
    .list-article {
      height: auto;

    }
    .article-list{
        padding: 0 .2rem;
        .item{
            position: relative;
            padding: .2rem 0 .2rem 2.6rem;
            border-top: 1px #cdc1b2 solid;
            border-bottom: 1px #cdc1b2 solid;
            min-height: 1.82rem;
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
                font-size: .34rem;
                color: #3c180c;
            }
            .info{
                margin-top: .25rem;
                font-size: .28rem;
            }
        }
    }
</style>
