<template>
  <el-aside width="200px">
    <el-menu
      default-active="/publish"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home">
        <i class="iconfont iconshouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont iconneirongguanli"></i>
          <span slot="title">内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容管理</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/image">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont iconfensiguanli"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="/fans/overview">粉丝概况</el-menu-item>
          <el-menu-item index="/fans/portrayal">粉丝画像</el-menu-item>
          <el-menu-item index="/fans/list">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/account">
        <i class="iconfont iconqunfengzhanghushezhi"></i>
        <span slot="title">账户设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'APPSside',
  data() {
    return {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
}
</script>
<style lang="less">
.iconfont {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}
</style>