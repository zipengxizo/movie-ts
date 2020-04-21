<template>
     <Loading v-if="isLoading" />
    <div v-else class="login_body">
        <div>
            <input v-model="username" class="login_text" type="text" placeHolder="账户名/手机号/Email" >
        </div>
        <div>
            <input v-model="password" class="login_text" type="password" placeHolder="请输入您的密码" >
        </div>
        <div>
            <input type="text" class="login_text" v-model="verifyImg" placeHolder="请输入您的验证码"> <img @click="handleToVerifyImg" :src="$api.users.verifyImg()" ref="img">
        </div>
        <div class="login_btn">
            <input type="submit" value="登录" @click="handleToLogin">
        </div>
        <div class="login_link">
            <router-link to="/mine/register">立即注册</router-link>
            <router-link to="/mine/findPassword">找回密码</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import {messageBox} from "@/components/JS/Alert/index.ts";
import { Component,Ref, Vue } from "vue-property-decorator";
@Component
export default class Login extends Vue {
    isLoading = false
    username = ''
    password = ''
    verifyImg = ''
    @Ref('img') readonly img!: HTMLImageElement
    handleToLogin(){
        const fullPath = this.$route.query.redirect;
        this.isLoading = true;
        this.$api.users.login({
            username : this.username,
            password : this.password,
            verifyImg : this.verifyImg
        }).then((res:any)=>{
            const status = res.data.status;
            if(status === 0){
                //设置token
                const {token,username} = res.data.data;
                window.localStorage.setItem('token',token);
                window.localStorage.setItem('username',username)
                this.$store.commit('token/TOKEN',{token});
                messageBox({
                    title : '登录',
                    content : '登录成功',
                    ok : '确定',
                    handleOk(){
                        if (fullPath) {
                            this.$router.push(fullPath);
                        }
                        else{
                            this.$router.push('/mine/center');
                        }
                    }
                });
            }
            else{
                    messageBox({
                    title : '登录',
                    content : res.data.msg,
                    ok : '确定'
                });
                this.img.src = this.$api.users.verifyImg() + '?' + Math.random();
            }
        }).catch((err: string)=>{
            this.isLoading = false;

        }).finally(()=>{
            this.isLoading = false;
        })
        }
        handleToVerifyImg(ev: any){
            ev.target.src = this.$api.users.verifyImg() +'?' + Math.random();
        }
}
</script>
<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
