/**
 * 1. 导入babel
 *  npm i babel-core babel-preset-env babel-plugin-transform-react-jsx --save-dev
 * 2. 配置.babelrc
 */

// const ele = /*#__PURE__*/React.createElement("div", {
//   title: "hello"
// }, /*#__PURE__*/React.createElement("h3", {
//   className: "title"
// }, "hello react"));

import React from './react';
import ReactDOM from './react-dom';

const ele = (
  <div title='test' style='background: #ff0000;'>
    <h3 className='title'>test react</h3>
  </div>
)

//文本
// ReactDOM.render('react', document.querySelector('#root'));

//ele dom元素
// ReactDOM.render(ele, document.querySelector('#root'));

//最核心: 组件化开发
//1. 为什么ReactDOM.render()必须引入React?
//2. 组件: 函数组件 类组件

ReactDOM.render(ele, document.querySelector('#root'));


// import React from './react';
// import ReactDOM from './react-dom';

// // const ele = (
// //   <div title='test' style='background: #ff0000;'>
// //     <h3 className='title'>test react</h3>
// //   </div>
// // )

// function Home() {
//   return (
//     <div title='test' style='background: #ff0000;'>
//       <h3 className='title'>test react</h3>
//     </div>
//   )
// }

// console.log(<Home />);

// ReactDOM.render(Home, document.querySelector('#root'));
