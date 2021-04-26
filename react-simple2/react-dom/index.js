const ReactDOM = {
  render,
}

function render(vnode, container) {
  if (vnode === undefined) return;
  if (typeof vnode === 'string') {
    //创建文本节点
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }
  //否则就是一个虚拟dom对象
  const { tag, attrs, childrens } = vnode;
  const dom = document.createElement(tag);

  if (attrs) {
    //有属性
    Object.keys(attrs).forEach(e => {
      const value = attrs[e];
      setAttribute(dom, e, value);
    })
  }

  //渲染子节点
  childrens.forEach(e => {
    render(e, dom);
  })

  return container.appendChild(dom);
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
    key = key.toLowerCase();
    dom[key] = value || '';
  }

  if (key === 'style') {
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
  }

  //其他属性
  if(key in dom) {
    dom[key] = value || '';
  }

  if (value) {
    //更新值
    dom.setAttribute(key, value);
  } else {
    dom.removeAttribute(key, value)
  }

}

export default ReactDOM;
