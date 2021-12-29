<template>
  <div class="main">
    <div class="hd">
      <div class="hdtop">
        <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
        <div> 账单 </div>
        <div></div>
      </div>
    </div>
    <div class="ct">
        <div>  {{ liveInfo.realName}} </div>
        <md-button @click="$router.push({name:'addBill',query:$route.query})">添加账单</md-button>
        <ul>
            <li v-for="item of billList" :key="item.id" class="itembox" @click="showdetail(item)"> 
                {{ item.sDate | format('YYYY-MM-DD') }} 至{{ item.eDate | format('YYYY-MM-DD') }}
                
            </li>
        </ul>
    </div>
    <!--  详情弹窗 -->
     <md-popup v-model="isPopupShow">
         <div style="width:80vw">
                <md-bill
                    title="账单明细"
                    :no="curBillInfo.id"
                    water-mark="dixon"
                >
                    <md-detail-item title="房租">  {{ curBillInfo.monthFee }} </md-detail-item>
                    <md-detail-item title="电费">  {{ curBillInfo.dianCount }} </md-detail-item>
                    <md-detail-item title="水费">  {{ curBillInfo.waterCount }} </md-detail-item>
                    <md-detail-item title="管理费">  {{ curBillInfo.mangeFee }} </md-detail-item>

                </md-bill>
         </div>
    </md-popup>
  </div>
</template>
<script>

import { getClientInfoByRoomId,getBillList} from '@/apis/client'
export default {
    data() {
        return {
            isPopupShow:false,
            liveInfo: {},
            billList:[],
            curBillInfo:{}
        }
    },
    created(){
        this.getLiveInfo()
        this.getList()
    },
    methods: {
        showdetail(item){
            this.isPopupShow = true
            this.curBillInfo = item
        },
        async getLiveInfo() {
            let res = await getClientInfoByRoomId({id: this.$route.query.liveId})
            console.log(res)
            this.liveInfo = res.data
        },
        async getList(){
            let res = await getBillList({roomId:this.$route.query.roomId})
            this.billList = res.data.rows
        }
    },
    
}
</script>    

<style  lang="scss" scoped>
        .main{
            background: #f0f0fa;
        }
        ul{
            margin-top:50px
        }
        .itembox{
            padding:40px;
            background: #fff;
        }
</style>