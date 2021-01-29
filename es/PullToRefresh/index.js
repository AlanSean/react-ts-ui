import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import React from 'react';
import classnames from 'classnames';
import { scrollTop } from '../static/js/compatibility/index';

var PullToRefresh = /*#__PURE__*/function (_React$Component) {
  _inherits(PullToRefresh, _React$Component);

  var _super = _createSuper(PullToRefresh);

  function PullToRefresh(props) {
    var _this;

    _classCallCheck(this, PullToRefresh);

    _this = _super.call(this, props);
    _this.pullToRefresh = /*#__PURE__*/React.createRef();
    _this.isTouchDown = true;
    _this.topDistance = 50;
    _this.flag = true;
    _this.text = {
      pull: '下拉刷新',
      loading: /*#__PURE__*/React.createElement("div", {
        className: "spinner"
      }, " ", /*#__PURE__*/React.createElement("div", {
        className: "snake"
      })),
      drop: '释放更新'
    };
    _this.ticking = null;

    _this.handler = function () {
      if (_this.ticking == null) {
        _this.ticking = window.requestAnimationFrame(function () {
          var scrollDomInfo = _this.getScrollDomInfo(); //是否可以下拉


          _this.isTouchDown = !scrollDomInfo.scrollTop;

          if (_this.props.pullOnLoad) {
            var offsetHeight = scrollDomInfo.offsetHeight,
                scrollHeight = scrollDomInfo.scrollHeight,
                _scrollTop = scrollDomInfo.scrollTop; //  个别机型会获取到小数

            if (Math.round(_scrollTop + offsetHeight) == Math.round(scrollHeight)) {
              _this.props.pullOnLoad();
            }
          }

          if (_this.ticking !== null) {
            window.cancelAnimationFrame(_this.ticking);
            _this.ticking = null;
          }
        });
      }
    };

    _this.getScrollDomInfo = function () {
      var info = {
        scrollTop: 0,
        offsetHeight: 0,
        scrollHeight: 0
      };
      info.scrollTop = !!_this.scrollDom ? _this.scrollDom.scrollTop : scrollTop();

      if (_this.props.pullOnLoad) {
        if (!!_this.scrollDom) {
          info.offsetHeight = _this.scrollDom.offsetHeight;
          info.scrollHeight = _this.scrollDom.scrollHeight;
        } else {
          info.offsetHeight = window.innerHeight;
          info.scrollHeight = document.querySelector('#root>div').offsetHeight;
        }
      }

      return info;
    };

    _this.touchStart = function (e) {
      var touch = e.touches[0] || e.changedTouches[0];

      if (_this.isTouchDown) {
        _this.setState({
          status: '',
          loosen: false
        });

        _this.startY = touch.pageY;
      }
    };

    _this.touchMove = function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          isTouchDown = _assertThisInitialize.isTouchDown,
          startY = _assertThisInitialize.startY,
          topDistance = _assertThisInitialize.topDistance,
          status = _assertThisInitialize.state.status,
          touch = e.touches[0] || e.changedTouches[0];

      if (!isTouchDown) return;
      var cha = (touch.pageY - startY) / 2;

      if (cha >= 0) {
        e.preventDefault();

        _this.setState({
          marginTop: cha
        });
      } else {
        if (status != '') {
          _this.setState({
            status: ''
          });
        }
      }

      if (cha >= topDistance && status != 'drop') {
        _this.setState({
          status: 'drop'
        });
      }

      if (cha > 0 && cha < topDistance && status != 'pull') {
        _this.setState({
          status: 'pull'
        });
      }
    };

    _this.touchEnd = function (e) {
      // 
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          isTouchDown = _assertThisInitialize2.isTouchDown,
          startY = _assertThisInitialize2.startY,
          topDistance = _assertThisInitialize2.topDistance,
          flag = _assertThisInitialize2.flag,
          touch = e.touches[0] || e.changedTouches[0];

      if (!isTouchDown) return;
      var cha = (touch.pageY - startY) / 2;
      if (cha <= 0) return;

      if (cha >= topDistance && flag) {
        _this.flag = false;

        _this.setState({
          status: 'loading',
          marginTop: topDistance
        });

        _this.time1 = window.setTimeout(function () {
          if (_this.props.reload) {
            _this.props.reload(function () {
              _this.onTopLoaded();
            });

            _this.overtime = window.setTimeout(function () {
              if (!_this.flag && !_this.isTouchDown) {
                console.log('超时了哦');

                _this.onTopLoaded();
              }

              clearTimeout(_this.overtime);
            }, 10000);
          } else {
            _this.onTopLoaded();
          }

          clearTimeout(_this.time1);
        }, Math.random() * 500 + 600);
      } else {
        _this.setState({
          status: 'loosen',
          marginTop: cha > 0 ? cha : 0
        });

        _this.onTopLoaded();
      }

      _this.isTouchDown = false;

      _this.setState({
        loosen: true
      });
    };

    _this.onTopLoaded = function () {
      _this.flag = true;
      _this.isTouchDown = true;

      _this.setState({
        marginTop: 0,
        status: ''
      });
    };

    _this.state = {
      status: '',
      marginTop: 0,
      loosen: false
    };
    return _this;
  }

  _createClass(PullToRefresh, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollDomId = this.props.scrollDomId;
      this.scrollDom = scrollDomId && document.querySelector(scrollDomId);

      if (!!this.scrollDom) {
        this.scrollDom.addEventListener('scroll', this.handler);
      } else {
        window.addEventListener('scroll', this.handler);
      }

      if (this.props.reload) {
        this.pullToRefresh.current.addEventListener('touchstart', this.touchStart, {
          passive: false
        });
        this.pullToRefresh.current.addEventListener('touchmove', this.touchMove, {
          passive: false
        });
        this.pullToRefresh.current.addEventListener('touchend', this.touchEnd, {
          passive: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!!this.scrollDom) {
        this.scrollDom.removeEventListener('scroll', this.handler);
      } else {
        window.removeEventListener('scroll', this.handler);
      }

      if (this.ticking !== null) {
        window.cancelAnimationFrame(this.ticking);
      }

      clearTimeout(this.time1);
      clearTimeout(this.overtime);

      if (this.props.reload) {
        this.pullToRefresh.current.removeEventListener('touchstart', this.touchStart);
        this.pullToRefresh.current.removeEventListener('touchsmove', this.touchMove);
        this.pullToRefresh.current.removeEventListener('touchsend', this.touchEnd);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          status = _this$state.status,
          marginTop = _this$state.marginTop,
          loosen = _this$state.loosen;
      return /*#__PURE__*/React.createElement("div", {
        style: this.props.style,
        className: this.props.className,
        ref: this.pullToRefresh
      }, /*#__PURE__*/React.createElement("div", {
        className: 'pullToRefresh'
      }, /*#__PURE__*/React.createElement("div", {
        className: classnames('pull-content', {
          'pull-transition': loosen
        }) // style={{ transform: marginTop > 0 ? `translateY(${marginTop}px)` : 'none'}}
        ,
        style: {
          top: marginTop > 0 ? "".concat(marginTop, "px") : '0'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: 'pull-indicator'
      }, this.text[status]), /*#__PURE__*/React.createElement("div", null, this.props.children))));
    }
  }]);

  return PullToRefresh;
}(React.Component);

export default PullToRefresh;