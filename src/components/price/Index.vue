<template>
  <div class="price_caculate">
    <div class="title">Price Caculate</div>
    <div class="introduction">
      EssaysProfessors.com is one of the best custom essay writing services in
      the industry. This is the best place to buy college research papers, term
      papers and essays online at affordable prices from unemployed professors.
    </div>
    <div class="form">
      <el-form ref="price_caculate_form">
        <div class="left_form">
          <el-form-item label="Type of your assignment">
            <tf-select
              v-model="queryForm.jobtype"
              option="jobtype"
              placeholder="作业类型"
            ></tf-select>
          </el-form-item>
          <el-form-item label="Writer level">
            <tf-select
              v-model="queryForm.grade"
              option="grade"
              placeholder="写作水平"
            ></tf-select>
          </el-form-item>
          <el-form-item label="Word count">
            <el-input
              v-model="queryForm.wordcount"
              type="number"
              placeholder="字数"
            ></el-input>
          </el-form-item>
        </div>
        <div class="right_form">
          <el-form-item label="Deadline">
            <el-date-picker
              v-model="queryForm.deadline"
              type="date"
              placeholder="截至日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Target score">
            <tf-select
              v-model="queryForm.target"
              option="target"
              placeholder="目标分数"
            ></tf-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="price_box">
      <div class="price_title">Price:</div>
      <div class="price" v-if="priceTotal">{{ priceTotal }}￥</div>
      <div class="priceText" v-if="priceText">{{ priceText }}</div>
    </div>
    <el-button type="warning" round class="button" @click="toOrderPage()"
      >Order now</el-button
    >
  </div>
</template>

<script>
import TfSelect from "@/common/TfSelect";
export default {
  components: {
    TfSelect,
  },
  data() {
    return {
      userid: "000",
      username: "zhangyao",
      password: "000000",
      priceWithPage: "",
      priceTotal: "0.00",
      priceText: "",
      queryForm: {
        jobtype: "",
        grade: "",
        deadline: "",
        target: "",
        isurgent: "01",
        wordcount: "",
      },
    };
  },
  methods: {
    async getPrice() {
      let param = this.queryForm;
      const { data: res1 } = await this.$http.post("/price/getPrice", param);
      if (res1.data != null) {
        this.priceWithPage = res1.data.price_cny;
        this.priceTotal = res1.data.price_cny;
        this.priceText = "";
      } else {
        this.priceWithPage = -1;
        this.priceTotal = "";
        this.priceText = "价格视具体要求制定";
      }
    },

    changePriceByPage(value) {
      this.priceTotal = (this.priceWithPage * value).toFixed(2);
    },

    toOrderPage() {
      this.$router.push("/order");
      this.$store.commit("setOrderForm", this.queryForm);
    },
  },
  watch: {
    "queryForm.jobtype": {
      handler() {
        this.getPrice();
      },
    },
    "queryForm.target": {
      handler() {
        if (
          this.queryForm.jobtype != "" &&
          this.queryForm.target != "" &&
          this.queryForm.grade != "" &&
          this.queryForm.isurgent != ""
        )
          this.getPrice();
      },
    },
    "queryForm.deadline": {
      handler() {
        console.log(this.queryForm.deadline, "this.queryForm.deadline");
        var day = this.$utils.date.diffDays(
          this.queryForm.deadline,
          new Date()
        );
        if (day < 7) {
          this.queryForm.isurgent = "01";
        } else {
          this.queryForm.isurgent = "00";
        }
        this.getPrice();
      },
    },
    "queryForm.grade": {
      handler() {
        this.getPrice();
      },
    },
    "queryForm.wordcount": {
      handler() {
        if (this.priceWithPage === -1) {
          this.priceText = "价格视具体要求制定";
          this.priceTotal = "";
        } else {
          this.priceText = "";
          this.priceTotal = (
            this.priceWithPage * this.queryForm.wordcount
          ).toFixed(2);
        }
      },
    },
    queryForm: {
      handler() {
        this.$store.commit("setOrderForm", this.queryForm);
      },
    },
  },
  mounted() {},
};
</script>

<style lang='less' scoped>
.price_caculate {
  background-color: white;
  width: 93%;
  height: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 0% 3% 0% 2%;
  .title {
    background-color: #ebf7fa;
    font: 900 30px/100px CircularStd;
    color: #002e5e;
    text-align: left;
    display: inline-block;
    position: relative;
    width: 80%;
    padding: 0% 10% 0% 3%;
    margin: 3% 0% 0% 0%;
  }
  .introduction {
    width: 60%;
    font: 300 20px Roboto;
    color: #323538;
    text-align: left;
    margin: 3% 0% 0% 3%;
  }
  .form {
    height: 300px;
    width: 100%;
    .left_form {
      width: 40%;
      margin: 5% 0% 0% 3%;
      float: left;
      font: 300 14px CircularStd;
      color: #a3a6a9;
      text-align: left;
      // display: block;
      .el-form-item {
        width: 100%;
        margin: 10%;
        .el-select {
          width: 90%;
        }
        .el-input {
          width: 90%;
        }
      }
    }
    .right_form {
      width: 40%;
      margin: 5% 0% 0% 5%;
      float: left;
      font: 300 14px CircularStd;
      color: #a3a6a9;
      text-align: left;
      display: block;
      .el-form-item {
        width: 100%;
        margin: 10%;
        .el-select {
          width: 90%;
        }
        .el-date-editor {
          width: 90%;
        }
      }
    }
  }
  .price_box {
    width: 40%;
    display: flex;
    float: left;
    margin: 0% 0% 0% 10%;
    .price_title {
      font: 900 30px/100px CircularStd;
      color: #002e5e;
      float: left;
      margin: 0% 0% 0% 0%;
    }
    .price {
      margin: 5% 0% 0% 9%;
    }
    .priceText {
      margin: 0% 0% 0% 9%;
      font: 500 20px/100px CircularStd;
      color: #a3a6a9;
    }
  }
  .button {
    width: 20%;
    float: right;
    margin: 10% 5% 0% 0%;
    bottom: 5%;
  }
}
</style>