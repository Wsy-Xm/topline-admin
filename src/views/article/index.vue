<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图片</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label>全部</el-radio>
            <el-radio
              v-for="(item,index) in statTypes"
              :key="item.label"
              :label="index + ''"
            >{{ item.label}}</el-radio>
            <!-- <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <article-channel v-model="filterParams.channel_id"></article-channel>
          <!-- <el-select v-model="filterParams.channel_id" placeholder="请选择活动区域">
            <el-option label="全部" value="全部"></el-option>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="handleDateChage"
            v-model="begin_end_pubdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
          <template slot-scope="scope">
            <el-button type="info" round @click="headleRedact(scope.row.id)">编辑</el-button>
            <el-button type="warning" round @click="headleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- table表格 -->
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalcountL"
        :current-page="page"
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
import ArticleChannel from '../../components/article-channel/index'
export default {
  components: {
    ArticleChannel
  },
  name: 'AppArticle',
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
      diab: false, // 禁止分页按钮
      page: 1,
      // 状态
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
      ],
      channels: [], // 频道内容
      filterParams: {
        status: '', // 文章状态
        channel_id: '', // 频道ID
        begin_pubdate: '', // 起始时间
        end_pubdate: '' // 截至时间
      },
      begin_end_pubdate: []
    }
  },

  created: function() {
    // 分页
    this.loadArticles()
    // 文章频道
    this.loadchannels()
  },

  methods: {
    // 分页处理
    loadArticles(page = 1) {
      // console.log(page)
      this.diab = true
      // const userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      // console.log(userinfo);
      const filterData = {}
      for (let key in this.filterParams) {
        if (this.filterParams[key]) {
          filterData[key] = this.filterParams[key]
        }
      }
      // console.log(filterData);
      axios({
        method: 'GET',
        url: '/articles',
        headers: {
          // 自定义发送请求头
          // Authorization: `Bearer ${userinfo.token}` // 注意：Bearer 和 token 之间要有空格
        },
        params: {
          page, // 请求数据的页码，不传默认为1
          per_page: 10, // 请求页面的数据大小，不穿默认是10
          ...filterData
        }
      }).then(data => {
        console.log(data)
        this.tableData = data.results
        this.totalcountL = data.total_count
        this.diab = false
      })
    },
    // 获取文章频道
    loadchannels() {
      axios({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        // console.log(data.channels)
        this.channels = data.channels
        // console.log(this.channels);
      })
    },
    // 分页处理
    heaaleCurrentChange(page) {
      // console.log(page)
      this.page = page
      this.loadArticles(page)
    },
    onSubmit() {
      // console.log(11111)
      this.page = 1
      this.loadArticles()
    },
    // 时间处理
    handleDateChage(value) {
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
      console.log(value)
    },
    // 编辑
    headleRedact(id) {
      // console.log(id);
      this.$router.push(`/publish/${id}`)
    },
    // 删除
    headleDelete(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          axios({
            method: 'DELETE',
            url: `/articles/${id}`
          }).then(data => {
            // console.log(data)
            this.loadArticles()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
.list-table {
  margin-bottom: 30px;
}
.el-card.is-always-shadow {
  box-shadow: none;
}
</style>