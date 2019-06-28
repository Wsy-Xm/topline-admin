<template>
  <el-card>
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条ID">
            <el-input :disabled="true" :value="formData.id"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机号">
            <el-input :disabled="true" :value="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="4">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="headleUploading"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-button type="primary" @click="headleRedact">保存更新</el-button>
  </el-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'APPAccount',
  data() {
    return {
      formData: {}, // 个人信息
      imageUrl: '' // 上传头像
    }
  },
  created() {
    //   加载个人信息
    this.loadData()
  },
  methods: {
    //   加载个人信息
    loadData() {
      axios({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        // console.log(data)
        this.formData = data
        this.imageUrl = data.photo
        // console.log(this.formData)
      })
    },
    // 修改个人信息
    headleRedact() {
      const { name, intro, email } = this.formData
      axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
      })
        .then(data => {
          console.log(data)
          this.$message({
            message: '信息修改成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('信息修改失败')
        })
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传头像
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    headleUploading(portrait) {
      // console.log(portrait)
      // console.log(portrait.file)
      const formData = new FormData()
      formData.append('photo', portrait.file)
      // console.log(formData);
      axios({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(data => {
        // console.log(data);
        this.imageUrl = data.photo
      })
    }
  }
}
</script>

<style lang="less">
.el-card {
  height: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>