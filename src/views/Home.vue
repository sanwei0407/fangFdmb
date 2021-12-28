<template>
  <div class="main">
    <div class="hd ">

        <div class="hdtop">
          <div> <md-icon  name="search"   size="lg"/>  </div>
          <div> 首页 </div>
          <div></div>
        </div>

        <div class="hddata">
            <div>
              <div class="hdn"> 0.00 </div>
              <div class="hdt"> 本月收入 </div>
            </div>
            <div></div>
            <div></div>
        </div>

        <div class="hdbt">
          <div class="hdbtitem">
            <div class="hdbicon"></div>
            <div class="hdittxt">  未收账单</div>
          </div>
          <div class="hdbtitem">
            <div class="hdbicon"></div>
            <div class="hdittxt">  租客</div>
            <div class="hditnum"> 0人  </div>
          </div>

      </div>

    </div>
    <div class="ct">
   <!--   redzone    -->
      <div class="redzone">
          <div class="reditem">
              <div class="riicon"></div>
              <div class="rititle">
                到期租客
                <span class="ritips"> 暂时没有到期租客</span>
              </div>
          </div>
          <div class="reditem"></div>
          <div class="reditem"></div>
          <div class="reditem"></div>

      </div>
    <!--      comzone-->
      <div class="comzone">
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
           <div class="ittips">0人</div>
        </div>
        <div class="item"></div>
        <div class="item"></div>
      </div>

      <div class="comzone">
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>
        <div class="item">
          <div class="iticon"></div>
          <div class="ittxt">未付账单</div>
        </div>

      </div>
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

export default {
  name: 'Home',

}
</script>

<style lang="scss" scoped>
.main{
  background-color: #f0f0f1;
}
.hd{
  height: 420px;
  background-color: #5687e6;
  position: relative;
  .hdtop{
    display: flex;
    justify-content: space-between;
    padding:0 30px;
    color:#fff;
    line-height: 2;
    &>div:nth-child(2){
      font-size: 58px;
      font-weight: 600;
    }
    .md-icon.icon-font{
      line-height: 2;
    }
  }
  .hddata{
    display: flex;
    justify-content: space-between;
    padding:0 30px;
    height: 160px;
    font-size: 45px;
    line-height: 2;
    text-align: center;
    color:#fff;
    margin-top: 25px;
    &>div{
      flex:1;

    }
    .hdn{
      font-weight: 600;
    }
    .hdt{
      color:#c5e4fe
    }


  }
  .hdbt{
    width: 1022px;
    position: absolute;
    bottom: 0;
    left:50%;
    transform: translateX(-50%) translateY(50%);
    border: 1px solid #000;
    height: 195px;
    border-radius: 18px;
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    &>div{
      flex:1;
      display: flex;
      align-items: center;
      padding-left:44px;

    }
    &>div:first-child{
      border-right:1px solid #ccc
    }
    .hdbtitem div:last-child{
      text-align: right;
    }
    .hdbicon{
      width: 106px;
      height: 106px;
      border-radius: 50%;
      border: 1px solid #000;
    }
    .hdittxt{
      padding-left: 40px;
    }
    .hditnum{
      width: 0;
      flex-grow: 1;
      text-align: right;
      padding-right: 44px;

    }


  }
}

.redzone{
  display: flex;
  flex-wrap: wrap;
  margin-top: 110px;
  background-color: #fff;
  .reditem{
    box-sizing: border-box;
    width: 50%;
    border: 1px solid #000;
    height: 180px;
    display: flex;
    align-items: center;
    padding-left: 60px;
    .riicon{
      height: 68px;
      width: 68px;
      border: 1px solid #000;
    }
    .rititle{
      margin-left: 36px;
      position: relative;
      flex:1;
      span{
        position: absolute;
        left:0;
        top:75px;
        font-size: 36px;
        color:#989898
      }
    }

  }

}

.comzone{
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding:40px 0;
  .item{
    width: 30%;
    flex-grow: 1;
    text-align: center;
    margin-bottom: 35px;
    .iticon{
      height: 64px;
      width: 64px;
      border: 1px solid #000;
      margin:0 auto;
    }
    .ittxt{
      font-size: 44px;
      line-height: 2;
    }
    .ittips{
      font-size: 40px;
      color:#9a9a9a;
      line-height: 1;
    }
  }
}

.ft{
  display: flex;
  justify-content: space-between;
  background: #fff;

  &>div.ac{
    color:#5980ee;
  }

  &>div{
    padding-top: 20px;
    color:#a9a9aa;
    flex:1;
    text-align: center;
    i{
      font-size: 60px;
    }
  }
}



</style>
