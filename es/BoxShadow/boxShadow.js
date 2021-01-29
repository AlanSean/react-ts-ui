import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
var time = 300,
    shadowclassname = 'Shade-defaultShadow';
var config = {
  duration: time,
  shadowClass: shadowclassname
};

var BoxShadow = /*#__PURE__*/function (_React$Component) {
  _inherits(BoxShadow, _React$Component);

  var _super = _createSuper(BoxShadow);

  function BoxShadow(props) {
    var _this;

    _classCallCheck(this, BoxShadow);

    _this = _super.call(this, props);

    _this.config = function (options) {
      var _options$duration = options.duration,
          duration = _options$duration === void 0 ? time : _options$duration,
          _options$shadowClass = options.shadowClass,
          shadowClass = _options$shadowClass === void 0 ? shadowclassname : _options$shadowClass;
      config.duration = duration;
      config.shadowClass = shadowClass;
    };

    _this.show = function () {
      _this.setState({
        isShow: true
      });
    };

    _this.hide = function () {
      _this.setState({
        isShow: false
      });
    };

    _this.state = {
      isShow: false
    };
    return _this;
  }

  _createClass(BoxShadow, [{
    key: "render",
    value: function render() {
      var isShow = this.state.isShow;
      return /*#__PURE__*/React.createElement(CSSTransition, {
        "in": isShow,
        timeout: config.duration,
        classNames: "Shade-shadow"
      }, /*#__PURE__*/React.createElement("div", _extends({}, this.props, {
        className: classnames('Shade-shadow', config.shadowClass),
        onClick: this.hide
      })));
    }
  }]);

  return BoxShadow;
}(React.Component);

export default BoxShadow;