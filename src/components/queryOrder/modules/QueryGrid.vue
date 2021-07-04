<template>
  <el-card class="queryGrid">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="busino" label="订单编号" width="150">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="custname" label="客户姓名" width="120">
      </el-table-column>
      <el-table-column prop="jobtype" label="作业类型" width="120">
      </el-table-column>
      <el-table-column prop="grade" label="写作水平" width="120">
      </el-table-column>
      <el-table-column prop="target" label="目标分数" width="120">
      </el-table-column>
      <el-table-column prop="wechatno" label="客户微信" width="200">
      </el-table-column>
      <el-table-column prop="email" label="客户邮箱" width="180">
      </el-table-column>
      <el-table-column prop="procstate" label="订单状态" width="120">
      </el-table-column>
      <el-table-column prop="deadline" label="截止日期" width="200">
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
     <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount">
    </el-pagination>
  </el-card>
</template>

<script>
import bus from '@/utils/bus'
export default {
  data() {
    return {
      tableData: [
      ],
      currentPage:1,
      pageSize:10,
      listCount:100
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    getOrderList(){
      bus.$on('orderList', (obj) => {
        this.tableData = obj;
        this.listCount = obj.length;
      })
    },
    async query(){
        await this.$http.post(
            '/order/getOrderList',
            this.queryForm
        ).then(res => {
          console.log("orderList:",res)
          this.tableData = res.data.list
        })
    },
    handlePageSizeChange(val){
      this.$store.commit('setPageSize',val)
      bus.$emit("changePageSize", val);
    },
    handleCurrentPageChange(val){
      this.$store.commit('setCurrentPage',val)
      bus.$emit("changeCurrentPage", val);
    },
  },
  mounted(){
    this.getOrderList();
  }
  
};
</script>

<style lang='less' scoped>
.queryGrid {
  width: 95%;
  height: 100%;
  padding: 20px 0% 0% 0%;
  margin: 20px 0% 0% 0%;
  .el-pagination{
      margin: 30px 20px 20px 0%;
      float: right;
  }
}
</style>