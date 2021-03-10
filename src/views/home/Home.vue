<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature class="feature"></home-feature>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  // Home子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeature from './childComps/HomeFeature'
  // 网络请求
  import { getHomeMultidata, getHomeGoods } from 'network/home'

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      HomeRecommendView,
      HomeFeature,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] },
        },
        currentType: 'pop',
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    created() {
      // 请求轮播图等多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      const refresh = this.debounce(this.$refs.scroll.refresh, 500)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       * 网络请求方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(({ data }) => {
          // console.log(data)
          this.banners = data.banner.list
          this.recommends = data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(({ data }) => {
          // console.log(data);
          this.goods[type].page = data.page
          this.goods[type].list.push(...data.list)
        })
      },
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      debounce(fn, delay) {
        let timer = null
        return function(...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            fn.apply(this, args)
          }, delay)
        }
      },
    },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 9;
  }

  .feature {
    width: 100%;
    overflow: hidden;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 1;
  }

  .content {
    /* margin-top: 44px; */
    height: calc(100% - 50px);
    /* overflow: hidden; */
  }
</style>
