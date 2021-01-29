import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import BoxShadow from '@/react-ui/BoxShadow';
import { scorllStop } from '../static/js/factory';

function getAnimationClassNames(module) {
  return {
    'enter': "Shade-".concat(module, "__enter"),
    'enterActive': "Shade-".concat(module, "__enterActive"),
    'exit': "Shade-".concat(module, "__exit"),
    'exitActive': "Shade-".concat(module, "__exitActive"),
    'exitDone': "Shade-".concat(module, "__exitDone")
  };
}

function show() {
  BoxShadow.show();
}

var left = getAnimationClassNames('left'),
    right = getAnimationClassNames('right'),
    up = getAnimationClassNames('up'),
    bottom = getAnimationClassNames('bottom'),
    scales = getAnimationClassNames('scale');

var Shade = /*#__PURE__*/function (_React$Component) {
  _inherits(Shade, _React$Component);

  var _super = _createSuper(Shade);

  function Shade(props) {
    var _this;

    _classCallCheck(this, Shade);

    _this = _super.call(this, props);

    _this.getclassNames = function () {
      var animation = _this.props.animation;

      if (animation == 'scale') {
        return scales;
      }

      if (animation == 'left') {
        return left;
      }

      if (animation == 'right') {
        return right;
      }

      if (animation == 'bottom') {
        return bottom;
      }

      return up;
    };

    _this.close = function () {
      _this.props.hide && _this.props.hide();
    }; // props.shadowClass && Shadow.config({
    //     shadowClass: props.shadowClass
    // });


    return _this;
  }

  _createClass(Shade, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      scorllStop();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      scorllStop();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isShow != this.props.isShow) {
        scorllStop(nextProps.isShow);
        show(); // nextProps.isShow ? Shadow.show() : Shadow.hide();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isShow = _this$props.isShow,
          animation = _this$props.animation,
          animationName = animation && /left|scale|bottom|right/g.test(animation) ? animation : 'up';
      return /*#__PURE__*/React.createElement("div", {
        className: classnames('Shade-fixed-center', 'Shade-shade', !isShow ? 'Shade-hide' : 'Shade-show')
      }, /*#__PURE__*/React.createElement(CSSTransition, {
        "in": !isShow,
        timeout: 200,
        classNames: this.getclassNames()
      }, /*#__PURE__*/React.createElement("div", {
        className: classnames('Shade-content', "Shade-".concat(animationName, "Content"))
      }, children)));
    }
  }]);

  return Shade;
}(React.Component);

export default Shade;