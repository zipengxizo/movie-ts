<template>
    <div>
        <el-table
            :data="nowTableData"
            border
            style="width: 100%">
            <el-table-column
            prop="userHead"
            label="用户头像">
                 <template slot-scope="scope">
                     <img class="userHead" :src="scope.row.userHead">
                 </template>
            </el-table-column>
            <el-table-column
            prop="date"
            label="注册日期">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户姓名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="用户邮箱">
            </el-table-column>
            <el-table-column
            prop="isAdmin"
            label="用户角色">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleToFreeze(scope.$index, scope.row)">{{ scope.row.isFreeze ? '已冻结' : '未冻结' }}</el-button>
                    <el-button size="small" @click="handleToDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name : 'users',
    data(){
        return {
            tableData : [],
            currentPage : 1,
            pageSize : 10
        }
    },
    mounted(){
        this.$api.users.usersList().then((res)=>{
           const status = res.data.status;
           if(status === 0){
               this.tableData = res.data.data.usersList;
           }
        });
    },
    computed : {
        nowTableData() {
        const sliceData =  this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize ) || [];
                return sliceData.map((item)=>{
                    item.date = this.dateFormate('yyyy-MM-dd hh:mm:ss',new Date(item.date));
                    item.isAdmin =  item.isAdmin ? '管理员' : '普通用户'
                    return item;
                })
            }
    },
    methods : {
        dateFormate(fmt,date) {
            const o = { 
            "M+" : date.getMonth()+1,     //月份 
            "d+" : date.getDate(),     //日 
            "h+" : date.getHours(),     //小时 
            "m+" : date.getMinutes(),     //分 
            "s+" : date.getSeconds(),     //秒 
            "q+" : Math.floor((date.getMonth()+3)/3), //季度 
            "S" : date.getMilliseconds()    //毫秒 
            }; 
            if(/(y+)/.test(fmt)) 
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            for(const k in o) 
            if(new RegExp("("+ k +")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
            return fmt; 
     
        },
        handleToFreeze(index,row){
            this.$api.users.updateFreeze({
                email : row.email,
                isFreeze : !row.isFreeze
            }).then((res)=>{
                const status = res.data.status;
                if(status === 0){
                    this.$alert('冻结操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: () => {
                            this.tableData[index].isFreeze = !row.isFreeze;
                        }
                    });
                }
                else{
                    this.$alert('冻结操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            });
        },
        handleToDelete(index,row){
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$api.users.deleteUser({
                        email : row.email
                    }).then((res)=>{
                        const status = res.data.status;
                        if(status === 0){
                            this.$alert('删除操作已成功', '信息', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.tableData.splice(index,1);
                                }
                            });
                        }
                        else{
                            this.$alert('删除操作失败', '信息', {
                                confirmButtonText: '确定'
                            });
                        }
                    });
                });
        }
    }
}
</script>

<style scoped>
.page{ margin-top:20px;}
.userHead{ width:50px; height:50px; border-radius: 50%; overflow:hidden;}
</style>
