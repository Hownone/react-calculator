# React

**特性1**：`React`为了方便维护页面，会在内存里虚拟地构建一棵此页面的`DOM`树。

**特性2**：`React`是数据驱动的，当我们某一个元素里的数据发生变化后，`React`会将有可能修改的元素都修改一遍。即`React`会先在内存里的虚拟`DOM`树中将可能会改变的元素都修改一遍，改变完后会跟真实的`DOM`树作对比，看看有没有区别，若有则会在真实的`DOM`树中改变相应的元素结点。这也是`React`效率较快的原因之一。

> 虚拟的`DOM`树是存在内存里的，真实的`DOM`树是浏览器页面里的。`React`实际上是维护一个虚拟的`DOM`树。

 **`JSX`**：`React`中的一种语言，会被[Babel](https://babeljs.io/repl/)编译成标准`JavaScript`。可以使得在`JavaScript`里面支持`XML`(标签语言)。

## 前期准备

1. 安装`Git Bash`

   [安装地址](https://gitforwindows.org/)

2. 安装`Nodejs`

   [安装地址](https://nodejs.org/en/)

3. 安装`create-react-app`

   打开`Git Bash`，执行：

   ```bash
   npm i -g create-react-app
   ```

4. 安装`VSCode`插件

   * `Simple React Snippets`

   * `Pretter - Code formatter`

5. 创建`React APP`

   在目标目录下打开`Git Bash`，在终端中执行：

   ```bash
   create-react-app react-app  # 可以替换为其他app名称
   
   cd react-app
   npm start  # 启动应用
   ```

   

## `React`项目结构

`node_modules`文件夹里存放着别人写好的轮子即`JS`文件，我们未来安装的依赖都会在这个文件夹里。

`public`文件夹里的`index.html`是我们当前渲染出来的页面

`src`文件夹里的`index.js`负责控制`index.html`里的标签属性，同时可以引用外部的`js`文件

## ES6语法

使用`bind()`函数绑定`this`取值

在`JavaScript`中，函数里的`this`指向的是执行时的调用者，而非定义时所在的对象。

例如：

```javascript
const person = {
  name: "yxc",
  talk: function() {
    console.log(this);
  }
}

person.talk();

const talk = person.talk;
talk();
```

运行结果：

```javascript
{name: 'yxc', talk: ƒ}
Window
```

第二次`talk()`是默认`window`调用的，所以输出的`this`结果是`window`

> 注意：箭头函数没有`this`，箭头函数的`this`是继承父执行上下文里面的`this `(上下文可以感性理解为函数之类的,简单对象（非函数）是没有执行上下文的！)，如果将上述`function`写成箭头函数，则输出的都是`{}` (严格模式`strict`)

`bind()`函数，可以绑定`this`的取值。例如：

```javascript
const talk = person.talk.bind(person);
```

运行结果：

```javascript
{name: 'yxc', talk: ƒ}
```

箭头函数不重新绑定`this`的取值(即使尝试用`call`改变其属性，也不会改变，因为它是继承父执行上下文里的`this`的)

```javascript
const person = {
  talk: function() {
    setTimeout(function() {
      console.log(this);
    }, 1000);
  }
};

person.talk();  // 输出Window
```

```javascript
const person = {
  talk: function() {
    setTimeout(() => {
      console.log(this);
    }, 1000);
  }
};

person.talk();  // 输出 {talk: f}
```

>  注意，网上很多资料都说当箭头函数是被`window`包含时`this`输出的是`window`，`this.属性名`输出的是用`var`定义在外部的`window.属性名`,但经过实操，实际上输出的是一个空集合`{}`，`undefined`

**对象的解构**

```javascript
const person = {
  name: "yxc",
  age: 18,
  height: 180,
};

const {name : nm, age} = person;  // nm是name的别名
```

**数组和对象的展开**

```javascript
let a = [1, 2, 3];
let b = [...a];  // b是a的复制（深拷贝）
//b = a //这种写法是浅拷贝，b变的时候，a也会变，深拷贝则不会
let c = [...a, 4, 5, 6];

const a = {name: "yxc"};
const b = {age: 18};
const c = {...a, ...b, height: 180};
```

**`Named` 与 `Default exports`**

- `Named Export`：可以`export`多个，`import`的时候需要加大括号，名称需要匹配
- `Default Export`：最多`export`一个，`import`的时候不需要加大括号，可以直接定义别名

`Player.js`

```javascript
class Player {
    constructor() {
        console.log("new Player");
    }
}

export {
    Player,
}
```

上面可以简写成

```javascript
export class Player {
    constructor() {
        console.log("new Player");
    }
}
```



在`index.js`里面引用`Player`

```javascript
import { Player } from "./player";
```

**`default export`写法**

`Player.js`

```javascript
export default class Player {
    constructor() {
        console.log("new Player");
    }
}
```

则`index.js`里引用时，不用加`{}`,且可以随便改名（下面的`Player`可以随便改名，因为所有`js`文件的`default`指定都是唯一的）

```javascript
import  Player  from "./player";
//import Myplayer from "./player";与上面是等价的
```

`default`和普通的`export`可以混合着写，只需要记住普通的`export`需要加`{}`，如下所示：

```javascript
import Myplayer , {id} from "./player"
```

普通的`export`也可以改名（添加`as`），如下所示：

```javascript
import Myplayer , {id as id2} from "./player"
```

## Components

##### 安装`bootstrap`库

在新项目`box-app`（新建过程与上文一样）的`Terminal`中输入：	

```shell
npm i bootstrap
```

##### 在项目中引入`bootstrap`

`/src/index.js`

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

##### 创建Component

在`src`文件夹下创建`components`目录用来存放所有的`component`组件

在`components`目录下，新建`box.jsx`

**Tips:**

- `Vscode`装了插件后可以直接按快捷键`imrc`进行语句补全,将`React`与`Component`模块引入进来。
- 快捷键`cc`可以定义一个类组件`class xxx extends Component`

如下所示：

```jsx
import React, { Component } from 'react';


class Box extends Component {
    state = {  }  //局部变量
    render() {  //用来返回当前组件渲染的html结构
        return <h1>Hello world</h1>;
    }
}
 
export default Box;
```

在`/src/index.js`里将我们刚刚写的组件引入进来

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import Box from './components/box';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Box />
  </React.StrictMode>
);

```



##### 创建按钮

当子节点数量大于1时，可以用`<div>`或`<React.Fragment>`将其括起来。

`/src/box.jsx:`

```jsx
import React, { Component } from 'react';


class Box extends Component {
    state = {  }  //局部变量
    render() {  //用来返回当前组件渲染的html结构
        return (
            <React.Fragment> //虚拟元素,在实际上是不渲染出来的，只是为了合乎语法
                <h1>Hello world</h1>
                <button>left</button>
                <button>right</button>
            </React.Fragment>);
    }
}
 
export default Box;
```

##### 内嵌表达式

`JSX`中使用`{}`嵌入表达式。(逻辑类似于之前在字符串里用`${}`嵌入表达式) `JSX`可以在任何地方内嵌`HTML`元素



#####  设置属性

- `class -> className`

- `CSS`属性：`background-color -> backgroundColor`，其它属性类似(凡是用`-`隔开的属性名，都改成驼峰命名法)

- 可以有两种引入`CSS`样式的写法

  ```jsx
  styles = {
          width: "50px",
          height: "50px",
          backgroundColor: "lightblue",
          textAlign: "center",
          lineHeight: "50px",
          borderRadius: "5px",
       }
  ...
  			<React.Fragment> 
                  <div style={this.styles}>{this.toString()}</div>
                  ...
              </React.Fragment>);
  /////////////////////////////////////
  或者：
  			<React.Fragment> 
                  <div style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "lightblue",
                          textAlign: "center",
                          lineHeight: "50px",
                          borderRadius: "5px",
                       }}>{this.toString()}</div>
                  ...
              </React.Fragment>);
  
  ```

  

##### 数据驱动改变`Style`

可以编写函数并且用局部变量控制`CSS`的样式属性值

##### 渲染列表

* 使用`map`函数

* 每个元素需要具有唯一的`key`属性，用来帮助`React`快速找到被修改的`DOM`元素。

  ```jsx
      state = { 
          x: 1,
          colors: ['red','green','blue'],
       }  
       ...
      render() {  //用来返回当前组件渲染的html结构
          return (
              //React.Fragment: 虚拟元素,在实际上是不渲染出来的，只是为了合乎语法
               <React.Fragment> 
                  <div style={this.getStyles()}>{this.toString()}</div>
                  <button className='btn btn-success m-2'>left</button>
                  <button className='btn btn-primary m-2'>right</button>
                  {this.state.colors.map(color => (
                      <div key={color}>{color}</div> 注意这里map后面要是接div的话要用()而不是{}
                  ))}
              </React.Fragment>);
      }
  ```

  



##### Conditional Rendering

利用逻辑表达式的短路原则。

```shell
与表达式中 expr1 && expr2，当expr1为假时返回expr1的值，否则返回expr2的值
或表达式中 expr1 || expr2，当expr1为真时返回expr1的值，否则返回expr2的值
```

##### 绑定事件

注意妥善处理好绑定事件函数的`this`(可用箭头函数或者`bind`绑定当前的类)

绑定的是函数，而不是函数的处理结果，所以不用加`()`

```jsx
 
   handleClickLeft = () => {
        console.log("clickLeft",this);
    }

    handleClickRight() {
        console.log("clickRight",this);
    }

...
<button onClick={this.handleClickLeft} className='btn btn-success m-2'>left</button>
<button onClick={this.handleClickRight.bind(this)} className='btn btn-primary m-2'>right</button>
```

##### 修改state

* 需要使用`this.setState()`函数(不调用的话`render()`函数不会记录并渲染出来)
* 每次调用`this.setState()`函数后，会重新调用`this.render()`函数，用来修改虚拟`DOM`树。`React`只会修改不同步的实际`DOM`树节点。

##### 给事件函数添加参数

定义一个临时函数，然后事件绑定这个临时函数，然后再在临时函数里面调用真正需要调用的事件函数（~~怎么这么zz。。~~

```jsx
    handleClickLeft = (step) => {
        //想让这里的state里的变量变化影响render函数的话就要调用setState，从而调用render函数
        this.setState({
            x: this.state.x - step,
        });
        console.log("clickLeft");
    }

    handleClickLeftTmp = () => {
        return this.handleClickLeft(10);
    }
    
    ...
    <button onClick={this.handleClickLeftTmp} className='btn btn-success m-2'>left</button>
    可简写成下面这样的箭头函数：
    <button onClick={() => this.handleClickLeft(10)} className='btn btn-success m-2'>left</button>
```

##### 汇总

`/src/components/box.jsx`:

```jsx
import React, { Component } from 'react';


class Box extends Component {
    state = { 
        x: 1,
        colors: ['red','green','blue'],
     }  //局部变量

    //  styles = {
    //     width: "50px",
    //     height: "50px",
    //     backgroundColor: "lightblue",
    //     textAlign: "center",
    //     lineHeight: "50px",
    //     borderRadius: "5px",
    //  }

    handleClickLeft = (step) => {
        //想让这里的state里的变量变化影响render函数的话就要调用setState，从而调用render函数
        this.setState({
            x: this.state.x - step,
        });
        console.log("clickLeft");
    }

    handleClickLeftTmp = () => {
        return this.handleClickLeft(10);
    }

    handleClickRight = step => {
        this.setState({
            x: this.state.x + step,
        })
        console.log("clickRight");
    }

    render() {  //用来返回当前组件渲染的html结构
        return (
            //React.Fragment: 虚拟元素,在实际上是不渲染出来的，只是为了合乎语法
             <React.Fragment> 
                <div style={this.getStyles()}>{this.toString()}</div>
                <button onClick={() => this.handleClickLeft(10)} className='btn btn-success m-2'>left</button>
                <button onClick={() => this.handleClickRight(10)} className='btn btn-primary m-2'>right</button>
                {this.state.colors.map(color => (
                    <div key={color}>{color}</div>
                ))}
            </React.Fragment>);
    }

    getStyles() {
        let styles = {
            width: "50px",
            height: "50px",
            backgroundColor: "lightblue",
            textAlign: "center",
            lineHeight: "50px",
            borderRadius: "5px",
            marginLeft: this.state.x,
        }

        if (this.state.x === 0) {
            styles.backgroundColor = 'orange';
        }
        return styles;
    }

    toString() {
        const {x} = this.state;  //解构函数
        return `x: ${x}`;
        
    }
}
 
export default Box;
```

