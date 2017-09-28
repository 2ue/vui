import Vue from 'vue'
import app from './app'
import VueRouter from 'vue-router'
import home from './home/home'
import browserJsError from './browser/jsError'
import browserJsErrorDetail from './browser/jsErrorDetail'
import browserAjaxError from './browser/ajaxError'
import browserAjaxErrorDetail from './browser/ajaxErrorDetail'
import browserCustomError from './browser/customError'
import browserCustomErrorDetail from './browser/customErrorDetail'
import browserSlowResource from './browser/slowResource'
import browserSlowResourceDetail from './browser/slowResourceDetail'
import browserSlowPage from './browser/slowPage'
import browserSlowPageDetail from './browser/slowPageDetail'
import logQuery from './logQuery/logQuery'
import monitorMachine from './monitor/machine'
import monitorMachineDetail from './monitor/machineDetail.vue'
import monitorPage from './monitor/page'
import monitorPageDetail from './monitor/pageDetail.vue'
import systemCallWarn from './system/callWarn'
import systemUser from './system/user'
import personal from './personal/personal'
import personalEdit from './personal/edit'
import personalResetPass from './personal/resetPass'
import error404 from './error/404'
import VueECharts from 'vue-echarts-v3'
import {DatePicker, TimePicker } from 'element-ui'

import iButton from 'components/iButton'
import iInput from 'components/iInput'
import iModal from 'components/iModal'
import iPage from 'components/iPage'
import iSearch from 'components/iSearch'
import iSelect from 'components/iSelect'
import iTable from 'components/iTable'
import iTextarea from 'components/iTextarea'
import IRadio from 'components/IRadio'
import IRadioGroup from 'components/IRadioGroup'
import ICheckbox from 'components/iCheckbox'
import ICheckboxGroup from 'components/iCheckboxGroup'
Vue.component('i-button', iButton)
Vue.component('i-input', iInput)
Vue.component('i-modal', iModal)
Vue.component('i-page', iPage)
Vue.component('i-search', iSearch)
Vue.component('i-select', iSelect)
Vue.component('i-table', iTable)
Vue.component('i-textarea', iTextarea)
Vue.component('i-radio', IRadio)
Vue.component('i-radio-group', IRadioGroup)
Vue.component('i-checkbox', ICheckbox)
Vue.component('i-checkbox-group', ICheckboxGroup)

import '../assets/less/main.less'

import { loading, ajaxFetch, tips} from 'assets/utilComponents'
import mixin from 'assets/mixin'

Vue.use(VueRouter);
Vue.component('chart', VueECharts)
Vue.use(DatePicker);
Vue.use(TimePicker);
let adminRole = [
    { path: '/systemCallWarn', component: systemCallWarn,name:'system_1' },
    { path: '/systemUser', component: systemUser,name:'system_2' }
];
adminRole.forEach(item => {
    item.beforeEnter = (to, from, next) => { 
        ajaxFetch.get('/personal', {}, res => {
            if (res.code == 0) {
                if (res.data.role_id == 1) {
                    next();
                } else {
                    tips.warning('您没有权限访问该页面');
                }
            } else {
                tips.error('获取权限错误');
            }
        }, error => {
            tips.error('获取权限错误');
        })
    }
});
const routes = [
    { path: '/', component: home, name: ''},
    { path: '/home', component: home, name: '' },
    { path: '/browserJsError', component: browserJsError, name: 'browser_1' },
    { path: '/browserJsError/detail/:id', component: browserJsErrorDetail, name: 'browser_2' },
    { path: '/browserAjaxError', component: browserAjaxError, name: 'browser_3' },
    { path: '/browserAjaxError/detail/:id', component: browserAjaxErrorDetail, name: 'browser_4' },
    { path: '/browserCustomError', component: browserCustomError, name: 'browser_5' },
    { path: '/browserCustomError/detail/:id', component: browserCustomErrorDetail, name: 'browser_6' },
    { path: '/browserSlowResource', component: browserSlowResource, name: 'browser_7' },
    { path: '/browserSlowResource/detail/:id', component: browserSlowResourceDetail, name: 'browser_8' },
    { path: '/browserSlowPage', component: browserSlowPage, name: 'browser_9' },
    { path: '/browserSlowPage/detail/:id', component: browserSlowPageDetail, name: 'browser_10' },
    { path: '/logQuery', component: logQuery, name: 'logQuery' },
    { path: '/monitorMachine', component: monitorMachine, name: 'monitor_1' },
    { path: '/monitorMachine/:ip', component: monitorMachineDetail, name: 'monitor_2' },
    { path: '/monitorPage', component: monitorPage, name: 'monitor_3' },
    { path: '/monitorPage/:id', component: monitorPageDetail, name: 'monitor_4' },
    { path: '/personal', component: personal, name: '' },
    { path: '/personal/edit', component: personalEdit, name: '' },
    { path: '/personal/resetPassword', component: personalResetPass, name: '' },
    ...adminRole,
    { path: '*', name:'404', component:  error404}
];
const router = new VueRouter({
    routes
});
Vue.prototype.$loading = loading;
Vue.prototype.$ajaxFetch = ajaxFetch;
Vue.prototype.$tips = tips;
Vue.mixin(mixin);
new Vue({
    components: { app },
    router
}).$mount('#app');



