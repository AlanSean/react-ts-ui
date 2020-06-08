(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * ((clientWidth > 750 ? 450 : clientWidth) / 750) + 'px';
            docEl.style.height = clientHeight+'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
