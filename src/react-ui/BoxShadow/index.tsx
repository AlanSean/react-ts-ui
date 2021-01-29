/*
 * @Author: Alan
 * @LastEditors: Alan
 */
import BoxShadow, { ShadowType } from './boxShadow';

const Shadow: ShadowType = {
    config: function (options) {
        BoxShadow.newInstance(el => el.config(options));
    },
    show: function () {
        BoxShadow.newInstance(el => {
            el.show();
        });
    },
    hide: function () {
        BoxShadow.newInstance(el => el.hide());
    }
};

export default Shadow;