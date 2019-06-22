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
import '../../vendor/gt'

export default {
  name: 'login',
  data() {
    return {
      FormData: {
        mobile: '15097317238',
        code: ''
      },
      captchaObj: null
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleSendCode() {
      // 控制显示人工验证
      if (this.captchaObj) {
        return this.captchaObj.verify() // 显示验证码
      }

      // console.log(this.FormData)
      // 结构辅助
      const { mobile } = this.FormData
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        console.log(res.data)
        const data = res.data.data
        // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
        // 加上window前缀因为不知道他是全局，会以为他是未定的变量
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind'
          },
          (captchaObj) => {
            this.captchaObj = captchaObj
            // 这里可以调用验证实例 captchaObj 的实例方法
            // console.log(captchaObj)
            captchaObj.onReady(function() {
              captchaObj.verify() // 显示验证码
            }).onSuccess(function() {
              console.log('验证成功了')
            })
          }
        )
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