<template>
  <el-container>
    <el-header>
      电影管理后台 ，欢迎：{{ $store.state.user.name }}
      <div style="float:right;font-size:normal;">
        <i class="el-icon-user-solid"></i>
        <a href="#" @click="handleLoginOut">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1">

          
          <el-menu-item index="item.index" v-for="item in filterPermissionRoutes" :key="item.index">
            <i class="el-icon-menu"></i>
            <router-link :to="item.path" tag="span" slot="title">{{item.meta.title}}</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
import element from "@/element";
import { mapGetters } from 'vuex'
Vue.use(element);
export default {
  name: "admin",
  computed:{
    //把mapGetters映射到computed属性中
    ...mapGetters([
      'permissionRoutes',
    ]),
    filterPermissionRoutes(){
      return this.permissionRoutes.filter((item)=>{
        return item.meta
      });
    }

  },
  methods: {
    handleLoginOut() {
      this.$api.users.logout().then(res => {
        const status = res.data.status;
        if (status === 0) {
          localStorage.removeItem("name");
          localStorage.removeItem("isAdmin");
          window.localStorage.removeItem("token");
          this.$store.commit("token/TOKEN", { token: "" });
          this.$store.commit("user/USER_NAME", {
            name: "",
            isAdmin: false,
            userHead: ""
          });
          this.$router.push("/mine/login");
        }
      });
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  padding-left: 60px;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
