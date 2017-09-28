/**
 * Created by J.2ue on 2017/9/16.
 */
import Index from "../testPage/index";
import Button from "../testPage/button";
import Icon from "../testPage/icon";
import Input from "../testPage/input";
import DataTips from "../testPage/data-tips";

export default [
  { path: "/", component: Index, name: "index" },
  { path: "/btton", component: Button, name: "Button" },
  { path: "/icon", component: Icon, name: "Icon" },
  { path: "/Input", component: Input, name: "Input" },
  { path: "/DataTips", component: DataTips, name: "DataTips" }
];
