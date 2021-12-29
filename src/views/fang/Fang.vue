<template>
<div class="main">
  <div class="hd">
    <div class="hdtop">
      <div> <md-icon  name="search"   size="lg"/>  </div>
      <div> 房产 </div>
      <div></div>
    </div>
  </div>
  <div class="ct">
    <div class="add" v-if="list.length" @click="$router.push({name:'addFang'})">
     <i class="iconfont icon-jiahao"></i>
       添加房产 
       </div>
    <ul>
      <li v-for="item of list" 
          @click="$router.push({ name:'roomList',query: { buildId: item.buildId,name:item.name } })"
          :key="item.buildId"
          class="itembox"
        >
        <div>{{ item.name}}</div>
        <div> {{item.address}} </div>
      </li>
    </ul>
    <div class="addbt" @click="$router.push({name:'addFang'})" v-if="!list.length">添加房产</div>
  </div>
  <div class="ft">
    <div class="ac">
      <md-icon name="home" />
      <div> 首页 </div>
    </div>
    <div @click="$router.push({name:'fang'})">
      <md-icon name="home" />
      <div> 房产 </div>
    </div>
    <div>
      <md-icon name="home" />
      <div> 房东汇 </div>
    </div>
    <div>
      <md-icon name="home" />
      <div> 我 </div>
    </div>
  </div>

</div>
</template>

<script>
import { addBuild,getAllBuild} from "../../apis/fang";
export default {
name: "Fang",
  data() {
    return {
      list: []
    }
  },
  created(){
    this.getAll()
  },
  methods: {
    async getAll(){
      let res = await  getAllBuild({})

      this.list = res.data.rows

    },
 }
}
</script>

<style lang="scss" scoped>
.ct{
  position: relative;
 background-color: #f0f0f3;
}
.addbt{
  height: 136px;
  width: 730px;
  border-radius: 15px;
  border: 1px solid #c2c2c2;
  position: absolute;
  left:50%;
  bottom: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
}
.itembox{
  padding:40px;
  border-bottom:1px solid #9a9a9a;
  background: #fff;
}
ul{
  margin-top: 30px;
}
.add{
  line-height: 150px;
  text-align: center;
  background: #fff;
}
</style>
