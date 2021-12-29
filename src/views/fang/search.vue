<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
        <div> 选择房产名 </div>
        <div @click="$router.back()">  取消 </div>
      </div>
    </div>

    <div class="ct">
      <div class="scbox">
        <div class="scipt">
          <div class="scicon"></div>
          <input type="text" placeholder="请输入小区或者公寓名称" v-model="keyword">
        </div>
        <div> <button class="addbt" @click="doAdd">添加</button>  </div>
      </div>
      <ul>
        <li v-for="item of placeList" class="scitem"
            :key="item.uid" :class="[ item.uid === curuid ? 'ac':'' ]"
            @click="handleSlt(item)"
        >
            <div> {{ item.name}} </div>
            <div class="scitemadd"> {{ item.address}} </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { getBdSearch } from "../../apis/common";

export default {
  name: "addFang",
  data() {
    return {
      placeList:[],
      keyword:'',
      curuid:null,
      showType: false,
      curType:'请选择',
      bmapak:'1RO8EvPHSDzApYU0pORqyXKEWAmGs3we',
      typeData: [
        [
          { value:1,label:'住宅/小区/公寓' },
          { value:2,label:'写字楼/办公' },
          { value:3,label:'商铺/门市房' },
        ]

      ]
    }
  },
  mounted(){
    if(this.$store.state.newFang.name)  this.keyword = this.$store.state.newFang.name;
  },
  watch:{
    keyword(){
      this.doSearch()
    }
  },
  methods: {
    doAdd(){
     const curplaceinfo =  this.placeList.find(item=>item.uid === this.curuid)
      if(curplaceinfo){
        // 修改store
        this.$store.commit('setNewFangInfo',curplaceinfo)
      }
      this.$router.go(-1)
    },
    handleSlt(item){
      this.curuid= item.uid
    },
    slttype(val) {
      this.curType = val[0].label
    },
    async doSearch(){
      console.log('keyword',this.keyword)
      const res = await getBdSearch({keyword:this.keyword})
      console.log(res)
      // this.placeList = res.data.result.map({address,uid,name} => ({ address,uid,name} ));
      this.placeList = res.data.result.map(item=> {
          const { address,uid,name,location}  = item;
          return {
            address,
            uid,
            name,
            location
          }
      });

    },
  },
}
</script>

<style lang="scss" scoped>
.main{
  background-color: #f0f0f3;
}
.ct{
  position: relative;
}
.scbox{
  display: flex;
  padding: 20px;

}
.scipt{
  width: 0;
  flex-grow: 1;
  position: relative;
  .scicon{
    width: 35px;
    height: 35px;
    border: 1px solid red;
    position: absolute;
    top:50%;
    left:30px;
    transform: translateY(-50%);
  }
  input{
    width: 800px;
    line-height: 90px;
    box-sizing: border-box;
    padding-left: 90px;
  }
}
.addbt{
  font-size: 44px;
  padding:22px;
  background-color: #5788e7;
  color:#fff;
  border:none;
  outline: none;
}
.scitem{
  background-color: #fff;
  padding:40px;
  border-bottom: 1px solid #808080;

}
.scitemadd{
  color:#808080
}
.scitem.ac{
  background-color: #B0F4FF;
}

</style>
