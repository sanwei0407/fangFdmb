<template>
  <router-view/>
</template>

<style lang="scss">

html,body{
  height: 100%;
  margin:0;
}
.br{
  border: 1px solid red;
}

@mixin br{
  border: 1px solid red;
}

.main{
  display: flex;
  flex-direction: column;
  height: 100%;
  // @include br;
}
.ct{
  height: 0;
  flex-grow: 1;
  overflow-y: auto;
  // @include br;
}
.ft{
  height: 150px;
  border-top:1px solid #9a9a9a
  // @include br;
}
.hd{
  background-color: #5687e6;
}
.hdtop{
  display: flex;
  justify-content: space-between;
  padding:0 30px;
  color:#fff;
  line-height: 2;
  &>div:nth-child(3){
    display: flex;
    align-items: center;
  }
  &>div:nth-child(2){
    font-size: 58px;
    font-weight: 600;
  }
  .md-icon.icon-font{
    line-height: 2;
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
