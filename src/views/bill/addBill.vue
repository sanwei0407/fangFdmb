<template>
    <div class="main">
           <div class="hd">
                <div class="hdtop">
                    <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
                    <div> 添加账单 </div>
                    <div></div>
                </div>
           </div>
           <div class="ct">
        
                <md-field>
                    
                    <md-input-item align="right" v-model.number="liveInfo.monthFee"  title="租金" placeholder="入住人姓名" arrow >
                        <span slot="right">元/每月</span>
                    </md-input-item>
 
                    <md-input-item align="right" v-model.number="dianCost" title="电量" placeholder="请填写用电量" arrow >
                          <span slot="right">小计：{{_temDianFee}} 元</span>
                    </md-input-item>
                    <md-input-item align="right" v-model.number="waterCost" title="用水量" placeholder="填写用水量" arrow >
                          <span slot="right">小计：{{_temWaterFee}} 元</span>
                    </md-input-item>
                    <md-input-item align="right" v-model.number="liveInfo.mangeFee" title="管理费" placeholder="填写管理费" arrow >
                          <span slot="right">元/每月</span>
                    </md-input-item>
                  <md-cell-item title="记账起点"  arrow  :addon="sltsDate || '请选择'"  @click="showpick1=true"  />
                  <md-cell-item title="记账结束"  arrow  :addon="slteDate || '请选择'"  @click="showpick2=true"  />


                </md-field>

                <md-button @click="save"> 确认 总计{{ _totalFee }} </md-button>   
           </div>

           <!-- 起点的日期xpzeqi  -->
             <md-date-picker
                ref="datePicker"
                v-model="showpick1"
                type="date"
                title="请选择开始时间"
                large-radius
                @confirm="confirmDate"
                :default-date="new Date()"
            />
            <!-- 终点的日期xpzeqi  -->
              <md-date-picker
                ref="datePicker"
                v-model="showpick2"
                type="date"
                title="请选择结束时间"
                large-radius
                @confirm="confirmEndDate"
                :default-date="new Date()"
            />

    </div>
</template>

<script>
import { getRoomInfo} from '@/apis/fang'
import { addClient ,addBill} from '@/apis/client'

import { getClientInfoByRoomId} from '@/apis/client'
// roomId,checkInDate,promiseFee,monthFee,dianFee,waterFee,mangeFee,otherFee,payDay,howlong
export default {
    data() {
        return {
            showpick1:false,
            showpick2:false,
            dianCost:0,
            waterCost:0,
            showsdatepick:false,
            sltsDate:'',
            slteDate:'',
            sdate:null,
            edate:null,
            liveInfo: {
                checkInDate: Date.now(),
                promiseFee:1,
                monthFee:1,
                dianFee:5,
                waterFee:2,
                mangeFee:3,
                otherFee:null,
                payDay:5,
                howlong:12,
                phone:'13307810932',
                idNum:'450',
                realName:'张三',
                sfzF:'',
                sfzB:''

            },
            roomInfo:{},
            added: false
        }
    },
    computed:{
        _temDianFee(){
            return this.dianCost*this.liveInfo.dianFee;
        },
        _temWaterFee(){
            return this.waterCost*this.liveInfo.waterFee;
        },
        _totalFee(){
            console.log('a',this._temDianFee)
                      console.log('b',this._temWaterFee)
                                console.log('c',this.liveInfo.monthFee)
                                console.log('d',this.liveInfo.mangeFee)
            return this._temDianFee + this._temWaterFee + this.liveInfo.monthFee + this.liveInfo.mangeFee
        }
    },
    created(){
    
        this.getLiveInfo();
    },
    methods: {
       async getLiveInfo() {
            let res = await getClientInfoByRoomId({id: this.$route.query.liveId})
            console.log(res)
            this.liveInfo = res.data
        },
       
        confirmDate(columnsValue){
            console.log('columnsValue',columnsValue)
            this.sltsDate = columnsValue.map(item=>item.text).join(""); 
            this.sdate = new Date( columnsValue[0].value,columnsValue[1].value-1,columnsValue[2].value ).getTime()
          
        },
        confirmEndDate(columnsValue){
            console.log('columnsValue',columnsValue)
            this.slteDate = columnsValue.map(item=>item.text).join(""); 
            this.edate = new Date( columnsValue[0].value,columnsValue[1].value-1,columnsValue[2].value ).getTime()
          
        },
        async getInfo() {
               let res = await getRoomInfo({roomId:this.$route.query.roomId})
               const {success,data} = res;
               if(success) this.roomInfo = data
               const { monthFee,promiseFee } = data;
               if(monthFee) this.liveInfo.monthFee = monthFee;
               if(promiseFee) this.liveInfo.promiseFee = promiseFee;

        },
        async save(){

          // todo检验数据

// roomId, monthFee, waterCount, dianCount, otherFee, dianCost, waterCost, sDate, eDate
           let res = await  addBill({
            
               roomId:this.$route.query.roomId,
               monthFee: this.liveInfo.monthFee,
               waterCount: this._temWaterFee,
               dianCount: this._temWaterFee,
               dianCost: this.dianCost,
               waterCost: this.waterCost,
               sDate: this.sdate,
               eDate: this.edate

           })
           const { success,data }  = res;
           if(success){
               this.added = true;
               this.$toast.info('添加成功');
               this.$router.go(-1);
           }
        }
    
    },
  
    
}
</script>

<style lang="scss" scoped>


.imgbox{
    width: 300px;
    height: 300px;
    border:1px solid red;
    font-size:20px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    .close{
        position: absolute;
        top:0;
        right:0;
        width: 50px;
        height: 50px;
        background: rgba(0,0,0,.5);
        border-radius: 50%;
        color:#fff;
        z-index:999;
        line-height: 50px;
        text-align: center;
    }
    
}
</style>