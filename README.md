# EnjoyImageLazy
## 图片延时加载
html结构：
```html
<img src="/images/blank.gif" class="img-lazy" data-lazy="xx.jpg" width="800" height="500" alt=""/>
```

实例化：
```javascript
var imgLazy = new Enjoy.ImageLazy('.img-lazy', {
	clickHover: '#clickHover', // 点击或移上该对象显示隐藏的图片
	additionalH: 0 // 一般情况下为0，如有大幅顶部广告图往下撑后又缩小成小广告图时，可设置相应的高度。
});	
```