<template>
  <el-card class="queryForm">
    <el-form ref="queryForm" :model="queryForm" label-width="150px">
      <el-row :gutter="24">
        <el-col :span="8"
          ><el-form-item label="个人邮箱：" prop="email">
            <el-input v-model="queryForm.email"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="微信号码：" prop="wechatno">
            <el-input v-model="queryForm.wechatno"></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="作业类型：" prop="jobtype">
            <tf-select
              v-model="queryForm.jobtype"
              option="jobtype"
            ></tf-select> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8"
          ><el-form-item label="写作水平：" prop="grade">
            <tf-select
              v-model="queryForm.grade"
              option="grade"
            ></tf-select> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="目标分数：" prop="target">
            <tf-select
              v-model="queryForm.target"
              option="target"
            ></tf-select> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="是否紧急：" prop="isurgent">
            <tf-select
              v-model="queryForm.isurgent"
              option="isurgent"
            ></tf-select> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12"
          ><el-form-item label="截至日期：" prop="deadline">
            <el-date-picker
              v-model="queryForm.deadlineRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="datePickerOptions"
            >
            </el-date-picker> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="18"
          ><el-form-item label="字数：">
            <el-input
              v-model="queryForm.wordCountRangeStart"
              type="number"
            ></el-input>
            至
            <el-input
              v-model="queryForm.wordCountRangeEnd"
              type="number"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button class="button-reset">重置</el-button>
          <el-button class="button-query" type="primary" @click="queryOrder()"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import bus from "@/utils/bus";
export default {
  data() {
    return {
      queryForm: {
        email: "",
        wechatno: "",
        jobtype: "",
        grade: "",
        target: "",
        wordCountRangeStart: 1,
        wordCountRangeEnd: 100000,
        deadlineRange: [],
        isurgent: "",
        pageSize:10,
        currentPage:1
      },
      //日期选择框快捷选项
      datePickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    async queryOrder() {
      let loading = this.$loading({
        lock: true,
        text: "loading",
        background: "rgba(0,0,0,.7)",
      });
      this.queryForm.pageSize = this.$store.state.pageSize 
      this.queryForm.currentPage = this.$store.state.currentPage
      await this.$http
        .post(
          // eslint-disable-line no-unused-vars
          "/order/getOrderList",
          this.queryForm
        )
        .then(res1 => {
          loading.close();
          if (res1.data.resposeCode === "10001") {
            bus.$emit("orderList", res1.data.data);
            console.log('queryOrderListResponse',res1.data.data)
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
    },
  },
  mounted(){
    bus.$on('changePageSize', (value) => {
      console.log("传过去之后",value)
        // this.pageSize = value;
        this.queryOrder();
    })
    bus.$on('changeCurrentPage', (value) => {
        console.log("传过去之后",value)
        console.log("currentPage",this.queryForm.currentPage)
        // this.queryForm.currentPage = value;
        this.queryOrder();
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
  // .seperator{
  //     margin: 0% 10px 0% 10px;
  // }

  .button-reset {
    float: right;
    margin: 0 30px 0 10px;
  }
  .button-query {
    float: right;
  }
}
</style>