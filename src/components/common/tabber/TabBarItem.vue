<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isAcitve">
      <slot name="item-icon"></slot>
    </div>
    <div v-else :style="activeStyle">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  import 'assets/font/iconfont.css'

  export default {
    data() {
      return {
      }
    },
    props: {
      path: {
        type: String,
        required: true // 必传值
      },
      activeColor: {
        type: String,
        defalut: 'pink',
      }
    },
    created() {},
    computed: {
      isAcitve() {
        return this.$route.path === this.path;
      },
      activeStyle() {
        return this.isAcitve ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick() {
        if (this.$route.path == this.path) return;
        this.$router.push(this.path)
      }
    }
  }
</script>

<style lang='less' scoped>
  .tabbar-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    color: #646566;
    line-height: 1;
    -webkit-tap-highlight-color: transparent;
  }

  .tabbar-item-icon {
    position: relative;
    margin-bottom: 4px;
    font-size: 22px;
  }

  .tabbar-item-icon .iconfont {
    display: block;
    position: relative;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }

  .tabbar-item-text {
    font-size: 12px;
  }
</style>
