webpackJsonp([10],{

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // controller
	
	
	var _react = __webpack_require__(301);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = function () {
		function Controller() {
			_classCallCheck(this, Controller);
	
			this.jump = this.jump.bind(this);
		}
	
		_createClass(Controller, [{
			key: 'init',
			value: function init() {
				return this.render();
			}
		}, {
			key: 'update',
			value: function update() {
				console.log('update');
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				console.log('destroy', this.location);
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h1',
						null,
						'home: ',
						JSON.stringify(this.location, null, 2)
					),
					_react2.default.createElement(
						'ul',
						null,
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								'a',
								{ href: '/home', onClick: this.jump },
								'home page'
							)
						),
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								'a',
								{ href: '/list', onClick: this.jump },
								'list page'
							)
						),
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								'a',
								{ href: '/detail', onClick: this.jump },
								'detail page'
							)
						)
					)
				);
			}
		}, {
			key: 'jump',
			value: function jump(event) {
				event.preventDefault();
				var _event$currentTarget = event.currentTarget;
				var pathname = _event$currentTarget.pathname;
				var search = _event$currentTarget.search;
	
				console.log('jump');
				this.goTo(pathname);
			}
		}]);
	
		return Controller;
	}();
	
	exports.default = Controller;

/***/ }

});
//# sourceMappingURL=home.js.map