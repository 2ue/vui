/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../views/index";
import Styles from "../views/styles";
import Button from "../views/button";
import Icon from "../views/icon";
import Input from "../views/input";
import DataTips from "../views/data-tips";
import Modal from "../views/modal";
import Checkbox from "../views/checkbox";
import Radio from "../views/radio";
import Switch from "../views/switch";
import DatePicker from "../views/date-picker";
import Menu from "../views/menu";
import TreeMenu from "../views/tree-menu";
import Select from "../views/select";
import Range from "../views/range";
import Upload from "../views/upload";
import ImageCli from "../views/imagecli";

export default [
    { path: "/", component: Index, name: "Index", cname: '首页' },
    { path: "/styles", component: Styles, name: "Styles", cname: '视觉风格' },
    { path: "/button", component: Button, name: "Button", cname: '按钮' },
    { path: "/icon", component: Icon, name: "Icon", cname: '字体图标' },
    { path: "/input", component: Input, name: "Input", cname: '输入框' },
    { path: "/data-tips", component: DataTips, name: "DataTips", cname: '模拟原生title提示' },
    { path: "/modal", component: Modal, name: "Modal", cname: '弹窗系列' },
    { path: "/checkbox", component: Checkbox, name: "Checkbox", cname: '复选框' },
    { path: "/radio", component: Radio, name: "Radio", cname: '单选框' },
    { path: "/switch", component: Switch, name: "Switch", cname: '开关' },
    { path: "/date-picker", component: DatePicker, name: "DatePicker", cname: '日历' },
    { path: "/menu", component: Menu, name: "Menu", cname: '多级菜单' },
    { path: "/tree-menu", component: TreeMenu, name: "TreeMenu", cname: '菜单树' },
    { path: "/select", component: Select, name: "Select", cname: '选择器' },
    { path: "/range", component: Range, name: "Range", cname: '滑动选择' },
    { path: "/upload", component: Upload, name: "Upload", cname: '上传' },
    { path: "/imagecli", component: ImageCli, name: "ImageCli", cname: '裁剪' }
];
