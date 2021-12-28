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
    <ul>
      <li v-for="item of list" @click="$router.push({ name:'roomList',query: { buildId: item.buildId,name:item.name } })">
        <div>{{ item.name}}</div>
        <div> {{item.address}} </div>
      </li>
    </ul>
    <div class="addbt" @click="$router.push({name:'addFang'})">添加房产</div>
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
</style>
