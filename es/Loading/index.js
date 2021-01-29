import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import React from 'react';
import classnames from 'classnames';

var Loading = /*#__PURE__*/function (_React$Component) {
  _inherits(Loading, _React$Component);

  var _super = _createSuper(Loading);

  function Loading(props) {
    var _this;

    _classCallCheck(this, Loading);

    _this = _super.call(this, props);
    _this.state = {
      hidden: false
    };
    return _this;
  }

  _createClass(Loading, [{
    key: "render",
    value: function render() {
      var flag = this.props.flag,
          hidden = this.state.hidden;
      flag = flag == undefined ? true : this.props.flag;
      return /*#__PURE__*/React.createElement("div", {
        className: classnames({
          'hide': !flag || hidden
        }, 'indicator')
      }, /*#__PURE__*/React.createElement("div", {
        className: "indicator-mask"
      }), /*#__PURE__*/React.createElement("div", {
        className: "indicator-wrapper"
      }, /*#__PURE__*/React.createElement("span", {
        className: "indicator-spin"
      }, /*#__PURE__*/React.createElement("div", {
        className: "indicator-spinner-snake"
      })), /*#__PURE__*/React.createElement("span", {
        className: "indicator-text"
      }, "\u52A0\u8F7D\u4E2D")));
    }
  }]);

  return Loading;
}(React.Component);

export default Loading;