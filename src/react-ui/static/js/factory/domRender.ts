import ReactDOM from 'react-dom';

const domRender = function (Ele: any, container?: string) {
    let div;

    if (container) {
        div = typeof container === 'string' ?
            window.document.getElementById(container) : container;
    } else {
        div = window.document.createElement('div');
        window.document.body.appendChild(div);
    }
    return ReactDOM.render(Ele, div);
};

export default domRender;
