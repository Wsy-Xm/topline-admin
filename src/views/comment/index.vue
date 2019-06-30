<template>
  <div>
    <template>
      <el-table :data="tableData" style="width: 100%" v-loading="disa || onOff">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="开关">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="headleChange(scope.row)"
              :disabled="onOff"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page"
        :total="total"
        @current-change="heaaleCurrentChange"
        :disabled="disa"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'APPComment',
  data() {
    return {
      tableData: [],
      value: '',
      loading: false,
      total: null,
      page: 1,
      disa: false,
      onOff: false
    }
  },
  // 加载数据
  created: function() {
    this.loading = true
    axios({
      method: 'GET',
      url: '/articles',
      params: {
        response_type: 'comment'
      }
    }).then(data => {
      // console.log(data);
      this.total = data.total_count
      this.tableData = data.results
      //   console.log(this.tableData);
      this.loading = false
    })
  },
  methods: {
    // 评论开关处理
    headleChange(data) {
      //    console.log(data.id.toString());
      this.onOff = true
      axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: data.id.toString()
        },
        data: {
          allow_comment: data.comment_status
        }
      })
        .then(data => {
          // console.log(data)
          //   this.$message(data.allow_comment ? '启用评论状态成功':'关闭评论状态成功');
          this.onOff = false
          this.$message({
            message: `${data.allow_comment ? '启用' : '关闭'}评论状态成功`,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('修改评论状态失败')
        })
    },
    // 分页处理
    heaaleCurrentChange(page = 1) {
      this.disa = true
      // console.log(page);
      this.page = page
      // console.log(page)
      axios({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          per_page: 10,
          response_type: 'comment'
        }
      }).then(data => {
        // console.log(data);
        // console.log(page);
        this.disa = false
        this.tableData = data.results
      })
    }
  }
}
</script>

<style lang="less">
.el-pagination {
  margin-top: 30px;
  margin-left: 30%;
}
</style>