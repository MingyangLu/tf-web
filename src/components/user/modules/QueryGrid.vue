<template>
  <el-card class="queryGrid">
    <el-button class="create-button" type="primary" @click="showCreateDialog">新增</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand"><template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户昵称">
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="用户角色">
            <span>{{ props.row.roleid }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.createtime }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ props.row.email }}</span>
          </el-form-item>
          <el-form-item label="微信号">
            <span>{{ props.row.wechatno }}</span>
          </el-form-item>
          <el-form-item label="密码">
            <span>{{ props.row.password }}</span>
          </el-form-item>
          <el-form-item label="用户状态">
            <span>{{ props.row.userstate }}</span>
          </el-form-item>
        </el-form>
      </template></el-table-column>
      <el-table-column prop="userid" label="用户ID">
      </el-table-column>
      <!-- <el-table-column prop="username" label="用户昵称" width="200">
      </el-table-column> -->
      <el-table-column prop="custname" label="真实姓名">
      </el-table-column>
      <el-table-column prop="roleid" label="用户角色">
      </el-table-column>
      <!-- <el-table-column prop="createtime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="email" label="电子邮箱" width="200">
      </el-table-column>
      <el-table-column prop="wechatno" label="微信号" width="200">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="200">
      </el-table-column>
      <el-table-column prop="userstate" label="用户状态" width="200">
      </el-table-column> -->
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
      bus.$on('userList', (value) => {
        this.tableData = value;
      })
    },
    handleUpdate(row) {
      bus.$emit("updateDialogVisible", row);
    },
    handleDelete(row) {
      this.$http.post('/user/deleteUser',{
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