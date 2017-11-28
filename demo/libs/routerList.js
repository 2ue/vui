/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../page-pc/index";
import Button from "../page-pc/button";
import Icon from "../page-pc/icon";
import Input from "../page-pc/input";
import DataTips from "../page-pc/dataTips";
import Modal from "../page-pc/modal";
import Chexkbox from "../page-pc/checkbox";
import Radio from "../page-pc/radio";
import Switch from "../page-pc/switch";
import DatePicker from "../page-pc/datePicker";
import Select from "../page-pc/select";

export default [
    { path: "/", component: Index, name: "index" },
    { path: "/Button", component: Button, name: "Button" },
    { path: "/Icon", component: Icon, name: "Icon" },
    { path: "/Input", component: Input, name: "Input" },
    { path: "/DataTips", component: DataTips, name: "DataTips" },
    { path: "/Modal", component: Modal, name: "Modal" },
    { path: "/Chexkbox", component: Chexkbox, name: "Chexkbox" },
    { path: "/Radio", component: Radio, name: "Radio" },
    { path: "/Switch", component: Switch, name: "Switch" },
    { path: "/DatePicker", component: DatePicker, name: "DatePicker" },
    { path: "/Select", component: Select, name: "Select" }
];
