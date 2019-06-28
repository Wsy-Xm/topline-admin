<template>
  <div>
    <el-select clearable :value= 'value'
    @change="headleChannel">
      <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id"

      ></el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'APPArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      channels: []
    }
  },
  created() {
    this.loadchannels()
  },
  methods: {
    // 获取频道列表
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
    headleChannel(index) {
      // console.log(index)
      this.$emit('input', index)
    }
  }
}
</script>

<style lang="less">
</style>