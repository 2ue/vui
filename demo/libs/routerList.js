/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../pagePc/index";
import Button from "../pagePc/button";
import Icon from "../pagePc/icon";
import Input from "../pagePc/input";
import DataTips from "../pagePc/data-tips";
import Modal from "../pagePc/modal";
import Chexkbox from "../pagePc/checkbox";
import Radio from "../pagePc/radio";
import Switch from "../pagePc/switch";
import DatePicker from "../pagePc/datePicker";
import Select from "../pagePc/select";

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
