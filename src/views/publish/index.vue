<template>
  <div>
    <el-card class="publish-card" v-loading="loading">
      <div slot="header" class="header">
        <span>发布文章</span>
      </div>
      <el-form>
        <el-form-item label="标题">
          <el-input type="text" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="封面"></el-form-item>
        <el-form-item label="频道">
          <!-- article-channel -->
          <!--
            :value = 'formData.channel_id'
            @input="headleChannel"
            相当于下面的v-model
          -->
          <article-channel v-model="formData.channel_id"></article-channel>
          <!-- <el-select placeholder="请选择活动区域" v-model="formData.channel_id">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>-->
        </el-form-item>
        <div>
          <el-button type="success" @click="headleLssue(false)" :loading="buttonLoading">发布</el-button>
          <el-button type="primary" @click="headleLssue(true)" :loading="buttonLoading">存入草稿</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
// import ArticleChannel from '@components/article-channel/'
import ArticleChannel from '../../components/article-channel/index'

export default {
  name: 'AppPublish',
  components: {
    ArticleChannel
  },
  data() {
    return {
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: ''.toString() // 文章所属频道id
      },
      buttonLoading: false,
      loading: false
    }
  },
  mounted() {
    console.log(this.$route.name === 'publish-amend')
    if (this.$route.name === 'publish-amend') {
      this.loadingData()
    }
  },
  methods: {
    headleLssue(draft) {
      // console.log(draft);
      // console.log(this.formData);
      this.buttonLoading = true
      axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.formData
      })
        .then(data => {
          // console.log(data)
          this.$message({
            message: '文章添加成功',
            type: 'success'
          })
          this.buttonLoading = false
        })
        .catch(err => {
          console.log(err)
          this.$message.error('文章添加失败')
        })
    },
    // 上面使用了v-mondel 就不需要写这个了
    // headleChannel (index) {
    //   console.log(index)
    //   this.formData.channel_id = index;
    // }
    loadingData() {
      // console.log(this.$route.params.id)
      this.loading = true
      axios({
        method: 'GET',
        url: `/articles/${this.$route.params.id}`
      }).then(data => {
        // console.log(data)
        this.formData = data
        this.loading = false
        this.loading = true
      })
    }
  }
}
</script>

<style lang="less">
</style>