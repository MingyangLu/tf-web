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
          ><el-form-item label="用户ID：" prop="userid">
            <el-input v-model="dataForm.userid"></el-input> </el-form-item
        ></el-col>
        <el-col :span="11"
          ><el-form-item label="用户姓名：" prop="custname">
            <el-input v-model="dataForm.custname"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="11"
          ><el-form-item label="电子邮箱：" prop="email">
            <el-input v-model="dataForm.email"></el-input> </el-form-item
        ></el-col>
        <el-col :span="11"
          ><el-form-item label="微信号：" prop="wechatno">
            <el-input v-model="dataForm.wechatno"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="11"
          ><el-form-item label="手机号码：" prop="phoneno">
            <el-input v-model="dataForm.phoneno"></el-input> </el-form-item
        ></el-col>
        <el-col :span="11"
          ><el-form-item label="用户密码：" prop="password">
            <el-input v-model="dataForm.password"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="11"
          ><el-form-item label="用户角色：" prop="roleid">
            <tf-select
              v-model="dataForm.roleid"
              option="role"
            ></tf-select> </el-form-item
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
import TfSelect from "@/common/TfSelect";

export default {
  components: { TfSelect },
  data() {
    return {
      dataForm: {
        userid: "",
        custname: "",
        phoneno: "",
        username: "",
        email: "",
        wechatno: "",
        password: "",
        roleid: "",
      },
      dialogVisible: false,
      rules: {
        userid: [
          // { required: true, message: "请输入您的登录账号", trigger: "blur" },
          { max: 18, message: "显示名长度必须小于等于18字符" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("登录账号不能为空"));
              }
              this.isUseridRepeat().then((result) => {
                if (result) {
                  callback(new Error("该账号已存在"));
                } else {
                  callback();
                }
              });
            },
            trigger: "blur",
          },
        ],
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
    async handleCreate() {
      let loading = this.$loading({
        lock: true,
        text: "loading",
        background: "rgba(0,0,0,.7)",
      });
      const res = await this.$http
        .post("/user/createUser", this.dataForm)
        .then((res) => {
          loading.close();
          if (res.data.resposeCode === "10001") {
            this.$message({
              message: "创建用户成功",
              type: "success",
            });
            this.dialogVisible = false;
            this.resetForm();
            this.refreshGrid();
          } else {
            this.$alert(
              "创建用户失败，请联系工作人员，微信号：catAshera3",
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