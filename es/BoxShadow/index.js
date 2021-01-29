/*
 * @Author: Alan
 * @LastEditors: Alan
 */
import React from 'react';
import domRender from '@/react-ui/static/js/factory/domRender';
import { singleton } from '@/react-ui/static/js/factory';
import BoxShadow from './boxShadow';

function ref(a) {
  a.show();
}

function init() {
  return domRender( /*#__PURE__*/React.createElement(BoxShadow, {
    ref: ref
  }));
}

var instance = singleton(init),
    Shadow = {
  config: function config(options) {
    instance().config(options);
  },
  show: function show() {
    console.log(345345);
    instance();
  },
  hide: function hide() {
    instance().hide();
  }
};
export default Shadow;