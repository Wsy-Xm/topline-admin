<template>
  <div>
    <el-card class="publish-card" v-loading="loading">
      <div slot="header" class="header">
        <span>{{ $route.name === 'publish-amend' ? '修改文章':'发布文章' }}</span>
      </div>
      <el-form>
        <el-form-item label="标题">
          <el-input type="text" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-input type="textarea" v-model="formData.content"></el-input> -->
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor v-model="formData.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
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
          <el-button
            type="success"
            @click="headleLssue(false)"
            :loading="buttonLoading"
          >{{ $route.name === 'publish-amend' ? '修改':'发布' }}</el-button>
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

// 富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 富文本引入
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor
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
      loading: false,
      editorOption: {} // 富文本相关
    }
  },

  // 计算属性
  // computed: {
  //   isEdit:function () {
  //     return this.$route.name === "publish-amend";
  //   }
  // },

  created() {
    // 判断是编辑还是发布
    // console.log(this.$route.name === "publish-amend");
    // console.log(this.$route)
    if (this.$route.name === 'publish-amend') {
      this.loadingData()
    }
  },
  // 富文本编辑器
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  // 富文本编辑器
  // mounted() {
  //   console.log("this is current quill instance object", this.editor);
  // },
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
    // 点击编辑加载响应的数据
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
      })
    }
  }
}
</script>

<style lang="less">
.ql-editor {
  height: 300px;
}
</style>