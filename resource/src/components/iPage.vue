<template>
    <div class="i-page" v-if="total">
        <div class="total">共{{total}}条</div>
        <i-select :pop="pop" :datas="selectDatas" v-model="sizeOption" :width="150"></i-select>
        <div class="show-page">
            <i :class="['iconfont', 'icon-arrow-left']" v-if="page!=1" @click="changePage(page-1)"></i>
            <span :class="{'active': item==page}" v-for="(item, index) in showPage" :key="index" @click="changePage(item)">{{item}}</span>
            <i :class="['iconfont', 'icon-arrow-right']" v-if="page!=totalPage" @click="changePage(page+1)"></i>
        </div>
    </div>
</template>
<script>
    import iSelect from "components/iSelect";

    export default { 
      data() {
        return {
            selectDatas:[
                {label: '5条/页', value:5},
                {label: '10条/页', value:10},
                {label: '15条/页', value:15},
                {label: '20条/页', value:20}
            ],
            totalPage: 0,
            showPage: [],
            sizeOption: 10
        }
      },
      components:{
          iSelect
      },
      props: {
          pop: {
              type: String,
              default: ''
          },
          page:{
              type: Number,
              default: 1
          },
          total: {
              type: Number,
              default: 0
          },
          size: {
              type: Number,
              default: 10
          }
      },
      watch:{
          page(value,olaValue){
              this.computPageInfo(value);
          },
          total(value){
              this.computPageInfo(this.page);
          },
          size(value,olaValue){
              this.sizeOption = this.size;
              this.computPageInfo(this.page);
          },
          sizeOption(value,olaValue){
              this.$emit('changePage', 1);
              this.$emit('changeSize', value);
          }
      },
      mounted(){
          this.sizeOption = this.size;
          this.computPageInfo(this.page);
      },
      methods: { 
          computPageInfo(value){
              this.showPage = [];
              this.totalPage = Math.ceil(this.total/this.size);
              if(value>this.totalPage){
                  return;
              }
              for(var i =(value>=3 ? value-2 : 1);i<=value; i++){
                  this.showPage.push(i);
              }
              var endPages = (this.totalPage>value+5-this.showPage.length ? value+5-this.showPage.length : this.totalPage);
              for(var j =value+1;j<=endPages; j++){
                  this.showPage.push(j);
              }
          },
          changePage(value){
              this.$emit('changePage', value);
          },
      }
    }
</script>

<style lang="less" scoped>
    .i-page{
        display: inline-block;
        .total{
            display: inline-block;
            font-size: 14px;
            margin-right: 10px;
        }
        .show-page{
            display: inline-block;
            margin-left: 30px;
            font-size: 18px;
            margin-top: 1px;
            vertical-align: bottom;
            i{
                color: #5d59a9;
                font-size: 19px;
                cursor: pointer;
                // &.disable{
                //     cursor: no-drop;
                //     color: #f6f6f8;
                // }
            }
            span{
                display: inline-block;
                height: 38px;
                width: 38px;
                text-align: center;
                line-height: 38px;
                transition: all 0.2s;
                cursor: pointer;
                &:hover{
                    background-color: #ffffff;
                    color: #5d59a9;
                }
                &:active{
                    background-color: #5d59a9;
                    color: #ffffff;
                }
                &.active{
                    background-color: #5d59a9;
                    color: #ffffff;
                }
            }
        }
    }
</style>