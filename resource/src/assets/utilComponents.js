import iLoading from 'components/utils/iLoading'
import iTips from 'components/utils/iTips'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
//多选框、单选框
//页眉、导航、表格、按钮、输入框、下拉列表、分页、提示框、loading、搜索按钮、textarea、日期选择器
//页脚
var loadingComponent = null,
    tipsComponent = null;

const loading = {
    show() {
        if (!loadingComponent) {
            const div = document.createElement('div');
            div.innerHTML = `<i-loading></i-loading>`;
            document.body.appendChild(div);
            loadingComponent = new Vue({
                el: div,
                components: { iLoading }
            }).$children[0];
        }
        loadingComponent.show();
    },
    hide() { 
        loadingComponent.hide();
    }
}

function addTipsComponent() { 
    if (!tipsComponent) { 
        const div = document.createElement('div');
        div.innerHTML = `<i-tips></i-tips>`;
        document.body.appendChild(div);
        tipsComponent = new Vue({
            el: div,
            components: { iTips }
        }).$children[0];
    }
    
}
const tips = {
    success(msg, callback, time=2000) {
        callback = callback || function () { };
        addTipsComponent();
        tipsComponent.addMsg(msg, time, 'success', callback);
    },
    error(msg, callback, time=2000) { 
        callback = callback || function () { };
        addTipsComponent();
        tipsComponent.addMsg(msg, time, 'error', callback);
    },
    warning(msg, callback, time=2000) { 
        callback = callback || function () { };
        addTipsComponent();
        tipsComponent.addMsg(msg, time, 'warning', callback);
    }
}

function toFetch(method, url, params, successCallback, errorCallback) { 
    loading.show();
    successCallback = successCallback || function () { };
    errorCallback = errorCallback || function () { };
    axios({
        method: method,
        url: url,
        data: method == 'post' ? params : {},
        params: method == 'get' ? params : {},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        loading.hide();
        successCallback(response.data);
    }).catch(function (error){
        loading.hide();
        errorCallback(error);
    });
}
const ajaxFetch = {
    get(url, params, successCallback, errorCallback) {
        toFetch('get', url, params, successCallback, errorCallback);
    },
    post(url, params, successCallback, errorCallback) {
        toFetch('post', url, qs.stringify(params), successCallback, errorCallback)
    }
}

export { loading, ajaxFetch, tips};