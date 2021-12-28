<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div> <md-icon  name="search"   size="lg"/>  </div>
        <div> 房号 </div>
        <div @click="$router.push({name:'addRoom',query:{ ...$route.query }})">  添加房间 </div>
      </div>
    </div>
    <div class="ct">
        <ul>
            <li v-for="item of list" :key="item.roomId">
                <div> 房间名: {{item.name}} - {{item.roomNum}}   房间状态： {{ item|status}} </div>
            </li>
        </ul>
    </div>
  </div>

</template>

<script>
import { getRoomList} from  '@/apis/fang.js'

export default {
    data() {
        return {
            list: []
        }
    },
    created(){
        this.getList();
    },
    methods: {
        async getList() {
            let res = await getRoomList({buildId:this.$route.query.buildId});
            const { success,data } =res;
            if(!success) return  this.$toast.failed("获取失败")
            this.list = data.rows;
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

</style>