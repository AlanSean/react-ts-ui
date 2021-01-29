import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import React from 'react';
import classnames from 'classnames';
import PullToRefresh from '../PullToRefresh/index';
import { scrollTop } from '../static/js/compatibility/index';

var Tablist = /*#__PURE__*/function (_React$Component) {
  _inherits(Tablist, _React$Component);

  var _super = _createSuper(Tablist);

  function Tablist(props) {
    var _this;

    _classCallCheck(this, Tablist);

    _this = _super.call(this, props);
    _this.ticking = null;
    _this.tabsRefs = /*#__PURE__*/React.createRef();
    _this.childRefs = {};

    _this.scrollChange = function () {
      if (_this.ticking == null) {
        _this.ticking = window.requestAnimationFrame(function () {
          if (typeof _this.props.fixedTop != 'number') {
            _this.cancelAnimationFrame();

            return;
          }

          var offsetTop = _this.tabsRefs.current.offsetTop,
              fixedTop = _this.props.fixedTop;
          var isFixed = scrollTop() >= offsetTop - fixedTop;

          if (_this.state.isFixed != isFixed) {
            _this.setState({
              isFixed: isFixed
            });

            _this.props.onFixed && _this.props.onFixed(isFixed);
          }

          _this.cancelAnimationFrame();
        });
      }
    };

    _this.onChange = function (tab, index) {
      _this.props.onChange && _this.props.onChange(tab, index);
    };

    _this.onClick = function (tab, index) {
      var isInit = _this.state.isInit;
      isInit[index] = true;

      _this.setState({
        activeIndex: index,
        isInit: isInit
      });

      _this.onChange(tab, index);

      _this.props.onClick && _this.props.onClick(tab, index);
    };

    _this.childredInit = function (index) {
      var _this$props = _this.props,
          children = _this$props.children,
          pullOnLoad = _this$props.pullOnLoad,
          _this$state = _this.state,
          activeIndex = _this$state.activeIndex,
          isInit = _this$state.isInit;

      if (isInit[index] || activeIndex == index) {
        var newChild = children && children.hasOwnProperty('length') ? children[index] : children;

        if (_this.pullToRefresh || !!pullOnLoad) {
          return /*#__PURE__*/React.cloneElement(newChild, {
            ref: _this.childRefs[index]
          });
        } else {
          return newChild;
        }
      } else {
        return null;
      }
    };

    _this.underline = function () {
      if (!_this.isBarUnderline) return null;
      var activeIndex = _this.state.activeIndex,
          barLeft = _this.tabWidth - _this.barWidth - (_this.tabWidth - _this.barWidth) / 2;
      return /*#__PURE__*/React.createElement("div", {
        className: classnames('tabs-bar-underline', _this.defaultBarClass),
        style: {
          width: _this.barWidth * 100 + '%',
          left: _this.tabWidth ? activeIndex * _this.tabWidth * 100 + barLeft * 100 + '%' : 0
        }
      });
    }; //组件下拉刷新重载


    _this.reload = function (reload) {
      var activeIndex = _this.state.activeIndex,
          current = _this.childRefs[activeIndex].current;
      current && current.reload ? current.reload(reload) : reload && reload();
    }; //组件上拉加载


    _this.pullOnLoad = function () {
      var activeIndex = _this.state.activeIndex,
          current = _this.childRefs[activeIndex].current;
      current && current.pullOnLoad && current.pullOnLoad();
    };

    _this.contentWarpElmen = function () {
      var tabs = _this.props.tabs,
          activeIndex = _this.state.activeIndex;
      return /*#__PURE__*/React.createElement("div", {
        className: classnames("tabs-content-warp", {
          'tabs-content-warp-animate': _this.isAnimate
        }),
        style: {
          left: -1 * activeIndex * 100 + '%'
        }
      }, tabs.map(function (_item, index) {
        return /*#__PURE__*/React.createElement("div", {
          key: index,
          className: classnames("tabs-content-pane-warp", activeIndex == index ? "tabs-content-active" : 'abscontent-inactive')
        }, _this.childredInit(index));
      }));
    };

    _this.PullToRefreshElement = function () {
      return /*#__PURE__*/React.createElement(PullToRefresh, {
        reload: _this.pullToRefresh ? _this.reload : undefined,
        pullOnLoad: _this.props.pullOnLoad ? _this.pullOnLoad : undefined
      }, _this.contentWarpElmen());
    };

    var activeClass = props.activeClass,
        defaultClass = props.defaultClass,
        defaultBarClass = props.defaultBarClass,
        barWidth = props.barWidth,
        isAnimate = props.isAnimate,
        isBarUnderline = props.isBarUnderline,
        tablistWidth = props.tablistWidth,
        tabs = props.tabs,
        pullToRefresh = props.pullToRefresh,
        clientWidth = document.documentElement.clientWidth; //选中class

    _this.activeClass = activeClass || 'tabs-default-bar-bth-active';
    _this.defaultClass = defaultClass || '';
    _this.defaultBarClass = defaultBarClass || 'tabs-default-bar-underline'; //切换动画

    _this.isAnimate = isAnimate != undefined ? isAnimate : true; //选中的下划线 

    _this.isBarUnderline = isBarUnderline != undefined ? isBarUnderline : true;
    _this.tablistWidth = tablistWidth != undefined ? parseFloat(tablistWidth) / clientWidth : 1;
    _this.tabWidth = barWidth ? _this.tablistWidth / tabs.length : 1 / tabs.length;
    _this.barWidth = barWidth && barWidth / (_this.tablistWidth * clientWidth) || _this.tabWidth;
    _this.pullToRefresh = !!pullToRefresh; // this.pullToRefresh = !!pullOnLoad;

    _this.state = {
      activeIndex: Number(props.initialPage) || 0,
      isInit: props.tabs.map(function (_item, index) {
        if (_this.pullToRefresh) _this.childRefs[index] = /*#__PURE__*/React.createRef();
        return index == Number(props.initialPage);
      }),
      isFixed: false
    };
    return _this;
  }

  _createClass(Tablist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof this.props.fixedTop == 'number') {
        window.addEventListener('scroll', this.scrollChange);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.scrollChange);

      if (this.ticking !== null) {
        window.cancelAnimationFrame(this.ticking);
        this.ticking = null;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      var _this$props2 = this.props,
          initialPage = _this$props2.initialPage,
          tabs = _this$props2.tabs,
          oldInitialPage = oldProps.initialPage;

      if (initialPage != undefined && oldInitialPage != initialPage) {
        this.onClick(tabs[initialPage], Number(initialPage));
      }
    }
  }, {
    key: "cancelAnimationFrame",
    value: function cancelAnimationFrame() {
      if (this.ticking !== null) {
        window.cancelAnimationFrame(this.ticking);
        this.ticking = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          tabs = _this$props3.tabs,
          fixedTop = _this$props3.fixedTop,
          pullOnLoad = _this$props3.pullOnLoad,
          _this$state2 = this.state,
          activeIndex = _this$state2.activeIndex,
          isFixed = _this$state2.isFixed;
      return /*#__PURE__*/React.createElement("div", {
        className: classnames('tabs-container', {
          'tabs-fixed': isFixed
        }),
        style: {
          paddingTop: isFixed ? fixedTop + 'px' : ''
        },
        ref: this.tabsRefs
      }, /*#__PURE__*/React.createElement("div", {
        className: 'tabs-tablist',
        style: {
          top: isFixed ? fixedTop + 'px' : '',
          width: this.tablistWidth * 100 + '%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: classnames("tabs-defult-bar", this.defaultClass)
      }, tabs.map(function (item, index) {
        return /*#__PURE__*/React.createElement("div", {
          id: 'tabs_' + index,
          key: index,
          onClick: _this2.onClick.bind(_this2, item, index),
          className: classnames("tabs-default-bar-bth", _defineProperty({}, _this2.activeClass, activeIndex == index)),
          style: {
            width: 100 / tabs.length + '%'
          }
        }, item.title);
      }), this.underline())), this.pullToRefresh || !!pullOnLoad ? this.PullToRefreshElement() : this.contentWarpElmen());
    }
  }]);

  return Tablist;
}(React.Component);

export default Tablist;