<template>
  <el-row class="app-header">
    <i class="iconfont iconzhang"></i>
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30" :src="userinfo.photo">
          {{userinfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item @click.native="headleExit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'APPHeader',
  data() {
    return {
      userinfo: {}
    }
  },
  mounted: function() {
    // console.log(1)
    // console.log(JSON.parse(window.localStorage.getItem('name')))
    this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
    // console.log(this.userinfo)
  },
  methods: {
    // 退出登陆
    headleExit() {
      window.localStorage.removeItem('userinfo')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="less">
</style>