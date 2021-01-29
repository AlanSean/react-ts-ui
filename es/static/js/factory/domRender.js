import ReactDOM from 'react-dom';

var domRender = function domRender(Ele, container) {
  var div;

  if (container) {
    div = typeof container === 'string' ? window.document.getElementById(container) : container;
  } else {
    div = window.document.createElement('div');
    window.document.body.appendChild(div);
  }

  return ReactDOM.render(Ele, div);
};

export default domRender;