<template>
  <div class="box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
        <!-- <el-button style="float: right" type="primary" @click="headleUploading">上传图片</el-button> -->
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
          style="float: right"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="2" style="margin-top:40px;">
        <el-col :span="5" v-for="item in count" :key="item.results" :offset="1">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.url"
              class="image"
              style="max-width: 100%;height: 100%"
            >
            <div style="padding: 14px;">
              <el-button type="primary" icon="el-icon-star-off" circle plain></el-button>
              <el-button type="primary" icon="el-icon-delete" circle plain></el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Appimage',
  data() {
    return {
      radio1: '全部',
      count: [],
      src: [],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  created() {
    // 加载图片资源
    this.headleUpload()
  },
  mounted() {
    console.log(this.src)
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 加载图片资源
    headleUpload() {
      axios({
        method: 'GET',
        url: `/user/images`
      }).then(data => {
        console.log(data)
        this.count = data.results
      })
    },
    beforeAvatarUpload(item) {
      console.log(item.name)
      const fromData = new FormData()
      fromData.append('image', item)
      // console.log(fromData)
      axios({
        method: 'POST',
        url: `/user/images`,
        data: fromData
      }).then(data => {
        // console.log(data.url);
        console.log(123)
        // this.src.push(data.url);
        // console.log(this.src)
        this.headleUpload()
      })
    }
  }
}
</script>

<style lang="less">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.el-card {
  width: 100%;
  height: 100%;
}
.box {
  height: 100%;
}
.el-row {
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>