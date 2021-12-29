<template>
    <div class="main">
        <div class="hd">
            <div class="hdtop">
                <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
                <div> 房客 </div>
                <div></div>
            </div>
        </div>
        <div class="ct">
            <div class="roomInfo"> 
                    <div class="rmtitle"> {{ roomInfo.build && roomInfo.build.name }}  - {{ roomInfo.roomNum  }} 号房</div>
                    <div class="rmactions">
                        <div @click="$router.push({ name:'editRoom',query:{ roomId: $route.query.roomId} })">修改</div>
                        <div @click="confirmDelete">删除</div>
                        <div></div>
                   </div>
            </div>
            <div class="addRecent" @click="$router.push({name:'addClient',query:{ roomId:$route.query.roomId }})">
                添加租客
            </div>
            <ul>
                <li v-for="item of clientList" :key="item.id" class="itembox" 
                    @click="$router.push({name:'billList',query:{ roomId:$route.query.roomId,liveId:item.id }})">
                     <div>   {{ item.realName }}</div>
                     <div>  {{ item.status | statusTxt }} </div>

                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import { getRoomInfo,removeRoom} from '@/apis/fang'
import { getAllClient} from '@/apis/client'
export default {
    data() {
        return {
            roomInfo: {},
            clientList:[]
        }
    },
    created () {
        this.getInfo()
        this.getClients()
    },
    methods: {
        async confirmDelete(){

            this.$dialog.confirm({
                title: '确认',
                content: '请确认是否删除该房间',
                confirmText: '确定',
                onConfirm: () =>  this.dodelete()
            })
        },
        async dodelete(){
            let res = await removeRoom({roomId:this.$route.query.roomId})
            const { success ,data} = res;
            if(success) {
                   this.$toast.info('删除成功')
                    this.$router.back()
                   
            }  
        },
        async getInfo() {
               let res = await getRoomInfo({roomId:this.$route.query.roomId})
               const {success,data} = res;
               if(success) this.roomInfo = data
        },
        async getClients(){
                let res = await getAllClient({roomId:this.$route.query.roomId,status:1})
                const {success,data} = res;
                if(success) this.clientList = data.rows;
    
        }
    },
    filters:{
        statusTxt(val){
        
            return val ==1 ? '入住中': '退租'
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{
        background: #f0f0f3;
    }
    .roomInfo{
        background: #fff;
    }
    .rmtitle{
        line-height: 100px;
        padding-top: 50px;
        padding: 50px;
    }
    .rmactions{
        display: flex;
        padding:40px;
        border-top: 1px solid #9a9a9a;
        &>div{
            flex:1;
            border-right: 1px solid #9a9a9a;
            text-align: center;
        }
    }
    .addRecent{
        width: 95%;
        margin:30px;
        background: #fff;
        line-height: 130px;
        text-align: center;
    }
    .itembox{
        background: #fff;
        padding: 40px;
        border-bottom: 1px solid #9a9a9a;
    }
</style>