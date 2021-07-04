<template>
  <div class="order_block">
    <!-- <el-page-header @back="goBack" content="Create Your Order">
    </el-page-header> -->
    <el-form
      :model="orderForm"
      :rules="rules"
      ref="orderForm"
      label-width="230px"
      class="orderForm"
    >
      <el-form-item label="Your name：" prop="custname">
        <el-input v-model="orderForm.custname" placeholder="个人姓名"></el-input>
      </el-form-item>
      <el-form-item label="Your email：" prop="email">
        <el-input v-model="orderForm.email" placeholder="个人邮箱"></el-input>
      </el-form-item>
      <el-form-item label="Your Wechat：" prop="wechatno">
        <el-input v-model="orderForm.wechatno" placeholder="微信号码"></el-input>
      </el-form-item>
      <el-form-item label="Type of your assignment：" prop="jobtype">
        <tf-select v-model="orderForm.jobtype" option="jobtype" placeholder="作业类型"></tf-select>
      </el-form-item>
      <el-form-item label="Writer level：" prop="grade">
        <tf-select v-model="orderForm.grade" option="grade" placeholder="写作水平"></tf-select>
      </el-form-item>
      <el-form-item label="Target score：" prop="target">
        <tf-select v-model="orderForm.target" option="target" placeholder="目标分数"></tf-select>
      </el-form-item>
      <el-form-item label="Deadline：" prop="deadline">
        <el-date-picker
          v-model="orderForm.deadline"
          type="date"
          placeholder="截至日期"
        >
        </el-date-picker>
      </el-form-item> 
      <el-form-item label="Word count：">
                <el-input
                  v-model="orderForm.wordcount"
                  type="number"
                  placeholder="字数"
                ></el-input>
              </el-form-item>
       
      <el-form-item class="button-block">
        <el-button type="primary" @click="createOrder('orderForm')">立即创建</el-button>
        <el-button @click="resetForm('orderForm')">重置</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script>
import TfSelect from '@/common/TfSelect'
export default {
    components:{
        TfSelect
    },
    data() {
      return {
        orderForm:{
          custname:'',
          email:'',
          wechatno:'',
          jobtype:'',
          grade:'',
          target:'',
          wordcount: 1,
          deadline:'',
          isurgent:''
        },
        rules: {
          custname: [
            { required: true, message: "请输入您的名字", trigger: "blur" },
          ],
          email: [
            { required: true, message: "为了方便客服联系您，请输入您的邮箱", trigger: "blur" },
            // { validator: checkEmail, trigger: 'blur' }
          ],
          wechatno: [
            { required: true, message: "为了方便客服联系您，请输入您的微信号", trigger: "blur" },
          ],
          jobtype: [
            { required: true, message: "请选择作业类型", trigger: "blur" },
          ],
          grade:[
            { required: true, message: "请选择写作水平", trigger: "blur" },
          ],
          target:[
            { required: true, message: "请选择期望分数", trigger: "blur" },
          ],
          deadline:[
            { required: true, message: "请选择截止日期", trigger: "blur" },
            // { validator: this.checkDeadline, trigger: 'change' }
          ]
        },
        checkDeadline: (rule, value, callback) => {
          let day = this.$utils.date.diffDays(value,new Date())
            console.log("day",day)
            if (day < 0){
              return callback(new Error('截止日期必须大于当前日期'));
            }else{
              callback()
            }
        }
    };
  },
  watch:{
    // "orderForm.wordcount": {
    //   handler() {
    //     console.log("orderForm.wordcount",this.orderForm.wordcount)
    //   },
    // },
    "orderForm.deadline": {
      handler() {
        console.log(this.orderForm.deadline,"this.orderForm.deadline")
        var day = this.$utils.date.diffDays(this.orderForm.deadline,new Date())
        if (day <= 7){
          this.orderForm.isurgent = '01';
        } else {
          this.orderForm.isurgent = '00';
        }
      },
    },
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.orderForm.wordcount = '1'
      this.orderForm.deadline= null
    },
    initOrderForm(){
      let val = this.$store.state.orderForm
      this.orderForm.jobtype  = val.jobtype
      this.orderForm.grade    = val.grade   
      this.orderForm.target   = val.target  
      this.orderForm.wordcount  = val.wordcount 
      this.orderForm.deadline = val.deadline
    },
    async createOrder(formName){
      
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          let day = this.$utils.date.diffDays(this.orderForm.deadline,new Date())
          if (day <= 7){
            this.orderForm.isurgent = '01';
          } else {
            this.orderForm.isurgent = '00';
          }
          let loading = this.$loading({
            lock: true,
            text: "loading",
            background: 'rgba(0,0,0,.7)'
          })
          const res1 = this.$http.post(      // eslint-disable-line no-unused-vars
            "/order/createOrder",
            this.orderForm
          ).then((res1) =>{
              loading.close();
              if (res1.data.resposeCode === '10001'){
                this.$alert('亲，您已下单成功，请耐心等待工作人员联系您~', '', {
                  confirmButtonText: '确定',
                });
              } else{
                this.$alert('亲，由于系统原因下单失败，您可直接联系工作人员下单，微信号：catAshera3', '', {
                  confirmButtonText: '确定',
                });
              }
            }
          )
          console.log("this.$refs[formName]",this.$refs[formName])
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      
    },
    // goBack(){
    //   this.$router.push('/index')
    // }
  },
  mounted(){
    this.initOrderForm();
  }
};
</script>

<style lang='less' scoped>
.order_block{
    background-color: white;
      width: 93%;
      height: 80%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.04);
      margin: 0% 3% 0% 2%;
      .el-form{
        margin: 5% 0 0 0;
      }
}
// .background{
//   font-size: 50px;
//     height: 300px;
//     background-color: #d4f4fc;
//     z-index: 1;
//     position: relative;
// }
/* .el-input-number{
  width:400px;
}
.el-input__inner{
  width:400px;
} */

.el-form-item {
  width: 650px;
  // margin: 10%;
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
.button-block{
  width: 500px;
  margin-top: 20px;
  float: right;
}

</style>