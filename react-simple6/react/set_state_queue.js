/**
 * 1. 异步更新state,短时间内把多个setState合并一个(队列:先进先出)
 * 2. 一段时间之后,循环遍历,清空队列,渲染组件
 */

import { renderComponent } from "../react-dom";

//保存当前setState
const setStateQueue = [];
//保存当前组件
const renderQueue = [];
export function enqueueSetState(stateChange, component) {
  if (setStateQueue.length === 0) {
    def(flush);
  }
  setStateQueue.push({ stateChange, component })

  //如果renderQueue里面没有组件,添加到队列中
  let r = renderQueue.some(e => e === component)
  if (!r) {
    //第一次添加
    renderQueue.push(component)
  }
}

function def(fn) {
  return Promise.resolve().then(fn);
}

//一段时间后 更新状态
export function flush() {
  let item;
  //取出最后一个值
  while (item = setStateQueue.shift()) {
    const { stateChange, component } = item;
    //保存之前的状态
    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state)
    }

    if (typeof stateChange === 'function') {
      //函数
      Object.assign(component.state, stateChange(component.prevState, component.props));
    } else {
      //值
      Object.assign(component.state, stateChange);
    }
    //赋值
    component.prevState = component.state;
  }

  let component;
  while (component = renderQueue.shift()) {
    renderComponent(component);
  }
}
