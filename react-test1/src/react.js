import { REACT_ELEMENT_TYPE } from './ReactSymbols'; //唯一标识,避免命名冲突
import { Component } from './ReactBaseClasses'

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

/**
 *
 * @export
 * @param {*} type 元素类型
 * @param {*} config 配置对象
 * @param {*} children 大儿子
 */
export function createElement(type, config, children) {
  const props = {};
  //key 标识每一个稳定的元素
  let key = null;
  if (config !== null) {
    key = config.key;
  }

  for (let propName in config) {
    if (RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  const childrenLength = arguments.length - 2;

  if (childrenLength.length === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array[childrenLength];
    for (let i = 0; i < childArray.length; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  //React.createElement方法返回的就是一个普通的js对象,它可以描述元素的样子,这就是所谓的虚拟DOM
  //虚拟DOM是跨平台的,跟平台无关
  const element = {
    $$typeof: REACT_ELEMENT_TYPE, //$$typeof 标识符 表示是一个React元素,就是所谓的虚拟dom
    type,
    key,
    props,
  }
  return element;
}

/**
 * children
 * 一个元素,一个字符串,一个数字,null,
 * 有一个儿子,没有儿子,多个儿子
 * props.children = null | string | number | React元素 | Array[]
 * ReactNode 节点 - 表示一个可以渲染的值
 * ReactElement 元素
 */

const React = {
  createElement,
  Component,
}

export default React;
