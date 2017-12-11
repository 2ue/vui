<template>
    <div class="vui-select" :style="styles" :class="disabled ? 'vui-select-disabled' : ''">
        <span class="vui-select-input" @click="clickShow" @mouseover.stop="keepBoxStatus" @mouseout.stop="hideBox">{{selfSelectedVal}}
            <v-icon :type="iconType[showOptions ? 1 : 0]" size="16"></v-icon>
        </span>
        <ul v-if="showOptions" class="vui-select-options" @mouseover="showBox" @mouseout="hideBox">
            <li v-for="(options,i) in selfSelectOptions" :key="i" @click="onChange(options,i,index)">{{options.value}}</li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'vSelect',
        data() {
            return {
                timer: null,
                iconType: ['arrow-down', 'arrow-up'],
                showOptions: false,
                selfSelectedVal: this.fixedSelectedVal()
            }
        },
        props: {
            selectOptions: {
                type: Array,
                default: function () {
                    return []
                }
            },
            selectedVal: {
                type: [String, Number],
                default: '请选择'
            },
            index: Number,
            selectedKey: {
                type: String,
                default: 'value'
            },
            width: [Number, String],
            disabled: [Boolean, String, Number]
        },
        watch: {
            selectedVal: function (val) {
                this.selfSelectedVal = val;
            }
        },
        computed: {
            selfSelectOptions: function () {
                return this.selectOptions
            },
            styles: function () {
                const val = this.width, validatorRes = /^[0-9]+(px|em|rem|)$/.test(val);
                return !validatorRes ? '' : isNaN(val) ? `width:${val}` : `width:${val}px`;
            }
        },
        methods: {
            //修正初始化时传入的seleectVal是否匹配
            fixedSelectedVal(option) {
                let key = this.selectedKey, val = this.selectedVal, data = option || this.selectOptions, res = false;
                data.forEach((item, i) => {
                    if (item[key] === val) res = true;
                });
                return res ? this.selectedVal : '请选择';

            },
            showBox() {
                clearTimeout(this.timer);
                this.showOptions = true;
            },
            hideBox(t) {
                const _this = this;
                clearTimeout(_this.timer);
                _this.timer = setTimeout(function () {
                    _this.showOptions = false;
                }, isNaN(t) ? 300 : t)
            },
            clickShow() {
                if (this.disabled) return;
                if (this.showOptions) {
                    this.hideBox(1);
                } else {
                    this.showBox();
                }
            },
            keepBoxStatus() {
                if (this.showOptions) this.showBox();
            },
            onChange(options, i) {
                this.selfSelectedVal = options.value;
                this.hideBox(1);
                this.$emit('onChange', { ...options }, i, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
