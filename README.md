# 提示栏显示插件（默认配合Bootstrap）

```js
var alerts = new Alerts({
  el: '.alerts', //可以传jQuery对象或者选择字符串，默认值（'.alert'）
  btn: null, //关闭按钮，如果是null，会默认去查看el下面是否有'> buttun[class~="close"]'元素，如果传字符串则去el下find
  warpper: null, //如果是null则使用el元素，如果el元素下面有关闭按钮，则读取直接子div，没有则生成一个，如果传字符串则去el下find
  close: $.noop, //如果有关闭按钮，则点击关闭按钮后触发该事件
  hide: $.noop, //提示栏隐藏事件，调用alerts.hide()时触发
  prefix: 'alert', //默认使用Bootstrap的class
  className: '', //需要增加和取消的class列表 ['alert-warning', 'alert-info', 'alert-danger', 'alert-success']
});

function callback () {
  console.log('这里是callback');
}

alerts.info('显示info类型的提示信息', callback);
alerts.success('显示success类型的提示信息', callback);
alerts.warning('显示warning类型的提示信息', callback);
alerts.danger('显示danger类型的提示信息', callback);
//隐藏提示栏
alert.hide()
```
