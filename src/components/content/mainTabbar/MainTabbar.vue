<template>
  <TabBar>
      <TabBarItem path="/home" activeColor="#ff5777">
        <template v-slot:item-icon="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-home"></i>
          </div>
        </template>
        <template v-slot:item-icon-active="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-home-fill"></i>
          </div>
        </template>
        <template v-slot:item-text="">
          <div class="tabbar-item-text">首页</div>
        </template>
      </TabBarItem>
      <TabBarItem path="/category" activeColor="#ff5777">
        <template v-slot:item-icon="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-all"></i>
          </div>
        </template>
        <template v-slot:item-icon-active="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-all-fill"></i>
          </div>
        </template>
        <template v-slot:item-text="">
          <div class="tabbar-item-text">分类</div>
        </template>
      </TabBarItem>
      <TabBarItem path="/shopcart" activeColor="#ff5777">
        <template v-slot:item-icon="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-cart-Empty"></i>
          </div>
        </template>
        <template v-slot:item-icon-active="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-cart-Empty-fill"></i>
          </div>
        </template>
        <template v-slot:item-text="">
          <div class="tabbar-item-text">购物车</div>
        </template>
      </TabBarItem>
      <TabBarItem path="/profile" activeColor="#ff5777">
        <template v-slot:item-icon="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-account"></i>
          </div>
        </template>
        <template v-slot:item-icon-active="">
          <div class="tabbar-item-icon">
            <i class="iconfont icon-account-fill"></i>
          </div>
        </template>
        <template v-slot:item-text="">
          <div class="tabbar-item-text">我的</div>
        </template>
      </TabBarItem>
    </TabBar>
</template>

<script>
  import TabBar from 'components/common/tabber/TabBar'
  import TabBarItem from 'components/common/tabber/TabBarItem'
  export default {
    name: 'MainTabbar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style lang='less' scoped>
</style>
