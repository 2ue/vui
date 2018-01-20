/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../page-pc/index";
import Styles from "../page-pc/styles";
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
import TreeMenu from "../page-pc/tree-menu";
import Select from "../page-pc/select";
import Range from "../page-pc/range";
import Upload from "../page-pc/upload";

export default [
    { path: "/", component: Index, name: "Index", cname: '首页' },
    { path: "/styles", component: Styles, name: "Styles", cname: '视觉风格' },
    { path: "/button", component: Button, name: "Button", cname: '按钮' },
    { path: "/icon", component: Icon, name: "Icon", cname: '字体图标' },
    { path: "/input", component: Input, name: "Input", cname: '输入框' },
    { path: "/data-tips", component: DataTips, name: "DataTips", cname: '模拟原生title提示' },
    { path: "/modal", component: Modal, name: "Modal", cname: '弹窗系列' },
    { path: "/chexkbox", component: Chexkbox, name: "Chexkbox", cname: '复选框' },
    { path: "/radio", component: Radio, name: "Radio", cname: '单选框' },
    { path: "/switch", component: Switch, name: "Switch", cname: '开关' },
    { path: "/date-picker", component: DatePicker, name: "DatePicker", cname: '日历' },
    { path: "/menu", component: Menu, name: "Menu", cname: '多级菜单' },
    { path: "/tree-menu", component: TreeMenu, name: "TreeMenu", cname: '菜单树' },
    { path: "/select", component: Select, name: "Select", cname: '选择器' },
    { path: "/range", component: Range, name: "Range", cname: '滑动选择' },
    { path: "/upload", component: Upload, name: "Upload", cname: '上传' }
];
