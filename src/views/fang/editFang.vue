<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
        <div> 修改房产 </div>
        <div @click="saveFang"> 保存 </div>
      </div>
    </div>
    <div class="ct">
      <md-field>
        <md-cell-item title="房产名" :addon="newFang.name || '请选择'" arrow @click="$router.push({name:'searchfang'})"/>
        <md-cell-item title="详细地址" :addon="newAddress || '请选择'" arrow  @click="$router.push({name:'addAddress'})" />
        <md-cell-item title="房产类型" :addon="curType"  arrow    @click="showType=true"/>
        <md-input-item title="电费" v-model="dianFee" placeholder="填写电费" align="right" >
          <span slot="right">单位 度</span>
        </md-input-item>
        <md-input-item title="水费" v-model="waterFee" placeholder="填写水费" align="right" >
          <span slot="right">单位 吨</span>
        </md-input-item>
<!--        <md-cell-item title="收款账户" addon="请选择" arrow />-->

      </md-field>

  <!--   房产类型 picker-->
      <md-picker
          ref="picker0"
          v-model="showType"
          :data="typeData"
          large-radius
          title="选择房产类型"
          @confirm="slttype"
      />

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
import {mapState} from 'vuex'
import { getBuildInfo,updateBuild} from "../../apis/fang";

export default {
  name: "addFang",
  data() {
    return {
      showType: false,
      curFang: '',
      curType:'请选择',
      dianFee:'',
      waterFee:'',
      typeData: [
          [
            { value:1,label:'住宅/小区/公寓' },
            { value:2,label:'写字楼/办公' },
            { value:3,label:'商铺/门市房' },
          ]
      ],
      list:[]
    }
  },
  computed:{
    ...mapState(['newFang','newAddress'])
  },
  watch:{
    newAddress(nv){
      console.log('newAddress',this.newAddress)
    }
  },
  mounted(){
        this.getInfo()
  },
  methods: {
    async getInfo(){
      let res = await  getBuildInfo({buildId:this.$route.query.id})
      console.log('res',res)
      const { data,success} = res;
      if(success){
        const { name,lng,lat,address,dianFee,waterFee} = data;
          this.dianFee = dianFee
          this.waterFee = waterFee
       
          if(!this.newFang){
             this.$store.commit('setNewFangInfo',{
                name,
                address,
                location:{
                  lng,
                  lat
                }
             })
             this.$store.commit('setNewAddress',address)
          }
         

      }
      
      

    },
     slttype(val) {
       this.curType = val[0].label
    },
    async saveFang(){

       console.log(this.newFang)
       console.log(this.newAddress)
       if(!this.newFang || !this.newAddress) return this.$toast.info('信息不完整请仔细检查')


      const { name ,location } = this.newFang;
      const { lng,lat}= location
      const postData = {
        name,
        address:this.newAddress,
        lat,
        lng,
        streetNum:this.newAddress,
        waterFee:this.waterFee,
        dianFee:this.dianFee,
        buildId:this.$route.query.id
      };

      let res = await  updateBuild(postData)
      const { success,data} = res;
      if(success) {
         this.$store.commit('resetFangInfo')
         this.$toast.succeed('修改成功')
         return this.$router.back()
      }
      this.$toast.failed('修改失败')



    }
  },
}
</script>

<style lang="scss" scoped>
.ct{
  position: relative;
}

</style>
