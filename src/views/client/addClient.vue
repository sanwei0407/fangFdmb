<template>
    <div class="main">
           <div class="hd">
                <div class="hdtop">
                    <div @click="$router.back()"> <md-icon  name="arrow-left"   size="lg"/>  </div>
                    <div> 添加租客 </div>
                    <div></div>
                </div>
           </div>
           <div class="ct">
                <md-field>
    
                    <md-input-item align="right" v-model="liveInfo.realName"  title="入住人" placeholder="入住人姓名" arrow />
                    <md-input-item align="right" v-model="liveInfo.idNum" title="身份证" placeholder="请填写身份证" arrow />
                    <md-input-item align="right" v-model="liveInfo.phone" title="手机号" placeholder="请填写手机号码" arrow />
                
                    <md-cell-item title="入住时间"  arrow  :addon="sltDate || '请选择'"  @click="showsdatepick=true"  />
                    <md-input-item  align="right"  v-model="liveInfo.howlong" title="住多久" placeholder="住多久" arrow />

                                    
                </md-field>
                <div style="display:flex;justify-content:space-around">
                     <div class="imgbox">
                             <md-image-reader
                                name="front"
                                @complete="onReaderComplete"
                             />
                               <img :src="liveInfo.sfzF" alt="" v-if="liveInfo.sfzF" style="width:100%;height:100%">
                                <div v-else>
                                        <md-icon name="camera" size="md" color="#CCC"></md-icon>
                                        <p>添加身份证正面</p>
                                </div>

                                <div class="close" @click="liveInfo.sfzF=''" v-show="liveInfo.sfzF"> x </div>  
                     </div>

                       <div class="imgbox">
                             <md-image-reader
                                name="back"
                                @complete="onReaderComplete"
                             />
                               <img :src="liveInfo.sfzB" alt="" v-if="liveInfo.sfzB" style="width:100%;height:100%">
                                <div v-else>
                                        <md-icon name="camera" size="md" color="#CCC"></md-icon>
                                        <p>添加身份证反面</p>
                                </div>

                                <div class="close" @click="liveInfo.sfzB=''" v-show="liveInfo.sfzB"> x </div>  
                     </div>
                </div>

                <md-field>
                    
                    <md-input-item align="right" v-model="liveInfo.monthFee"  title="租金" placeholder="入住人姓名" arrow >
                        <span slot="right">元/每月</span>
                    </md-input-item>
                    <md-input-item align="right" v-model="liveInfo.promiseFee" title="押金" placeholder="填写押金" arrow >
                          <span slot="right">元</span>
                    </md-input-item>
                    <md-input-item align="right" v-model="liveInfo.dianFee" title="电费" placeholder="填写电费" arrow >
                          <span slot="right">元/度</span>
                    </md-input-item>
                    <md-input-item align="right" v-model="liveInfo.waterFee" title="水费" placeholder="填写水费" arrow >
                          <span slot="right">元/吨</span>
                    </md-input-item>
                    <md-input-item align="right" v-model="liveInfo.mangeFee" title="管理费" placeholder="填写管理费" arrow >
                          <span slot="right">元/每月</span>
                    </md-input-item>

                </md-field>
                <md-button @click="save"> 添加 </md-button>   
           </div>

           <!-- 入住时间选择器 -->
             <md-date-picker
                ref="datePicker"
                v-model="showsdatepick"
                type="date"
                title="选择出险时间"
                large-radius
                @confirm="confirmDate"
                :default-date="new Date(liveInfo.checkInDate)"
          
            />

    </div>
</template>

<script>
import { getRoomInfo} from '@/apis/fang'
import { addClient } from '@/apis/client'
import { upload } from '@/apis/common'
// roomId,checkInDate,promiseFee,monthFee,dianFee,waterFee,mangeFee,otherFee,payDay,howlong
export default {

    data() {
        return {
            showsdatepick:false,
            sltDate:'',
            liveInfo: {
                checkInDate: Date.now(),
                promiseFee:1,
                monthFee:1,
                dianFee:1,
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
    created(){
        this.getInfo() // 获取房间信息
    },
    methods: {
        async onReaderComplete(name, { dataUrl, blob, file }){

            this.$toast.loading("上传中")

               // file对象如何ajax 提交
               let formData = new FormData();
               formData.append('name1',file)
               let res = await upload(formData);
               const { success,data} = res;
               if(success){
                   if(name==='front') this.liveInfo.sfzF= data;
                   if(name==="back") this.liveInfo.sfzB = data;
               }
               this.$toast.hide();

        },
       
        confirmDate(columnsValue){
            console.log('columnsValue',columnsValue)
            this.sltDate = columnsValue.map(item=>item.text).join(""); 
           
            this.liveInfo.checkInDate = new Date( columnsValue[0].value,columnsValue[1].value-1,columnsValue[2].value ).getTime()
            console.log(   this.liveInfo.checkInDate)
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

           let res = await  addClient({
               ...this.liveInfo,
               roomId:this.$route.query.roomId
           })
           const { success,data }  = res;
           if(success){
               this.added = true;
               this.$toast.info('添加成功');
               this.$router.go(-1);
           }
        }
    
    },
    beforeRouteLeave(to,from,next){
      
            if(this.added) return  next();
            
            this.$dialog.confirm({
                title: '确认',
                content: '当前内容并未保存是否确定离开',
                confirmText: '确定',
                onConfirm: () =>  next()
            })
    }
    
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