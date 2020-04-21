<template>
    <div style="padding:10px;height:100%;display:flex;">
        <a style="display:block;margin:auto;" href="/movie/usersadmin" target="_blank">进入管理后台</a>
        <!-- <div>当前用户：{{ $store.state.user.name }} <a href="javascript:void(0);" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/movie/usersadmin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通会员</div>
        <div>
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead">
        </div> -->
    </div>
</template>

<script>
// import { messageBox } from '@/components/JS/Alert';
// import api from '@/api';
export default {
    name : 'center',
    methods : {
        handleToLogout(){
            this.$api.users.logout().then((res)=>{
                const status = res.data.status;
                if(status === 0){
                    window.localStorage.removeItem('name');
                    window.localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME',{ name : '' , isAdmin : false , userHead : '' });
                    this.$router.push('/mine/login');
                }
            });
        },
        /* handleToUpload(ev){
            const file = ev.target.files[0];
            const param = new FormData();
            param.append('file' , file , file.name);
            const config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            };

            const self = this;
            this.$api.users.uploadUserHead(param , config).then((res)=>{
                const status = res.data.status;
                if( status === 0 ){
                    messageBox({
                        title : '信息',
                        content : '上传头像成功',
                        ok : '确定',
                        handleOk(){
                            self.$store.commit('user/USER_NAME',{ 
                                name : self.$store.state.user.name , 
                                isAdmin : self.$store.state.user.isAdmin ,
                                userHead : res.data.data.userHead + '?' + Math.random()
                            });
                        }
                    });
                }
                else{
                    messageBox({
                        title : '信息',
                        content : '上传头像失败',
                        ok : '确定'
                    });
                }
            });

        } */
    },
/*     beforeRouteEnter (to, from, next) {
        api.users.getUser().then((res)=>{
            var status = res.data.status;
            if(status === 0){
                next(vm => {
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{ 
                        name : res.data.data.username , 
                        isAdmin : res.data.data.isAdmin ,
                        userHead : res.data.data.userHead
                    });
                });
            }
            else{
                next('/mine/login');
            }
        }).catch((err)=>{
            console.log(err)
        });
    } */
}
</script>

<style scoped>
.userHead{ width:100px; height:100px; border-radius: 50%; overflow: hidden;}
</style>
