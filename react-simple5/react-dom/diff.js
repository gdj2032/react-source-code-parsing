import { setAttribute, setComponentProps, createComponent } from './index'

/**
 * diff算法
 * @export
 * @param {*} dom 真实dom
 * @param {*} vnode 虚拟dom
 * @param {*} container 容器
 * @returns : 更新后的DOM
 */
export function diff(dom, vnode, container) {
  //对比节点变化
  const ret = diffNode(dom, vnode);
  if (container) {
    container.appendChild(ret)
  }
  return ret;
}

export function diffNode(dom, vnode) {
  let out = dom;
  if ([undefined, null, true, false, ''].includes(vnode)) vnode = '';
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === 3) {
      //更新文本内容
      if (dom.textContent !== vnode) dom.textContent = vnode;
    } else {
      out = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom);
      }
    }
    return out;
  }
  //组件
  if (typeof vnode.tag === 'function') {
    return diffComponent(out, vnode);
  }

  //非文本节点
  //先判断当前节点存不存在
  if (!dom) {
    //第一次渲染
    out = document.createElement(vnode.tag);
  }
  //比较子节点(dom节点和组件)
  if (vnode.childrens && vnode.childrens.length > 0 || (out.childNodes && out.childNodes.length > 0)) {
    //对比组件或子节点
    diffChildrens(out, vnode.childrens)
  }
  diffAttribute(out, vnode);
  return out;
}

function diffComponent(dom, vnode) {
  let comp = dom;
  //如果组件没有变化 重新设置props
  if (comp && comp.constructor === vnode.tag) {
    //重置props
    setComponentProps(comp, vnode.attrs);
    //赋值
    dom = comp.base;
  } else {
    //组件类型发生变化
    if (comp) {
      //先移除旧的组件
      unmountComponent(comp);
      comp = null;
    }
    //1.创建新的组件
    comp = createComponent(vnode.tag, vnode.attrs)
    //2.设置组件属性
    setComponentProps(comp, vnode.attrs)
    //3.给当前组件挂在comp.base
    dom = comp.base;
  }
  return dom;
}

function unmountComponent(comp) {
  removeNode(comp.base)
}

function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeNode(dom);
  }
}

/**
 *
 * @param {*} out
 * @param {*} vnode
 */
function diffChildrens(dom, vChildren) {
  const domChildren = dom.childNodes;
  const children = []; //没有key的节点
  const keyed = {}; //有key的节点
  //将有key的节点(用对象保存)和没有key的节点(用数组保存)分开
  if (domChildren.length > 0) {
    [...domChildren].forEach(item => {
      // 获取key
      const key = item.key;
      if (key) {
        // 如果key存在,保存到对象中
        keyed[key] = item;
      } else {
        // 如果key不存在,保存到数组中
        children.push(item)
      }
    })
  }
  if (vChildren && vChildren.length > 0) {
    let min = 0;
    let childrenLen = children.length;
    [...vChildren].forEach((vChild, i) => {
      //获取虚拟dom中所有的key
      const key = vChild.key;
      let child;
      if (key) {
        //如果有key找到对应key值的节点
        if (keyed[key]) {
          child = keyed[key];
          keyed[key] = undefined;
        }
      } else if (childrenLen > min) {
        //如果没有key, 优先找到相同类型的节点
        for (let j = 0; j < childrenLen; j++) {
          const c = children[j];
          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      }
      //对比
      child = diffNode(child, vChild);
      //更新dom
      const f = domChildren[i];
      if (child && child !== dom && child !== f) {
        if (!f) {
          //如果更新前的对应位置为空, 说明此节点是新增的
          dom.appendChild(child)
        } else if (child === f.nextSibling) {
          // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
          removeNode(f)
        } else {
          //将更新后的节点移动到正确位置,第一个参数是需要插入的节点对象, 第二个对象是在其之前插入新节点的子节点
          dom.insertBefore(child, f);
        }
      }

    })
  }

}

/**
 *
 * @param {*} dom 原有节点
 * @param {*} vnode 虚拟dom
 */
function diffAttribute(dom, vnode) {

  // const domAttrs = document.querySelector('#root').attributes;
  // console.log('domAttrs: ', domAttrs);
  // [...domAttrs].forEach(e => {
  //   console.log('domAttrs child: ', e, e.name, e.value);
  // })

  //保存之前dom的所有属性
  const oldAttrs = {}
  const newAttrs = vnode.attrs;
  const domAttrs = dom.attributes;
  [...domAttrs].forEach(e => {
    oldAttrs[e.name] = e.value;
  })
  // console.log('oldAttrs: ', oldAttrs);
  //比较
  //如果原有属性和新属性相比,不在新属性中,则将其移除(设置属性值undefined)
  for (const key in oldAttrs) {
    if (!(key in newAttrs)) {
      //不存在 则移除
      setAttribute(dom, key, undefined);
    }
  }
  //更新 例: class='active' => class='dis-active'
  for (const key in newAttrs) {
    if (newAttrs[key] !== oldAttrs[key]) {
      //只更值不相等的属性
      setAttribute(dom, key, newAttrs[key]);
    }
  }
}


