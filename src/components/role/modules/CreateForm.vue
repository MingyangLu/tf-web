<template>
  <el-dialog
    class="create-dialog"
    title="新增"
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
          ><el-form-item label="角色名称" prop="rolename">
            <el-input v-model="dataForm.rolename"></el-input> </el-form-item
        ></el-col>
        <el-col :span="11"
          ><el-form-item label="角色描述" prop="roledesc">
            <el-input v-model="dataForm.roledesc"></el-input> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="button-block">
      <el-button type="primary" @click="handleCreate('orderForm')"
        >确认</el-button
      >
      <el-button @click="resetForm('orderForm')">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/utils/bus";
// import TfSelect from "@/common/TfSelect";

export default {
  // components: { TfSelect },
  data() {
    return {
      dataForm: {
        roleid:'',
        rolename:'',
        roledesc:'',
        rolestate:''
      },
      dialogVisible: false,
      rules: {
        rolename: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        roledesc: [
          { required: true, message: "请输入", trigger: "blur" },
          // { validator: checkEmail, trigger: 'blur' }
        ],
      },
      // isUseridRepeat: false,
    };
  },
  methods: {
    async handleCreate() {
      let loading = this.$loading({
        lock: true,
        text: "loading",
        background: "rgba(0,0,0,.7)",
      });
      const res = await this.$http
        .post("/role/createRole", this.dataForm)
        .then((res) => {
          loading.close();
          if (res.data.resposeCode === "10001") {
            this.$message({
              message: "创建角色成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.resetForm();
            this.refreshGrid();
          } else {
            this.$alert(
              "创建角色失败，请联系工作人员，微信号：catAshera3",
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
    resetForm() {
      this.dataForm = {
        userid: "",
        custname: "",
        phoneno: "",
        username: "",
        email: "",
        wechatno: "",
        password: "",
        roleid: ""
      };
    },
    refreshGrid(){
      bus.$emit('query',true);
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
  },
  mounted() {
    bus.$on("createDialogVisible", (value) => {
      this.dialogVisible = value;
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