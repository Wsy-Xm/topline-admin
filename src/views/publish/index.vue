<template>
  <div>
    <el-card class="publish-card">
      <div slot="header" class="header">
        <span>发布文章</span>
        <div>
          <el-button type="success">发布</el-button>
          <el-button type="primary">存入草稿</el-button>
        </div>
      </div>
      <el-form>
        <el-form-item label="标题">
          <el-input type="text"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="封面"></el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less">
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>