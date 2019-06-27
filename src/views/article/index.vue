<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图片</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选区域 -->
    <!-- 列表数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          共找到
          <strong>{{totalcountL}}</strong> 条符合条件的内容
        </span>
      </div>
      <!-- table表格 -->
      <el-table class="list-table" :data="tableData" v-loading="diab" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="100">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="pubdate" label="日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="info" round>编辑</el-button>
          <el-button type="warning" round>删除</el-button>
        </el-table-column>
      </el-table>

      <!-- table表格 -->
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalcountL"
        @current-change="heaaleCurrentChange"
        :disabled="diab"
      ></el-pagination>
      <!-- 分页 -->
    </el-card>
    <!-- 列表数据 -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value1: ''
      },
      totalcountL: 0, // 统计多少条数据
      diab: false,
      statTypes: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'success',
          label: '待审核'
        },
        {
          type: 'info',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ]
    }
  },

  created: function() {
    this.loadArticles()
  },

  methods: {
    loadArticles(page = 1) {
      this.diab = true
      // const userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      // console.log(userinfo);
      axios({
        method: 'GET',
        url: '/articles',
        headers: {
          // 自定义发送请求头
          // Authorization: `Bearer ${userinfo.token}` // 注意：Bearer 和 token 之间要有空格
        },
        params: {
          page, // 请求数据的页码，不传默认为1
          per_page: 10 // 请求页面的数据大小，不穿默认是10
        }
      }).then(data => {
        // console.log(data);
        this.tableData = data.results
        this.totalcountL = data.total_count
        this.diab = false
      })
    },

    heaaleCurrentChange(page) {
      // console.log(page)
      this.loadArticles(page)
    },
    onSubmit() {
      console.log('submit!')
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
.list-table {
  margin-bottom: 30px;
}
.el-card.is-always-shadow {
  box-shadow: none;
}
.el-pagination {
  padding-left: 30%;
}
</style>