<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <img src="./logo_index.png" alt>
      </div>
      <div class="login-form">
        <!-- rules  配置验证规则
      将需要验证的组件上必须机上prop="name"
        ref 获取表单组件，可以手动调用表单组件的验证方法-->
        <el-form ref="FormData" :model="FormData" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="FormData.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="11">
              <el-input v-model="FormData.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="11" :offset="2">
              <el-button @click="handleSendCode" :disabled="disabled || initDis ">{{ text }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="checked">
            <el-checkbox v-model="FormData.checked">
              我已阅读并同意
              <a href="javascript:;">用户协议</a>和
              <a href="javascript:;">隐私条款</a>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn-login"
              type="primary"
              :loading="loginLoading"
              @click="hadnleLogin"
            >登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '../../vendor/gt'
const Seconds = 60
export default {
  name: 'login',
  data() {
    return {
      FormData: {
        mobile: '15097317238', // 手机号
        code: '246810', // 验证码
        checked: '' // 验证用户协议时候选中
      },
      // 验证表单
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须为6个字符', trigger: 'blur' }
        ],
        checked: [
          { required: true, message: '请同意用户协议', trigger: 'change' }, // trigger表示选中不选中
          // pattern正则验证 必须是true
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      captchaObj: null, // 控制人工交互的DOM节点
      loginLoading: false, // 点击登陆以后登陆按钮禁用
      text: '发送验证码',
      count: Seconds, // 控制60秒
      disabled: false, // 表单禁用
      initializeMobile: '', // 接收初始化的手机号
      initDis: false, // 点击发送验证码初始化的时候禁用按钮
      isOK: false
    }
  },
  methods: {
    // 登陆事件方法
    hadnleLogin() {
      this.loginLoading = true
      // 调用组件的方法 FormData 是 ref里面的名字随便起的 对整个表单进行验证
      this.$refs['FormData'].validate(valid => {
        if (!valid) {
          this.loginLoading = false
          return
        }
        axios({
          method: 'POST',
          url: `/authorizations`,
          data: this.FormData
        })
          .then(data => {
            // console.log(res)
            // >= 200 && 400 的状态吗都会进入里面
            // console.log(res.data)
            this.$message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
            // console.log(res.data)

            this.loginLoading = false
            // 跳转页面使用路由名字
            this.$router.push({
              name: 'layout'
            })
            window.localStorage.setItem('userinfo', JSON.stringify(data))
          })
          .catch(err => {
            console.dir(err)
            // >= 的状态码都会进入到这里
            this.$message.error('登陆失败了，手机号或者验证码错误')
            console.dir(err)
            // 和上面的等价只是这样更严谨  这样只有400的状态吗可以进来 其他的都不会进来的
            if (err.response.status === 400) {
              this.$message.error('登陆失败了，手机号或者验证码错误')
            }
            this.loginLoading = false
          })
      })
    },
    // 发送验证码
    handleSendCode() {
      // 对部分表单字段进行校验的方法
      this.$refs['FormData'].validateField('mobile', errorMessage => {
        // console.log(errorMessage.trim());
        if (errorMessage.trim().length > 0) {
          return
        }
        // 调用初始化显示
        // this.showInitialize();
        // 控制显示人工验证
        if (this.captchaObj) {
          // return this.captchaObj.verify(); // 显示验证码
          // 如果手机号不相同就重新初始化 手机号相同就直接显示
          if (this.FormData.mobile !== this.initializeMobile) {
            // 重新初始化之前，将原来的验证码插件 DOM 删除
            document.body.removeChild(document.querySelector('.geetest_panel'))

            // 重新初始化
            this.showInitialize()
          } else {
            // 显示人机交互
            this.captchaObj.verify()
          }
        } else {
          // 初始化
          this.showInitialize()
        }
      })
    },
    // 初始化显示
    showInitialize() {
      // console.log(this.FormData)
      this.initDis = true
      axios({
        method: 'GET',
        url: `/captchas/${this.FormData.mobile}`
      }).then(data => {
        // console.log(res.data);
        // const data = data;
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
          captchaObj => {
            this.captchaObj = captchaObj
            // 这里可以调用验证实例 captchaObj 的实例方法
            // console.log(captchaObj)
            captchaObj
              .onReady(() => {
                this.initializeMobile = this.FormData.mobile
                captchaObj.verify() // 显示验证码
                this.initDis = false
              })
              .onSuccess(() => {
                // console.log('验证成功了')
                // console.log(this.count , this.text)
                console.log(captchaObj.getValidate())
                const {
                  geetest_challenge: challenge,
                  geetest_seccode: seccode,
                  geetest_validate: validate
                } = captchaObj.getValidate()
                // console.log(challenge,validate,seccode)
                axios({
                  method: 'GET',
                  url: `/sms/codes/${this.FormData.mobile}`,
                  params: {
                    challenge,
                    seccode,
                    validate
                  }
                }).then(red => {
                  // console.log(res.data)
                  // 验证码倒计时
                  this.codeCountDown()
                })
              })
          }
        )
      })
    },
    // 验证码倒计时
    codeCountDown() {
      this.disabled = true
      this.text = `${this.count}秒后重新发送`
      var fing = window.setInterval(() => {
        this.text = `${--this.count}秒后重新发送`
        // console.log(--this.count)
        if (this.count === 0) {
          window.clearInterval(fing)
          this.text = '发送验证码'
          this.count = Seconds
          this.disabled = false
        }
      }, 1000)
    }
  }
}
</script>

// 样式
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