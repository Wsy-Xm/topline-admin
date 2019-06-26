<template>
  <el-container>
    <!-- 侧边栏 -->
    <AppAside></AppAside>
    <el-container>
      <el-header>
        <!-- 头部 -->
        <AppHeader></AppHeader>
      </el-header>
      <el-main>
        <!-- 主体 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-aside {
    background: #d3dce6;
  }
  .el-header {
    background: #b3c0d1;
  }
  .el-main {
    background: #e9eef3;
  }
}
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    border-radius: 50%;
  }
}
</style>