<template>
    <div class="vui-select">
        <span class="vui-select-input" @click="clickShow" @mouseover.stop="keepBoxStatus" @mouseout.stop="hideBox">{{selfSelectedVal}}
            <v-icon :type="iconType[showOptions ? 1 : 0]" size="16"></v-icon>
        </span>
        <ul v-if="showOptions" class="vui-select-options" @mouseover="showBox" @mouseout="hideBox">
            <li v-for="(options,index) in selfSelectOptions" :key="options.id" @click="selectedOption(options,index,key)">{{options.value}}</li>
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
                selfSelectedVal: this.selected
            }
        },
        props: {
            selectOptions: {
                type: Array,
                default: []
            },
            selected: {
                type: [String, Number],
                default: '请选择'
            }
        },
        watch: {
            selected: function (val) {
                this.selfSelectedVal = val;
            },
        },
        computed: {
            selfSelectOptions: function () {
                return this.selectOptions
            }
        },
        methods: {
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
                if (this.showOptions) {
                    this.hideBox(1);
                } else {
                    this.showBox();
                }
            },
            keepBoxStatus() {
                if (this.showOptions) this.showBox();
            },
            selectedOption(options, index) {
                this.selfSelectedVal = options.value;
                this.hideBox(1);
                this.$emit('updateSelectedVal', options, index);
            }
        }
    }

</script>

<style scoped>
</style>
