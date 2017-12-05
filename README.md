# vui

a ui framework  build with vue for pc。
[Demo](https://2ue.github.io/vui)

# 目的

主要是为深入学习vue

# css变量命名规则
## 通用规则

- 所有命名都应添加前缀`vui`，以避免命名冲突
- 以中划线（-）链接

## 汉英对照

- 弹窗-pop up
- 遮罩-shade
- 模态-modal
- 模态框-modal dialog

## box 层级

- warp
- box
- inner(body)
- header/content(body)/footer

## layout 关系

> 与box结合

# 进度

- alert
- loadding
- icon
- button
- checkbox
- raido
- switch
- datepicker[基础版已完成]
- 多级菜单
- 联动选择[正在开发]

# 记录问题

> 记录开发过程中遇到的问题，避免下次踩坑

## 编译字体文件路径问题

编译时，由于字体路径写在了css文件中，需要额外设置一下字体文件打包的路径，才能把字体文件打包到预想位置

``` javascript
//webpack.base.conf.js
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        //http://blog.csdn.net/qq_38652603/article/details/73835153
        publicPath: '../'
    }
}
```

## 子组件监听父组件数据

父组件向子组件传递的参数，为了不造成数据污染，子组件不会自动的监听父组件数据的变化，但在某些情况下可能需要实现这一功，使用`watch`或者`computed`去显式的监听。两者都能达到目的，使用`computed`意味着在子组件内不能去显式的去修改它，使用`watch`则可以随意修改
