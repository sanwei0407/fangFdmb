<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div> <md-icon  name="search"   size="lg"/>  </div>
        <div> 添加房间 </div>
        <div> </div>
      </div>
    </div>
    <div class="ct">
      <md-field>
        <md-cell-item title="房产名" :addon="$route.query.name" arrow />

        <md-input-item align="right" v-model="roomInfo.name"  title="房间名称" placeholder="房间名称" arrow />
        <md-input-item align="right" v-model="roomInfo.floor" title="楼层" placeholder="请填写楼层信息" arrow />
        <md-input-item align="right" v-model="roomInfo.roomNum" title="房间号" placeholder="请填写房间号" arrow />

      </md-field>
      <div>
        <div> 房间配置</div>
         <div>
           <md-check-box name="1" v-model="roomInfo.hasWifi"  label="wifi"  />
           <md-check-box name="1" v-model="roomInfo.hasTv"  label="电视"  />
           <md-check-box name="1" v-model="roomInfo.hasRsq" label="热水器"  />
           <md-check-box name="1"  v-model="roomInfo.hasAc" label="空调"  />
           <md-check-box name="1" v-model="roomInfo.hasXyj"  label="洗衣机"  />
           <md-check-box name="1" v-model="roomInfo.hasBx" label="冰箱"  />
         </div>
      </div>

      <md-button @click="save">添加</md-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addRoom } from "../../apis/fang";

export default {
  name: "addRoom",
  data() {
    return {
      roomInfo: {
        name:'',
        floor:'',
        roomNum:'',
        hasBx: 0,
        hasXyj: 0,
        hasAc: 0,
        hasTv: 0,
        hasRsq: 0,
        hasWifi: 0,
      }
    }
  },
  methods: {
    async save() {
      if(!this.roomInfo.name)  return this.$toast.info('请填写房间名称')
      if(!this.roomInfo.roomNum)  return this.$toast.info('请填写房间号')
      if(!this.roomInfo.floor)  return this.$toast.info('请填写楼层数')


      const res = await addRoom({...this.roomInfo,buildId: parseInt(this.$route.query.buildId) });

      const { success,data,info} = res;
      if(!success) return this.$toast.info(info)
      this.$toast.succeed('添加成功')
      this.$router.back();

    }
  },

}
</script>

<style scoped>
/*覆盖组件渲染出来的样式*/
::v-deep .md-check-base-box{
  margin-left:30px;
  margin-bottom: 30px;
}

</style>
