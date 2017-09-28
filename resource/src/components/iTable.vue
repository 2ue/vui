<template>
    <div class="table-class">
        <div class="itable-header">
            <div class="show-checkbox-all">
                <i-checkbox :value="checkboxAll" :label="-1" text="全选" v-if="showCheckbox" @click="checkAll"></i-checkbox>
            </div>
            <div class="show-slot">
                <slot></slot>
            </div>
        </div>
        <div class="itable-body" >
            <table ref="showTable" cellspacing="0" cellpadding="0" border="0" width="100%">
                <colgroup>
                    <col v-for="(column, index) in cloneColumns" :width="setCellWidth(column, index, true)" :key="index"></col>
                </colgroup> 
                <thead>
                    <tr style="height:35px;">
                        <th v-for="(column, index) in cloneColumns" :key="index">
                            <div :style="{'max-width': `${setCellWidth(column, index, true)-30}px`}">{{column.title}}</div>
                        </th>
                    </tr>
                </thead>
                <tbody class="no-data" v-if="isLoading||datas.length==0">
                    <tr>
                        <td :colspan="cloneColumns.length+(showCheckbox ? 1 : 0)" v-show="isLoading">加载中...</td>
                        <td :colspan="cloneColumns.length+(showCheckbox ? 1 : 0)" v-show="!isLoading&&datas.length==0">暂无数据</td>
                    </tr>
                </tbody>
                <tbody class="data" v-show="!isLoading&&datas.length!=0">
                    <tr v-for="(item, index) in datas" :key="index" @click="onTrClick(item,index)">
                        <td v-for="(item2, index2) in cloneColumns" :key="index2" :class="[item2.className]">
                            <i-checkbox v-model="checkboxValue[index]" :label="index" :text="item[item2.key]||(index+1)" v-if="item2.type=='checkbox'" :disabled="item2.disabled ? (item[item2.disabled] ? true : false) : false"></i-checkbox>
                            <div v-else :style="{'max-width': `${setCellWidth(item2, index2, true)-30}px`}">
                                <i-cell 
                                    v-if="item2.render"
                                    :render="item2.render"
                                    :row="item"
                                    :index="index"
                                    :column="item2"
                                    >
                                </i-cell>
                                <span v-else>{{item[item2.key]}}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div> 
</template>
<script>
    import iCell from 'components/iCell'
    import iCheckbox from 'components/iCheckbox'
    export default {
        data() {
          return {
              checkboxAll: false,
              checkboxValue:[],
              checkboxs:[],
              cloneColumns:[],
              tableWidth: 0,
              columnsWidth: [],
              otherColumns: []
          }
        },
        components:{
            iCell,
            iCheckbox
        },
        watch:{
            datas(value){
                var _this = this;
                _this.checkboxValue=[];
                _this.computedStyle();
            },
            checkboxs(){
                this.$emit('change-checkbox',  this.deepCopy(this.checkboxs));
            },
            checkboxValue(value){
                var newList = [];
                this.datas.forEach((item,index)=>{
                    let checked = value[index];
                    if(checked){
                        newList.push(item);
                    }
                });
                if(this.datas.length && newList.length==this.datas.length){
                    this.checkboxAll = true;
                }else{
                    this.checkboxAll = false;
                }
                this.checkboxs = newList;
            }
        }, 
        
        mounted(){
            var _this = this;
            window.addEventListener('resize', _this.computedStyle, false);
            _this.cloneColumns = _this.deepCopy(_this.columns);
            _this.computedStyle();
        },
        props: { 
            isLoading: {
                type: Boolean,
                default: false
            },
            datas: { 
                type: Array,
                default: []
            },
            columns: {
                type: Array,
                default: []
            },
            showCheckbox:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            checkAll(event, vm){
                var list = this.columns.filter(item=>{
                    return item.type=='checkbox';
                })
                this.datas.forEach((item,index)=>{
                    if (!(list[0].disabled ? (item[list[0].disabled] ? true : false) : false)){
                        this.$set(this.checkboxValue, index, vm.currentValue);
                    }
                });
            },
            onTrClick(item,index){
                this.$emit('tr-click',item);
            },
            setCellWidth (column, index, top) {
                let width = '';
                if (column.width) {
                    width = column.width;
                } else if (this.columnsWidth[index]) {
                    width = this.columnsWidth[index].width;
                }
                return width;
            },
            typeOf(obj) {
                const toString = Object.prototype.toString;
                const map = {
                    '[object Boolean]'  : 'boolean',
                    '[object Number]'   : 'number',
                    '[object String]'   : 'string',
                    '[object Function]' : 'function',
                    '[object Array]'    : 'array',
                    '[object Date]'     : 'date',
                    '[object RegExp]'   : 'regExp',
                    '[object Undefined]': 'undefined',
                    '[object Null]'     : 'null',
                    '[object Object]'   : 'object'
                };
                return map[toString.call(obj)];
            },
            deepCopy(data) {
                const t = this.typeOf(data);
                let o;
                if (t === 'array') {
                    o = [];
                } else if ( t === 'object') {
                    o = {};
                } else {
                    return data;
                }

                if (t === 'array') {
                    for (let i = 0; i < data.length; i++) {
                        o.push(this.deepCopy(data[i]));
                    }
                } else if ( t === 'object') {
                    for (let i in data) {
                        o[i] = this.deepCopy(data[i]);
                    }
                }
                return o;
            },
            getStyle(element, option){
                var width = document.defaultView.getComputedStyle(element)[option];
                if(width.indexOf('px')>=0){
                    return width.split('px')[0]
                }else{
                    return width;
                }
            },
            computedStyle(){
                this.$nextTick(()=>{
                    const allWidth = !this.cloneColumns.some(cell => !cell.width);
                    // if (allWidth) {
                    //     this.tableWidth = this.cloneColumns.map(cell => cell.width).reduce((a, b) => a + b);
                    // } else {
                    //     this.tableWidth = parseInt(this.getStyle(this.$refs.hideTable, 'width'));
                    // }
                    let columnsWidth = [];
                    this.columnsWidth=[];
                    if(this.datas.length==0){
                        return;
                    }
                    this.$nextTick(() => {
                        this.cloneColumns = this.deepCopy(this.columns);
                        let columnsWidth = [];
                        let autoWidthIndex = -1;
                        if (!allWidth) autoWidthIndex = this.cloneColumns.findIndex(cell => !cell.width);
                        // const $td = this.$refs.showTable.querySelectorAll('tbody')[0].querySelectorAll('tr')[0].querySelectorAll('td');
                        for (let i = 0; i < this.cloneColumns.length; i++) {
                            const column = this.cloneColumns[i];
                            // let width = parseInt(this.getStyle($td[i], 'width'));
                            // if (i === autoWidthIndex) {
                            //     width = parseInt(this.getStyle($td[i], 'width'));
                            // }
                            // if (column.width) width = column.width;
                            // this.cloneColumns[i]._width = width;
                            columnsWidth[i] = {
                                width: column.width
                            };
                        }
                        // let totalOtherWidth = 0;
                        // Object.keys(columnsWidth).forEach(key =>{
                        //     if (key != autoWidthIndex) totalOtherWidth+=columnsWidth[key].width;
                        // })
                        // columnsWidth[autoWidthIndex].width = this.tableWidth - totalOtherWidth;
                        this.columnsWidth = columnsWidth;
                    });
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .table-class{
        font-size: 16px;
        color: #333333;
        .itable-header{
            text-align: right;
        }
        .show-checkbox-all{
            display: inline-block;
            float: left;
            height: 40px;
            line-height: 40px;
            margin-left: 20px;
        }
        .show-slot{
            display: inline-block;
        }
    }
    .no-data{
        height: 56px;
        background-color: #ffffff;
        box-shadow: 0  0 9px rgba(0,0,0,.2);
        text-align: center;
        line-height: 56px;
        margin-top: 10px;
        font-size: 12px;
        color: #afafb6;
    }
    .itable-body{
        overflow: auto;
        width: 100%;
        padding: 0 5px;
        margin-left: -5px;
        thead{
            tr {
                th{
                    padding-left: 30px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: normal;
                    color: #333;
                }
            }
        }
        table{
            border-spacing:0px 8px;
            font-size: 14px;
            color: #666666;
            tbody.no-data{
                tr{
                    height: 150px;
                    background-color: #ffffff;
                    box-shadow: 0  0 9px rgba(0,0,0,.2);
                    text-align: center;
                    line-height: 150px;
                    margin-top: 10px;
                    font-size: 12px;
                    color: #afafb6;
                }
            }
            tbody.data tr {
                cursor: pointer;
                height: 56px;
                background-color: #ffffff;
                box-shadow: 0  0 9px rgba(0,0,0,.2);
                transition: all 0.3s;
                td{
                    padding-left: 30px;
                    &>div{
                        display: inline-block;
                    }
                    a {
                        text-decoration: none;
                        color: #009cff;
                    }
                }
                &:hover{
                    background-color: #fff9ee;
                    a{
                        color: #00ccff;
                    }
                }
                &:active{
                    background-color: #eff2ff;
                }
            }
        }
    }
</style>