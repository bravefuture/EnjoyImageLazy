/**
 * [图片延时加载]
 * @update: 2016.07.26
 * @author: yongcheng0660@163.com
 * @github: https://github.com/bravefuture
 * html结构：
	<img src="/images/blank.gif" class="img-lazy" data-lazy="xx.jpg" width="800" height="500" alt=""/>
 * 	
 * 实例化
	var imgLazy = new Enjoy.ImageLazy('.img-lazy', {
		clickHover: '#clickHover', // 点击或移上该对象显示隐藏的图片
		additionalH: 0 // 一般情况下为0，如有大幅顶部广告图往下撑后又缩小成小广告图时，可设置相应的高度。
	});
 */
class ImageLazy {
	// 构造函数
	constructor(selector, args) {
		// 获取dom
		this.$el = selector instanceof $ ? selector : $(selector);
		// 设置参数
		this.args = $.extend({
	        clickHover: null,
	        additionalH: 0
		}, args || {});
		// 点击或移上该对象显示隐藏的图片
		this.$clickHover = this.args.clickHover instanceof jQuery ? this.args.clickHover : $(this.args.clickHover);
		// 存放符合要求且显示状态的图片队列
		this.listImg = [];
		// 存放符合要求且隐藏状态的图片队列
    	this.listHideImg = [];
    	// 取window对象
    	this.wind = $(window);
    	// 执行
    	this.saveImageData();
    	this.scrollResize();
	}
	// 存图片数据
	saveImageData() {
		this.$el.each((i, v) => {
			let item = $(v);
			if (item.data('lazy') !== 'undefined') {
				if (item.is(':visible')) {
					this.listImg.push({
						dom: item,
						top: item.offset().top
					});
				} else {
					this.listHideImg.push({
						dom: item
					});
				}
			}
		});
	}
	// 让图片加载显示
	showImage(top) {
		$.each(this.listHideImg, (i, v) => {
			if (v && v.dom.is(':visible')) {
                this.listImg.push({
                    dom: v.dom,
                    top: v.dom.offset().top
                });
                delete this.listHideImg[i];
            }
		});
		$.each(this.listImg, (i, v) => {
            if (v && v.top < top) {
                var img = new Image();
                img.onload = function() {
                    if(v.dom.get(0).tagName.toLowerCase() !== 'img'){
    					v.dom.css({
							backgroundImage: 'url('+v.dom.data('lazy')+')'
						}).hide().fadeIn(1000);
    				}
                    else{
                        v.dom.attr('src', v.dom.data('lazy')).hide().fadeIn(1000);
                    }
                };
                img.src = v.dom.data('lazy');
                delete this.listImg[i];
            }
        });
	}
	// 改变window可见区域
	changeArea() {
		this.showImage(this.wind.scrollTop() + this.wind.height() + this.args.additionalH);
	}
	// 拉动滚动条或改变窗口大小
	scrollResize() {
		let timer = null;
        this.changeArea();
        // 点击或移上显示图片
        this.$clickHover.each((i, v) => {
        	let item = $(v);
            item.on('click.lazy mouseover.lazy', () => {
                setTimeout(() => {
                    this.changeArea();
                }, 100);
            });
        });
        this.wind.on('scroll.lazy resize.lazy', () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.changeArea();
            }, 200);
        });
	}
}

export default {ImageLazy};



