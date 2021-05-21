import { Component } from '../react';

const ReactDOM = {
  render,
}

function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  if ([undefined, null, true, false, ''].includes(vnode)) vnode = '';
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  if (typeof vnode === 'string') {
    //创建文本节点
    return document.createTextNode(vnode);
  }
  const { tag, attrs, childrens } = vnode;
  // console.log("🚀 ~ file: index.js ~ line 18 ~ _render ~ tag", tag)
  if (typeof tag === 'function') {
    //是个函数
    //1创建组件
    const comp = createComponent(tag, attrs);
    // console.log('_render comp1: ', comp);
    //2设置组件属性
    setComponentProps(comp, attrs);
    // console.log('_render comp2: ', comp);
    //3组件渲染的节点对象返回
    return comp.base;
  }
  //否则就是一个虚拟dom对象
  const dom = document.createElement(tag);

  if (attrs) {
    //有属性
    Object.keys(attrs).forEach(e => {
      const value = attrs[e];
      setAttribute(dom, e, value);
    })
  }

  //渲染子节点
  childrens && childrens.forEach(e => {
    render(e, dom);
  })
  return dom;
}

function createComponent(comp, props) {
  // console.log("🚀 ~ file: index.js ~ line 49 ~ createComponent ~ comp", comp, comp.prototype)
  let inst;
  if (comp.prototype && comp.prototype.render) {
    //类定义
    inst = new comp(props)
  } else {
    //函数定义 将函数转扩展成类组件 方便统一管理
    inst = new Component(props);
    inst.constructor = comp;
    inst.render = function () {
      return this.constructor(props);
    }
  }
  return inst;
}

function setComponentProps(comp, props) {

  //在创建组件之后 渲染组件之前 添加生命周期
  if (!comp.base) {
    comp.componentWillMount && comp.componentWillMount();
  } else if (comp.componentReceiveProps) {
    comp.componentReceiveProps(props)
  }

  //设置属性
  comp.props = props;

  //渲染组件
  renderComponent(comp);
}

//组件渲染
export function renderComponent(comp) {
  let base;
  const vdom = comp.render()
  // console.log('renderComponent vdom: ', vdom);
  base = _render(vdom);
  if (comp.base && comp.componentWillUpdate) {
    //组件将要更新
    comp.componentWillUpdate();
  }
  if (comp.base) {
    comp.componentDidUpdate && comp.componentDidUpdate();
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  }

  //节点替换
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }

  // console.log('renderComponent base', base);
  comp.base = base;
}

//设置属性
function setAttribute(dom, key, value) {
  //将属性名className转换成class
  if (key === 'className') {
    key = 'class';
  }

  // 如果是个事件onClick onBlur ...
  if (/on\w/.test(key)) {
    //转小写
    console.log('on : ', value);
    key = key.toLowerCase();
    dom[key] = value || '';
  } else if (key === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      //{ width: 20 } ...
      for (const k in value) {
        if (Object.hasOwnProperty.call(value, k)) {
          const e = value[k];
          if (typeof e === 'number') {
            dom.style[k] = e + 'px';
          } else {
            dom.style[k] = e;
          }
        }
      }
    }
  } else {
    //其他属性
    if (key in dom) {
      dom[key] = value || '';
    }

    if (value) {
      //更新值
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key, value)
    }
  }
}

export default ReactDOM;
