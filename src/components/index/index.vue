<template>
  <div class="index">
    <!-- <div class="box_1">Introduction1</div>
    <div class="box_2">Introduction2</div> -->
    <div class="box_3">
      <router-view></router-view>
      <div class="picture">
        <div class="block">
          <el-image
            :src="imgUrl.img1"
            fit="contain"
          ></el-image>
          <div class="text">润色修改服务</div>
        </div>
        <div class="block">
          <el-image
            :src="imgUrl.img2"
            fit="contain"
          ></el-image>
          <div class="text">ESSAY原创定制服务</div>
        </div>
        <div class="block">
          <el-image
            :src="imgUrl.img3"
            fit="contain"
          ></el-image>
          <div class="text">留学申请服务</div>
        </div>
        <div class="block">
          <el-image
            :src="imgUrl.img4"
            fit="contain"
          ></el-image>
          <div class="text">作业辅导服务</div>
        </div>
      </div>
    </div>
    <div class="box_4"></div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      
      fit: 'fill',
      imgUrl:{
        img1:require('@/assets/img/test1.jpg'),
        img2:require('@/assets/img/test2.jpg'),
        img3:require('@/assets/img/test3.jpg'),
        img4:require('@/assets/img/test4.jpg')
      }
    };
  },
  
};
</script>

<style lang='less' scoped>
.index {
  .box_1 {
    font-size: 50px;
    height: 600px;
    background-color: brown;
  }
  .box_2 {
    font-size: 50px;
    height: 300px;
    background-color: #00295c;
  }
  .box_3 {
    width: 100%;
    font-size: 50px;
    height: 1200px;
    float: left;
    display: flex;
    flex-direction: row; 
    justify-content: space-evenly;
    padding: 3% 0 0 0 ;
    
    .picture {
      width: 360px;
      height: 100%;
      // float: left;
      margin: 0% 4% 0% 0%;
      .block{
        margin: 0% 0% 5% 0%;
        .el-image{
          width: 360px;
          height: 270px;
        }
        .text{
          font: 900 15px/30px CircularStd;
          color: #000000;
          text-align: center;
        }
      }
    }
  }
  .box_4 {
    font-size: 50px;
    height: 300px;
    background-color: #d4f4fc;
  }
}
</style>