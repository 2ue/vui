<template>
    <div class="vui-modal-shade" v-if="showLoading" @click.self="close">
        <div class="vui-loading-progress">
            <div v-if="!loadingHtml">
                <p>{{ loadingText }}</p>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div v-else v-html="loadingHtml"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vLoading',
        data() {
            return {
                loading: '',
                loadingText: 'Loading',
                loadingHtml: '',
                showLoading: false,
            }
        },
        watch: {
            showLoading: function (val) {
                this.setStyle(val);
            }
        },
        methods: {
            setStyle: function (hidden) {
                document.getElementsByTagName('body')[0].style.overflow = hidden ? 'hidden' : 'auto';
            },
            show: function (options) {
                if (!!options) {
                    let _html, _text;
                    if (typeof options != 'object') {
                        _text = options;
                    } else {
                        _html = options.html, _text = options.text;
                    }
                    if (_html) {
                        this.loadingHtml = _html;
                    } else {
                        if (_text) this.loadingText = !_text ? this.loadingText : _text;
                    }
                };
                this.showLoading = true;
            },
            close: function (t) {
                setTimeout(() => {
                    this.showLoading = false;
                }, !t ? 0 : t)
            }
        }
    }

</script>

<style lang="scss">
</style>
