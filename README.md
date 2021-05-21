# react-source-code-parsing
react 源码解析

## 1.对react的理解
### 1.1	react是什么?
  - React是一个用于构建用户界面的JavaScript库
### 1.2	react能干什么?
  - 可以通过组件化的方式构建快速响应的大型web应用程序
### 1.3	react是如何做的?
#### 1.3.1	声明式
- 声明式 使用声明式编写用户界面,代码可以方便调试
- 声明式渲染和命令式渲染
  - 声明式渲染 我们只要告诉程序我们需要什么效果,其他的交给程序来做
  - 命令式渲染 命令我们的程序去做什么,程序就会跟着你的命令去一步一步执行

```js
let root = document.getElementById('root');

//声明式渲染
ReactDOM.render(<div>test</div>, root);

//命令式渲染
let h1 =document.createElement('h1');
h1.innerHTML = 'test1';
h1.addEventListener('click', () => console.log('h1'));
root.appendChild(h1);
```
#### 1.3.2 组件化
- 组件化 把页面拆分成为一个个组件,方便视图的拆分和复用,还可以做到高内聚和低耦合

### 1.4 react的优缺点
- 优点
  - 开发团队和社区强大
  - 一次学习,随处编写
  - api比较整洁
- 缺点
  - 没有官方系统的解决方案,选型成本高
  - 过于灵活,不容易写出高质量的应用

## 2. react引入jsx
### 2.1 jsx是什么
- jsx是一个 JavaScript 的语法扩展, JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式
- jsx其实就是 React.createElement 的语法糖
### 2.2 react想实现的目的是什么?
- 需要实现声明式
- 代码结构需要非常清晰和简洁,可读性强
- 结构,样式,事件能够实现高聚合低耦合,方便重用和组合
- 不想引入新的概念和语法,只写JavaScript
### 2.3 jsx好处
#### 2.3.1 模板(语法)
- vue 使用了基于html的模板语法
- angular引入了控制器,作用域,服务等概念
### 2.4 jsx工作原理
- babel
- astexplorer
#### 2.4.1 安装
```js
npm i @babel/core @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx @babel/types --save-dev
```
#### 2.4.2 AST抽象语法树
- 抽象语法树(Abstract Syntax Tree, AST) 是源代码语法结构的一种抽象表示.它以树状的形式表现编程语言的语法结构,树上的每个节点都表示源代码中的一种结构.

![avatar](https://upload-images.jianshu.io/upload_images/6383319-b70c4cc018199852.png?imageMogr2/auto-orient/strip|imageView2/2/w/678/format/webp)

    AST 描述语法的
    vnode 描述界面的样子(用对象描述dom元素)

#### 2.4.3 babel 工作流

![avatar](https://note.youdao.com/yws/api/personal/file/WEB0b53bbcf42e1cf2defc3ad8cad796355?method=download&shareKey=f9d98d7e33af9c3bfdc6a2c905b0db19)

## 3.对Virtual DOM的理解

React.createElement 函数返回的就是一个虚拟DOM

虚拟DOM是一个描述真实DOM的纯js对象

### 3.1 优缺点

### 3.1.1 优点

- 处理了浏览器兼容性问题,避免用户操作真实dom,那么又麻烦又容易出错
- 内容经过了XSS处理,可以防范XSS攻击
- 容易实现跨平台开发Android Ios VR等应用
- 更新的时候可以实现差异化更新,减少更新dom的操作

简单的说就是: 跨平台 增量更新 处理兼容性问题

#### 3.1.2 缺点

- 虚拟dom需要消耗额外的内存
- 首次渲染其实并不一定会更快

    vnode渲染成真实dom后,占用的内存会释放.

## 4.函数组件和类组件

组件允许你将UI拆分为独立可复用的代码片段,并对每个片段进行独立的构思

### 4.1.1 相同点

- 都可以接受属性并且返回React元素

### 4.1.2 不同点

- 编程思想不同: 类组件需要创建实例,是基于面向对象的方式编程;而函数式组件不需要创建实例,接收输入,返回输出,是基于函数式编程的思想
- 内存占用: 类组件需要创建并保存实例,会占用一定内存,函数组件不需要创建实例,可以节约内存占用
- 捕获特性: 函数组件具有值捕获特性
- 可测试性: 函数式组件更方便编写单元测试
- 状态: 类组件有自己的实例,可以定义状态,还可以修改状态更新组件,函数式组件以前没有状态,现在可以使用useState使用状态
- 生命周期: 类组件有完整的生命周期, 函数组件以前没用,现在有useEffect来实现类似生命周期的功能
- 逻辑复用: 类组件可以通过继承实现逻辑复用,但官方推荐组件优于继承,函数组件可以通过自定义Hooks实现逻辑复用
- 跳过更新: 类组件: shouldComponentUpdate和PureComponent, 函数式组件: React.memo 来实现跳过更新
- 发展前景
