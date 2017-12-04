/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../page-pc/index";
import Button from "../page-pc/button";
import Icon from "../page-pc/icon";
import Input from "../page-pc/input";
import DataTips from "../page-pc/data-tips";
import Modal from "../page-pc/modal";
import Chexkbox from "../page-pc/checkbox";
import Radio from "../page-pc/radio";
import Switch from "../page-pc/switch";
import DatePicker from "../page-pc/date-picker";
import Menu from "../page-pc/menu";
import Select from "../page-pc/select";

export default [
    { path: "/", component: Index, name: "Index", cname: '首页' },
    { path: "/button", component: Button, name: "Button", cname: '按钮' },
    { path: "/icon", component: Icon, name: "Icon", cname: '字体图标' },
    { path: "/input", component: Input, name: "Input", cname: '输入框' },
    { path: "/dataTips", component: DataTips, name: "DataTips", cname: '模拟原生title提示' },
    { path: "/modal", component: Modal, name: "Modal", cname: '模态框' },
    { path: "/chexkbox", component: Chexkbox, name: "Chexkbox", cname: '复选框' },
    { path: "/radio", component: Radio, name: "Radio", cname: '单选框' },
    { path: "/switch", component: Switch, name: "Switch", cname: '开关' },
    { path: "/datePicker", component: DatePicker, name: "DatePicker", cname: '日历' },
    { path: "/menu", component: Menu, name: "Menu", cname: '多级菜单' },
    { path: "/select", component: Select, name: "Select", cname: '选择器' }
];
