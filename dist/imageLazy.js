(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Enjoy", [], factory);
	else if(typeof exports === 'object')
		exports["Enjoy"] = factory();
	else
		root["Enjoy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	var ImageLazy = function () {
		// 构造函数
		function ImageLazy(selector, args) {
			_classCallCheck(this, ImageLazy);

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


		_createClass(ImageLazy, [{
			key: 'saveImageData',
			value: function saveImageData() {
				var _this = this;

				this.$el.each(function (i, v) {
					var item = $(v);
					if (item.data('lazy') !== 'undefined') {
						if (item.is(':visible')) {
							_this.listImg.push({
								dom: item,
								top: item.offset().top
							});
						} else {
							_this.listHideImg.push({
								dom: item
							});
						}
					}
				});
			}
			// 让图片加载显示

		}, {
			key: 'showImage',
			value: function showImage(top) {
				var _this2 = this;

				$.each(this.listHideImg, function (i, v) {
					if (v && v.dom.is(':visible')) {
						_this2.listImg.push({
							dom: v.dom,
							top: v.dom.offset().top
						});
						delete _this2.listHideImg[i];
					}
				});
				$.each(this.listImg, function (i, v) {
					if (v && v.top < top) {
						var img = new Image();
						img.onload = function () {
							if (v.dom.get(0).tagName.toLowerCase() !== 'img') {
								v.dom.css({
									backgroundImage: 'url(' + v.dom.data('lazy') + ')'
								}).hide().fadeIn(1000);
							} else {
								v.dom.attr('src', v.dom.data('lazy')).hide().fadeIn(1000);
							}
						};
						img.src = v.dom.data('lazy');
						delete _this2.listImg[i];
					}
				});
			}
			// 改变window可见区域

		}, {
			key: 'changeArea',
			value: function changeArea() {
				this.showImage(this.wind.scrollTop() + this.wind.height() + this.args.additionalH);
			}
			// 拉动滚动条或改变窗口大小

		}, {
			key: 'scrollResize',
			value: function scrollResize() {
				var _this3 = this;

				var timer = null;
				this.changeArea();
				// 点击或移上显示图片
				this.$clickHover.each(function (i, v) {
					var item = $(v);
					item.on('click.lazy mouseover.lazy', function () {
						setTimeout(function () {
							_this3.changeArea();
						}, 100);
					});
				});
				this.wind.on('scroll.lazy resize.lazy', function () {
					if (timer) {
						clearTimeout(timer);
					}
					timer = setTimeout(function () {
						_this3.changeArea();
					}, 200);
				});
			}
		}]);

		return ImageLazy;
	}();

	exports.default = { ImageLazy: ImageLazy };
	module.exports = exports['default'];

/***/ }
/******/ ])
});
; 