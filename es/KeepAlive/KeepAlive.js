import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { KeepAlive as ReactKeepAlive, useActivate, useUnactivate } from 'react-activation'; // export * from 'react-activation'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { scrollTotop } from '../static/js/compatibility/index';

function isEqualAndTruthy(newKey, lastKey) {
  if (!newKey || !lastKey) {
    return false;
  }

  if (newKey.length !== lastKey.length) {
    return false;
  }

  return true;
}

function Keep(props) {
  var deps = props.deps;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      scrollY = _useState2[0],
      setScrollY = _useState2[1];

  var ticking = null;
  useActivate(function () {
    if (scrollY !== null) {
      var y = isEqualAndTruthy(savedDeps.current, deps.name) ? scrollY : 0;
      scrollTotop(y);
    }

    window.addEventListener('scroll', handler);
  });
  var savedDeps = useRef(deps.name);
  var savedCallback = useRef(function () {});
  var handler = useCallback(function () {
    if (ticking === null) {
      ticking = window.requestAnimationFrame(function () {
        // console.log(window.scrollY)
        setScrollY(window.scrollY);

        if (ticking !== null) {
          window.cancelAnimationFrame(ticking);
          ticking = null;
        }
      });
    }
  }, []);
  useEffect(function () {
    savedCallback.current = function () {
      return savedDeps.current = deps.name;
    };

    window.addEventListener('scroll', handler);
    return function () {
      window.removeEventListener('scroll', handler);

      if (ticking !== null) {
        window.cancelAnimationFrame(ticking);
      }

      savedCallback.current();
    };
  });
  useUnactivate(function () {
    window.removeEventListener('scroll', handler);

    if (ticking !== null) {
      window.cancelAnimationFrame(ticking);
    }

    savedCallback.current();
  });
  var Children = deps.component;
  return /*#__PURE__*/React.createElement(Children, props);
}

function KeepAlive(deps) {
  if (!deps.name) throw Error('name必传');
  if (!deps.component) throw Error('component必传');
  return function (props) {
    return /*#__PURE__*/React.createElement(ReactKeepAlive, {
      name: deps.name
    }, /*#__PURE__*/React.createElement(Keep, _extends({}, props, {
      deps: deps
    })));
  };
}

export default KeepAlive;