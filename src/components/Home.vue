<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <div class="logo">
          <el-image :src="imgUrl.logo" fit="contain"></el-image>
        </div>
        <div class="yaxis"></div>
        <div class="brief">Only Experience<br />&certified writers</div>
      </div>
      <div class="right">
        <!-- <div class="telphone">+13128985323</div>
        <div class="telphone">+13596465641</div> -->
        <div class="live_chat">Login</div>
      </div>
    </div>
    <div class="navigator">
      <el-menu
        :default-active="activeIndex"
        @select="handleSelectMenu"
        class="menu"
        mode="horizontal"
        text-color="#041f64"
        active-text-color="#0c7ef7"
      >
        <el-menu-item index="1" v-if="auth.ourprocess">OUR PROCESS</el-menu-item>
        <el-menu-item index="2" v-if="auth.prices">PRICES</el-menu-item>
        <el-menu-item index="3" v-if="auth.latestcase">LATEST CASE</el-menu-item>
        <el-menu-item index="4" v-if="auth.aboutus">ABOUT US</el-menu-item>
        <el-submenu index="5" v-if="auth.management">
          <template slot="title">MANAGEMENT</template>
          <el-menu-item index="5-1">ORDER</el-menu-item>
          <el-menu-item index="5-2">USER</el-menu-item>
          <el-menu-item index="5-3">ROLE</el-menu-item>
          <el-menu-item index="5-4">AUTH</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="7">CONTACT US</el-menu-item> -->
      </el-menu>
      <div class="button">
        <el-button
          class="order_button"
          @click="toPrderPage"
          type="warning"
          round
          >Order now</el-button
        >
        <el-button class="login_button" round @click="handleLoginButton">Log In</el-button>
      </div>
      <el-drawer
        :visible.sync="drawerVisible"
        direction="rtl"
        :before-close="handleDrawerClose"
      >
        <el-form ref="loginForm"  :model="loginForm" label-width="100px">
          <el-form-item label="UserID：" prop="userid">
            <el-input v-model="loginForm.userid"></el-input> 
          </el-form-item>
          <el-form-item label="Password：" prop="password">
            <el-input v-model="loginForm.password"></el-input> 
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
    <div class="index_container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "zhangyao123",
      username: "zhangyao",
      password: "123456",
      activeIndex: "",
      imgUrl: {
        logo: require("@/assets/img/logo.png"),
      },
      loginForm:{
        userid:'',
        password:''
      },
      drawerVisible: false,
      auth:{
        ourprocess: true,
        prices:true,
        latestcase:true,
        aboutus:true,
        management:true
      }
    }
  },
  methods: {
    async getUserAuth(){
      await this.$http.post('/user/getUserAuth',{
        userid: sessionStorage.getItem('user'),
        authtype: 'menu'
      })
    },
    toPrderPage() {
      this.$router.push("/order");
    },
    handleSelectMenu(key, keyPath) {
      console.log("keyPath", keyPath);
      console.log("key", key);
      switch (key) {
        case "1":
          break;
        case "2":
          this.$router.push("/index");
          break;
        case "3":
          break;
        case "5-1":
          this.$router.push("/orderManagement");
          break;
        case "5-2":
          this.$router.push("/userManagement");
          break;
        case "5-3":
          this.$router.push("/roleManagement");
          break;
        case "5-4":
          this.$router.push("/authManagement");
          break;
      }
    },
    handleLoginButton(){
      this.drawerVisible = true;
    },
    handleDrawerClose(){
      this.drawerVisible = false;
    }
  },
  watch: {
    activeIndex: {
      handler() {
        console.log("activeIndex", this.activeIndex);
      },
    },
  },
  mounted() {
    // this.login();
  },
};
</script>

<style lang='less' scoped>
.home {
  width: 100%;
  height: 2000px;
  .header {
    width: 100%;
    height: 100px;
    background-color: #c6edfc;
    font-size: 50px;
    .left {
      width: 37%;
      height: 100px;
      float: left;
      display: flex;
      .logo {
        width: 22%;
        // height: 80px;
        line-height: 100px;
        margin: 0% 0% 0% 5%;
      }
      .yaxis {
        width: 0.5%;
        height: 80px;
        line-height: 100px;
        background-color: gray;
        margin: 2% 0% 0% 5%;
      }
      .brief {
        height: 100px;
        line-height: 50px;
        font-size: 30px;
        margin: 0% 0% 0% 5%;
        color: #b6c3ce;
      }
    }
    .right {
      width: 10%;
      height: 100px;
      float: right;
      display: flex;
      .live_chat {
        height: 100px;
        line-height: 100px;
        font-size: 23px;
        margin: 0% 0% 0% 10%;
        color: #1b92ee;
      }
    }
  }
  .navigator {
    width: 100%;
    height: 100px;
    background-color: white;
    .menu {
      width: 70%;
      height: 100px;
      float: left;
      margin: 0% 0% 0% 0%;
      .el-menu-item {
        margin: 2.5% 0% 0% 2%;
        font-size: 15px;
        font-weight: 800;
      }
      .el-submenu {
        margin: 2.5% 0% 0% 2%;
        font-size: 15px;
        font-weight: 800;
        .el-menu-item {
        margin: 2.5% 0% 0% 2%;
        font-size: 15px;
        font-weight: 800;
      }
      }
    }
    .button {
      width: 25%;
      height: 50px;
      margin: 2.3% 3% 0% 0%;
      float: right;
      .order_button {
        float: left;
        height: 40px;
        width: 45%;
      }
      .login_button {
        float: left;
        height: 40px;
        width: 45%;
        margin: 0% 0% 0% 10%;
      }
    }
  }
  .index_container {
    width: 100%;
    height: 80%;
  }
}
</style>