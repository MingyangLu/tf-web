<template>
  <el-dialog
    class="create-dialog"
    title="修改"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <el-form
      ref="queryForm"
      :model="dataForm"
      label-width="150px"
      :rules="rules"
    >
      <el-row :gutter="24">
        <el-col :span="11"
          ><el-form-item label="角色ID" prop="roleid">
            <el-input v-model="dataForm.roleid"></el-input> </el-form-item
        ></el-col>
        <el-col :span="11"
          ><el-form-item label="角色名称" prop="rolename">
            <el-input v-model="dataForm.rolename"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="11"
          ><el-form-item label="角色描述" prop="roledesc">
            <el-input v-model="dataForm.roledesc"></el-input> </el-form-item
        ></el-col>
        <el-col :span="11"
          ><el-form-item label="角色状态" prop="rolestate">
            <tf-select v-model="dataForm.rolestate" option="rolestate"></tf-select> </el-form-item
        ></el-col>
      </el-row>  
    </el-form>
    <div class="button-block">
      <el-button type="primary" @click="handleConfirm()"
        >确认</el-button
      >
      <el-button @click="cancel()">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/utils/bus";
import TfSelect from "@/common/TfSelect";

export default {
  components: { TfSelect },
  data() {
    return {
      dataForm: {
        roleid:'',
        rolename:'',
        roledesc:'',
        rolestate:'',
      },
      dialogVisible: false,
      rules: {
        
        custname: [
          { required: true, message: "请输入您的真实姓名", trigger: "blur" },
        ],
        wechatno: [
          { required: true, message: "请输入您的微信号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择该用户角色", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          // { validator: checkEmail, trigger: 'blur' }
        ],
      },
      // isUseridRepeat: false,
    };
  },
  methods: {
    async handleConfirm() {
      let loading = this.$loading({
        lock: true,
        text: "loading",
        background: "rgba(0,0,0,.7)",
      });
      const res = await this.$http
        .post("/user/updateUser", this.dataForm)
        .then((res) => {
          loading.close();
          if (res.data.resposeCode === "10001") {
            this.$message({
              message: "修改用户信息成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.refreshGrid();
          } else {
            this.$alert(
              "修改用户信息失败，请联系工作人员，微信号：catAshera3",
              "",
              {
                confirmButtonText: "确定",
              }
            );
          }
        })
        .catch((err) => {
          loading.close();
          console.log(err, "err");
        });
      console.log(res, "res");
    },
    cancel() {
      this.dialogVisible = false;
    },
    async isUseridRepeat() {
      const res = await this.$http.post("/user/countUser", {
        userid: this.dataForm.userid,
      });
      if (res.data.data > 0) {
        console.log("res success", res);
        return true;
      }
      console.log("res error", res);
      return false;
    },
    refreshGrid(){
      bus.$emit('query',true);
    }
  },
  mounted() {
    bus.$on("updateDialogVisible", (row) => {
      this.dialogVisible = true;
      this.dataForm.userid   = row.userid     
      this.dataForm.custname = row.custname   
      this.dataForm.phoneno  = row.phoneno    
      this.dataForm.username = row.username   
      this.dataForm.email    = row.email   
      this.dataForm.wechatno = row.wechatno   
      this.dataForm.password = row.password   
      this.dataForm.roleid   = row.roleid     
      this.dataForm.userstate= row.userstate   
      console.log('row',row)
    });
  },
};
</script>

<style lang='less' scoped>
.create-dialog {
  width: 100%;
  height: 1000px;
}
.el-select {
  width: 100%;
}
.button-block {
  width: 500px;
  margin: 2% 0% 0% 80%;
}
</style>