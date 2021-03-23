<template>
  <div id="home">
    <nav-bar class="home-nav" ref="homeNav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" :class="{fixed: isTabFixed}" v-show="isTabFixed" />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" v-if="banners.length > 0" @swiperImgLoad="swiperImgLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature class="feature" />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" v-show="!isTabFixed" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
  // Home子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeature from './childComps/HomeFeature'
  // 网络请求
  import { getHomeMultidata, getHomeGoods } from 'network/home'
  // 工具类
  import { debounce } from 'common/utils'

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
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
      // this.getHomeGoods('new')
      // this.getHomeGoods('sell')
    },
    mounted() {
      // 图片加载完成后的监听
      const refresh = debounce(this.$refs.scroll.refresh, 300)
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    },
    methods: {
      /**
       * 事件监听
       */
      async tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            if (this.goods['new'].list.length <= 0) {
              // 数据长度为0 说明还没有数据 需要进行首次加载
              await this.getHomeGoods('new')
            }
            this.currentType = 'new'
            break
          case 2:
            if (this.goods['sell'].list.length <= 0) {
              // 数据长度为0 说明还没有数据 需要进行首次加载
              await this.getHomeGoods('sell')
            }
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 判断backTop是否显示
        this.isShowBackTop = position.y < -1000
        // 判断tabControl是否吸顶
        this.isTabFixed = position.y < -this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh()
      },
      swiperImgLoad() {
        // 获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - this.$refs.homeNav.$el.offsetHeight
      },

      /**
       * 网络请求方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(({ data }) => {
          this.banners = data.banner.list
          this.recommends = data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(({ data }) => {
          this.goods[type].page = data.page
          this.goods[type].list.push(...data.list)

          this.$refs.scroll.finishPullUp()
        })
      },
    },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    /* padding-top: 44px; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    z-index: 9; */
  }

  .feature {
    width: 100%;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    /* margin-top: 44px; */
    height: calc(100% - 50px);
    overflow: hidden;
  }
</style>
