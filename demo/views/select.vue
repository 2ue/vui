<template>
    <div>
        <p class="vui-page-title">下拉选择器-单个</p>
        <p class="mr-b10">selectOptions接受一个数组，表示渲染的数据，value为必须字段，用于展示当前项,其余字段可以自由增删</p>
        <pre><code data-language="javascript">{{demoData1}}</code></pre>
        <p>selectedVal接受一个数字或者字符串，表示被选中的项</p>
        <p class="mr-b10">
            <v-select :selectOptions="demoData1" selectedVal="文军"></v-select>
        </p>
        <p>width属性设置宽度</p>
        <p class="mr-b10">
            <v-select :selectOptions="demoData1" width="120"></v-select>
        </p>
        <p>disabled属性设置</p>
        <p class="mr-b10">
            <v-select :selectOptions="demoData1" :disabled="true"></v-select>
        </p>
        <p>selectedKey接受一个字符串，用于规定selectedVal与各项中匹配的键值，默认值为value</p>
        <p>当selectedKey设置为id，selectedVal设置为`文军`时，`文军`将不会被选中</p>
        <p class="mr-b10">
            <v-select :selectOptions="demoData1" selectedVal="文军" selectedKey="id"></v-select>
        </p>
        <p>onChange事件，返回当前被选中项json对象</p>
        <p class="mr-b10">
            <v-select :selectOptions="demoData1" @onChange="onChange1"></v-select>
            <pre><code data-language="javascript">{{selectedOptions1}}</code></pre>
        </p>
        <p class="vui-page-title">下拉选择器-级联选择</p>
        <p>selectOptions结构:value为必须，children表示下一级</p>
        <p class="mr-b10">
            <pre><code data-language="javascript">{{demoData2}}</code></pre>
        </p>

        <p>selectedVal接受数组，表示被选中的各项。注意如果中间有某些不匹配将会截断后续的项</p>
        <p class="mr-b10">设置selectedVal:</p>
        <pre><code data-language="javascript">{{selectedVal}}</code></pre>
        <p class="mr-b10">
            <v-select-group :selectOptions="demoData2" :selectedVal="selectedVal"></v-select-group>
        </p>

        <p>设置selectedVal：</p>
        <p class="mr-b10">
            <pre><code data-language="javascript">{{selectedValError1}}</code></pre>
            <v-select-group :selectOptions="demoData2" :selectedVal="selectedValError1"></v-select-group>
            <pre><code data-language="javascript">{{selectedValError2}}</code></pre>
            <v-select-group :selectOptions="demoData2" :selectedVal="selectedValError2"></v-select-group>
        </p>

        <p>selectedKey接受一个字符串，用于规定selectedVal与各项中匹配的键值，默认值为value</p>
        <p>selectedKey设置为id，selectedVal设置为</p>
        <p class="mr-b10">
            <pre><code data-language="javascript">{{selectedVal}}</code></pre>
            <v-select-group :selectOptions="demoData2" :selectedVal="selectedVal" selectedKey="id"></v-select-group>
        </p>
        <p>onChange事件，以数组的形式返回当前被选中项，返回的各项值与selectedKey对应的key匹配</p>
        <p class="mr-b10">
            <v-select-group :selectOptions="demoData2" :selectedVal="selectedVal" @onChange="onChange2"></v-select-group>
            <pre><code data-language="javascript">{{selectedOptions2}}</code></pre>
        </p>
        <p>设置selectedKey为id后返回值</p>
        <p class="mr-b10">
            <v-select-group :selectOptions="demoData2" @onChange="onChange3" selectedKey="id"></v-select-group>
            <pre><code data-language="javascript">{{selectedOptions3}}</code></pre>
        </p>
    </div>
</template>

<script>
    import selectData from "../../data/select.json";
    export default {
        name: 'menu',
        data() {
            return {
                demoData1: [...selectData.item],
                demoData2: [...selectData.items],
                selectedOptions1: {},
                selectedOptions2: ['潘艳', 'Daniel Martin', '473147'],
                selectedOptions3: [],
                selectedVal: ['潘艳', 'Daniel Martin', '473147'],
                selectedValError1: ['潘艳1', 'Daniel Martin1', '473147'],
                selectedValError2: ['潘艳', 'Daniel Martin1', '473147'],
            }
        },
        methods: {
            onChange1(selected, index) {
                this.selectedOptions1 = { ...selected };
            },
            onChange2(selected, index) {
                this.selectedOptions2 = [...selected];
            },
            onChange3(selected, index) {
                this.selectedOptions3 = [...selected];
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
