<template>
  <el-card class="queryForm">
    <el-form ref="queryForm" :model="queryForm" label-width="150px">
      <el-row :gutter="24">
        <el-col :span="8"
          ><el-form-item label="用户ID：" prop="userid">
            <el-input v-model="queryForm.userid"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="真实姓名：" prop="custname">
            <el-input v-model="queryForm.custname"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="用户权限：" prop="roleid">
            <tf-select
              v-model="queryForm.roleid"
              option="role"
            ></tf-select> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8"
          ><el-form-item label="电子邮箱" prop="email">
            <el-input v-model="queryForm.email"></el-input>
          </el-form-item>
            </el-col>
        <el-col :span="8"
          ><el-form-item label="微信号：" prop="wechatno">
            <el-input v-model="queryForm.wechatno"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="手机号码：" prop="phoneno">
            <el-input v-model="queryForm.phoneno"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="8"
          ><el-form-item label="用户状态：" prop="userstate">
            <tf-select
              v-model="queryForm.userstate"
              option="userstate"
            ></tf-select> </el-form-item
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
          "/user/getUserList",
          this.queryForm
        )
        .then((res1) => {
          loading.close();
          if (res1.data.resposeCode === "10001") {
            bus.$emit("userList", res1.data.data.list);
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