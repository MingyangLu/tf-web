<template>
  <el-dialog>
    <el-form ref="queryForm" :model="queryForm" label-width="150px">
      <el-row :gutter="24">
        <el-col :span="12"
          ><el-form-item label="个人邮箱：" prop="email">
            <el-input v-model="queryForm.email"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="微信号码：" prop="wechatno">
            <el-input v-model="queryForm.wechatno"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12"
          ><el-form-item label="作业类型：" prop="jobtype">
            <tf-select
              v-model="queryForm.jobtype"
              option="jobtype"
            ></tf-select> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>