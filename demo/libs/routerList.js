/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../pagePc/index";
import Button from "../pagePc/button";
import Icon from "../pagePc/icon";
import Input from "../pagePc/input";
import DataTips from "../pagePc/data-tips";
import Modal from "../pagePc/modal";

export default [
    { path: "/", component: Index, name: "index" },
    { path: "/btton", component: Button, name: "Button" },
    { path: "/icon", component: Icon, name: "Icon" },
    { path: "/Input", component: Input, name: "Input" },
    { path: "/DataTips", component: DataTips, name: "DataTips" },
    { path: "/Modal", component: Modal, name: "Modal" }
];
