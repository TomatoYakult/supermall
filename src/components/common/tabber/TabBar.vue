<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {},
    methods: {}
  }
</script>

<style lang='less' scoped>
  .tabbar {
    height: 50px;
    display: flex;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  .tabbar::after {
    content: " ";
    box-sizing: border-box;
    position: absolute;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    transform: scale(0.5);
    pointer-events: none;
    border-width: 1px 0;
  }
</style>
