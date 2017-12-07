<template>
    <label :class="classes[0]" :index="index">
        <input v-if="type==='checkbox'" type="checkbox" v-model="selfChecked" @click="click" :name="name" :value="value">
        <input v-else-if="selfChecked" type="radio" checked @click="click" :name="name" :value="value">
        <input v-else type="radio" @click="click" :name="name" :value="value">
        <span :class="classes[1]"></span>
        <slot>
            <span>{{text}}</span>
        </slot>
    </label>
</template>

<script>
    export default {
        name: 'vCheckbox',
        data() {
            return {
                sizeClass: {
                    small: `vui-${this.type}-warp vui-${this.type}-warp-small`,
                    middle: `vui-${this.type}-warp vui-${this.type}-warp-middle`,
                    larger: `vui-${this.type}-warp vui-${this.type}-warp-larger`
                },
                selfChecked: !!this.checked
            }
        },
        computed: {
            classes: function () {
                return [this.sizeClass[this.size], `vui-${this.type} vui-dib-vt`]
            }
        },
        props: {
            type: {
                type: [String],
                default: 'radio'
            },
            size: {
                type: [String],
                default: 'small'
            },
            text: {
                type: [String, Number]
            },
            checked: {
                default: undefined
            },
            name: {
                type: String
            },
            value: [String, Number],
            index: [String, Number]
        },
        methods: {
            click: function (event) {
                if (this.type === 'radio') {
                    this.$emit('onClick', event, true, this.index);
                } else {
                    this.$emit('onClick', event, this.selfChecked, this.value, this.index);
                }
            }
        }
    }

</script>

<style scoped>
</style>
