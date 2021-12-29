<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
        <div> 详细地址 </div>
        <div @click="$router.back()">  取消 </div>
      </div>
    </div>

    <div class="ct" id="map">

    </div>
    <div class="searchBox">
      <input type="text" v-model="address">
      <button @click="setAddress">确定</button>
    </div>


  </div>
</template>


<script>
import { getBdSearch } from "../../apis/common";
export default {

  name: "addAddress",
  data(){
    return {
      address:'',
      map:null
    }
  },
  mounted() {

      this.initMap() // 初始化地图
  },
  watch:{
    address(nv){
      //创建地址解析器实例
      // var myGeo = new BMapGL.Geocoder();
      // // 将地址解析结果显示在地图上，并调整地图视野
      // myGeo.getPoint('广州'+nv, (point)=>{
      //   if(point){
      //     this.map.centerAndZoom(point, 16);
      //     this.map.clearOverlays();
      //     this.map.addOverlay(new BMapGL.Marker(point, {title: nv}))
      //   }else{
      //
      //   }
      // }, '广州市')
      this.getPlace()

    }
  },
  methods:{
    setAddress(){
        if(this.address) this.$store.commit('setNewAddress',this.address);
        this.$router.back();
    },
    async getPlace(){
      const res = await getBdSearch({keyword:this.address})
      if(res.data.result[0]){
          const loc = res.data.result[0].location;
          this.map.centerAndZoom(new BMapGL.Point(loc.lng,loc.lat), 16); // 设置地图中心点及缩放级别
          this.map.enableScrollWheelZoom(true); // 是否允许缩放
          var marker1 = new BMapGL.Marker(new BMapGL.Point(loc.lng,loc.lat));
         this.map.addOverlay(marker1)

      }

    },
    initMap(){
      var map = new BMapGL.Map('map', {
        enableDblclickZoom: false,
        displayOptions: {
          building: false
        }
      });
      this.map = map;
      map.centerAndZoom(new BMapGL.Point(113.312796,23.221398), 16); // 设置地图中心点及缩放级别
      map.enableScrollWheelZoom(true); // 是否允许缩放
      var marker1 = new BMapGL.Marker(new BMapGL.Point(113.312796,23.221398));
      map.addOverlay(marker1)

      //  监听地图的点击事件
      map.addEventListener('click',(ev)=>{
        console.log('map ev',ev)
        const { lat,lng } = ev.latlng;
        const  _temmark = new BMapGL.Marker(new BMapGL.Point(lng,lat));
        map.clearOverlays(); // 清除覆盖物
        map.addOverlay(_temmark)
        let pt = new BMapGL.Point(lng, lat) // 新建一个地图坐标点的实例
        var myGeo = new BMapGL.Geocoder(); // 新建一个 解码实例
        // 地址的逆解释
        myGeo.getLocation( pt ,res=>{
          // res 就是得到对应的坐标点解释出来的地址信息
          this.address = res.address;
        })
      })


    }
  }

}
</script>

<style  lang="scss" scoped>
.main{
  position: relative;
}
.searchBox{

  width: 90%;
  overflow: hidden;
  border-radius: 10px;
  position: absolute;
  left:50%;
  bottom:200px;
  transform: translateX(-50%);
  border: 1px solid #9a9a9a;
  z-index: 999;
  input{
    height: 150px;
    line-height: 150px;
    width: 100%;
    border:none;
    padding-left: 20px;
  }
  button{
    border:none;
    line-height: 150px;
    text-align: center;
    background-color: #5687e6;
    color:#fff;
    display: block;
    width: 100%;
    margin-top: 30px;
  }

}

</style>
