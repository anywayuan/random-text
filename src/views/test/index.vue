<template>
  <div class="page-main">
    <div class="content">
      <div class="main" v-for="item in 100" :key="item"> {{ item }}</div>
    </div>
    <div class="left-action"></div>
    <div class="right-action"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {}
  },
  created() {

  },
  methods: {}
}
</script>

<style scoped lang="less">
.page-main {
  width: 100%;
  min-height: 3000px;
  margin: 0 auto;
  background: #f5f5f5;

  .main {
    width: 800px;
    height: 300px;
    margin: 0 auto 20px;
    background: #008c8c;
  }

  .left-action {
    width: 50px;
    height: 300px;
    background: forestgreen;
    position: fixed;
    top: 100px;
    left: 284px;
  }

  .right-action {
    width: 50px;
    height: 300px;
    background: darkblue;
    position: fixed;
    top: 100px;
    right: 284px;
  }
}
</style>