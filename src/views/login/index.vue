<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <img src="./logo_index.png" alt>
      </div>
      <div class="login-form">
        <el-form ref="FormData" :model="FormData">
          <el-form-item>
            <el-input v-model="FormData.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-input v-model="FormData.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-button @click="handleSendCode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login" type="primary" @click="onSubmit">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      FormData: {
        mobile: '15097317238',
        code: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleSendCode() {
      // console.log(this.FormData)
      const { mobile } = this.FormData
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style lang="less">
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./login_bg.jpg) no-repeat;
  .login-form-wrap {
    background: #fff;
    padding: 20px 40px 20px;
    .btn-login {
      width: 100%;
    }
    .login-head {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      img {
        width: 200px;
      }
    }
  }
}
</style>