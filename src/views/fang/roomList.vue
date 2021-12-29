<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
        <div> 房号 </div>
        <div @click="$router.push({name:'addRoom',query:{ ...$route.query }})">  添加房间 </div>
      </div>
    </div>
    <div class="ct">
        <div class="ctinfo"> 
            <div style="display:flex;">
                 <i class="iconfont icon-loufangfangzi" ></i> <h1> {{buildInfo.name}}  </h1>
            </div>
            <div @click="toedit">
                <md-icon name="edit" />
            </div>
           
        </div>
        <ul>
            <li  
                v-for="item of list" 
                :key="item.roomid" 
                class="itembox" 
                @click="$router.push({name:'roomInfo',query:{ roomId: item.roomid}})">
                <div> 房间名: {{item.name}} - {{item.roomNum}}   房间状态： {{ item|status}} </div>
            </li>
        </ul>
    </div>
  </div>

</template>

<script>
import { getRoomList,getBuildInfo} from  '@/apis/fang.js'

export default {
    data() {
        return {
            list: [],
            buildInfo:{}
        }
    },
    created(){
        this.getList();
        this.getInfo()
    },
    methods: {
        async getInfo(){
                let res = await  getBuildInfo({buildId:this.$route.query.buildId})
                console.log('res',res)
                const { data,success} = res;
                if(success){
                   this.buildInfo = data; 
                }
        },
        async getList() {
            let res = await getRoomList({buildId:this.$route.query.buildId});
            const { success,data } =res;
            if(!success) return  this.$toast.failed("获取失败")
            this.list = data.rows;
        },
        toedit(){
            this.$router.push({name:'editFang',query:{id:this.$route.query.buildId}})
        }
    },
    filters:{
        status(item){
           return   item.lives.length ? '已入住':'空置'
        }
    }
    
}
</script>

<style lang="scss" scoped>
.main{
    background: #f0f0f3;
}
.itembox{
    padding:40px;
    background: #fff;
    border-bottom: 1px solid #9a9a9a;
}
.ctinfo{
    display: flex; 
    justify-content: space-between;
    padding:0 40px;
    line-height: 200px;
    margin-bottom: 30px;
    background: #fff;
    i{
        font-size: 70px;
    }
    h1{
        font-size: 70px;
        
    }
}

</style>