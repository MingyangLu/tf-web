<template>
  <el-card class="queryForm">
    <el-form ref="queryForm" :model="queryForm" label-width="150px">
      <el-row :gutter="24">
        <el-col :span="8"
          ><el-form-item label="角色ID：" prop="roleid">
            <el-input v-model="queryForm.roleid"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="角色名称：" prop="rolename">
            <el-input v-model="queryForm.rolename"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="角色状态：" prop="rolestate">
            <tf-select v-model="queryForm.rolestate" option="rolestate"></tf-select> </el-form-item
        ></el-col>
      </el-row>

      <div class="button-block">
      <el-button class="button-query" type="primary" @click="query()"
            >查询</el-button>
          <el-button class="button-reset" @click="reset()">重置</el-button>
         </div> 
    </el-form>
  </el-card>
</template>

<script>
import bus from "@/utils/bus";
export default {
  data() {
    return {
      queryForm: {
        roleid:'',
        rolename:'',
        roledesc:'',
        rolestate:'',
        pageSize:10,
        currentPage:1
      },
    }
  },
  methods: {
    async query() {
      let loading = this.$loading({
        lock: true,
        text: "loading",
        background: "rgba(0,0,0,.7)",
      });
      this.queryForm.pageSize = this.$store.state.pageSize 
      this.queryForm.currentPage = this.$store.state.currentPage
      const res1 = await this.$http
        .post(
          // eslint-disable-line no-unused-vars
          "/role/getRoleList",
          this.queryForm
        )
        .then((res1) => {
          loading.close();
          if (res1.data.resposeCode === "10001") {
            bus.$emit("dataList", res1.data.data.list);
          } else {
            this.$alert(
              "查询出错，请联系工作人员，微信号：catAshera3",
              "",
              {
                confirmButtonText: "确定",
              }
            );
          }
        })
        .catch((err) => {
          loading.close();
          console.log(err,"err")
        })
        console.log('res1',res1)
    },
    reset() {
        this.queryForm = {
          userid:'',
          username:'',
          custname:'',
          phoneno:'',
          roleid:'',
          email: "",
          wechatno: "",
          userstate:'',
          pageSize:10,
          currentPage:1
        }
    },
    
  },
  mounted(){
    bus.$on('query', (val) => {
      console.log(val)
        this.query();
    })
  }
};
</script>

<style lang='less' scoped>
.queryForm {
  width: 95%;
  height: 100%;
  margin: 20px 0% 0% 0%;
  // padding: 30px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.04);
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;

  .el-input {
    width: 220px;
  }
  .el-select {
    width: 220px;
  }
  .el-date-editor{
    width: 460px;
  }
  .button-block{
    margin:0 0 0 85%;
  }
}
</style>