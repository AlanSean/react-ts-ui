/*
 * @Author: Alan
 * @LastEditors: Alan
 * https: //prettier.io/docs/en/options.html 配置选项
 */
const fabric = require('@umijs/fabric');

module.exports = {
    ...fabric.prettier,
    tabWidth: 4,
    useTabs: true
};
