import Component from './component'

const React = {
  createElement,
  Component,
}

function createElement(tag, attrs, ...childrens) {
  attrs = attrs || {}
  return {
    tag,  //外层标签
    attrs, //属性,一个对象
    childrens, //节点数组
    key: attrs.key || null, //key来标识真实节点和虚拟节点之间的查找关系, 当虚拟节点查找原来已有的节点时, 会通过key来进行标识, 这样就能准确定位到和谁进行对比
  }
}

export default React;
export {
  Component
};
