const babel = require('@babel/core');
const code = `<h3 className='title'>test react</h3>`

const res1 = babel.transform(code, {
  plugins: [
    ['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]
  ]
})

console.log('res1: ', res1);

const res2 = babel.transform(code, {
  plugins: [
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
  ]
})

console.log('res2: ', res2);
/**


classic 需要上下文中有一个React变量
老的转换 jsx => React.createElement;

React.createElement("h3", {
  className: "title"
}, "test react");


automatic 不需要引入React这个变量
新的转换 直接引入 import { jsx as _jsx };

'import { jsx as _jsx } from "react/jsx-runtime";
_jsx("h3", {
  className: "title",
  children: "test react"
});',


*/
