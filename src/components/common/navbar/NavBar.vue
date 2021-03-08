<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style>
.nav-bar {
  width: 100%;
  height: 44px;
  line-height: 44px;
  display: flex;
  text-align: center;
  position: relative;
}

.nav-bar::after {
  content: " ";
  box-sizing: border-box;
  position: absolute;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border-bottom: 1px solid #ebedf0;
  transform: scale(.5);
  pointer-events: none;
}

.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>
