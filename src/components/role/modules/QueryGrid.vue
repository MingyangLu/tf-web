<template>
  <el-card class="queryGrid">
    <el-button class="create-button" type="primary" @click="showCreateDialog">新增</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="roleid" label="角色ID">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称">
      </el-table-column>
      <el-table-column prop="roledesc" label="角色描述">
      </el-table-column>
      <el-table-column prop="rolestate" label="角色状态">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column> 
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
    getOrderList(){
      bus.$on('dataList', (value) => {
        this.tableData = value;
      })
    },
    handleUpdate(row) {
      bus.$emit("updateDialogVisible", row);
    },
    handleDelete(row) {
      this.$http.post('/role/deleteRole',{
        userid: row.userid
      })
      bus.$emit("query", true);
    },
    handlePageSizeChange(val){
      this.$store.commit('setPageSize',val)
      bus.$emit("query", true);
    },
    handleCurrentPageChange(val){
      this.$store.commit('setCurrentPage',val)
      bus.$emit("query", true);
    },
    showCreateDialog(){
      bus.$emit("createDialogVisible", true);
    }
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
  .create-button{
    margin: 0 0 1% 0;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>