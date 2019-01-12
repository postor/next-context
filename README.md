# next-context-store

use new context api as store | 使用新的context api做数据仓库

- react-redux is still using old context api | react-redux 还在使用旧的context api
- new context api is rather an injector than store | 相比store新的context api更像是一个injector，作为store使用并不方便

so I start this | 所以我开始了这个项目

## features | 特性

- simple store | 简单的数据仓库
- persist data after page reload (if you want) | 在页面刷新之后保持store的状态

## basic useage | 基础使用

```
import createContext from 'next-context-store'

const { Provider, Consumer } = createContext({
  data: { count: 0 }, // data or function that returns data | 仓库数据，或者返回仓库数据的函数
  methods: {  //methods or store action | 方法，或者称为action
    add: function () {
      this.count++  // this will bind to the data object | this会绑定到data对象上
    },
    sub: function () {
      this.count--
    },
  },
})

// Provider is not a react context Provider, it takes none prop | Provider并不是react的context provider，它不接受任何prop
// Consumer is a react context Consumer | Consumer则就是react的context consumer
export default () => (<Provider>
  <Consumer>{({ data, methods }) => {
    return (<p>
      <button onClick={methods.sub}>-</button>
      <span>{data.count}</span>
      <button onClick={methods.add}>+</button>
    </p>)
  }}</Consumer>
</Provider>)

```

start: yarn dev

visit: http://localhost:3000/

code: [./pages/index.js](./pages/index.js)

**notice** method defined in methods should not define with arrow function (binding issue) | methods中定义的方法请不要使用箭头函数定义（影响绑定）

## advanced | 高级用法

### persist store data | 保持数据

mostly designed for next.js | 主要是给next.js设计的，保持页面切换后数据的一致

```
import { default as createContext, AdapterLocalStorage } from '../src/index'

const { Provider, Consumer } = createContext({
  data: { count: 0 },
  methods: {
    add: function () {
      this.count++
    },
    sub: function () {
      this.count--
    },
  },
  persist: new AdapterLocalStorage('testkey'),
})
```
start: yarn dev

visit: http://localhost:3000/persist

code: [./pages/persist.js](./pages/persist.js)


### `calculateChangedBits` and `unstable_observedBits`

this is for performance but still I suggest using small stores instead, for it's difficult to understand and still unstable | 这是为了性能，但我仍然推荐使用小的store来分离你的业务而避免使用calculateChangedBits，因为使用calculateChangedBits的代码难以理解而且unstable_observedBits官方api还可能会变更

```
const { Provider, Consumer } = createContext({
  data: { count: 0 },
  methods: {
    add: function () {
      this.count++
    },
    sub: function () {
      this.count--
    },
  },
  calculateChangedBits: (currentValue, nextValue) => {
    const changedBits = nextValue.data.count % 2 === 0 ? 0b10 : 0b1
    return changedBits
  }
})

export default () => (<Provider>
  <Consumer unstable_observedBits={0b11}>{({ data, methods }) => {
    return (<p>
      <button onClick={methods.sub}>-</button>
      <span>{data.count}</span>
      <button onClick={methods.add}>+</button>
    </p>)
  }}</Consumer>

  <Consumer unstable_observedBits={0b1}>{({ data }) => {
    return (<p>count={data.count}, rerender only when count is odd</p>)
  }}</Consumer>

  <Consumer unstable_observedBits={0b10}>{({ data }) => {
    return (<p>count={data.count}, rerender only when count is even</p>)
  }}</Consumer>

</Provider>)
```

start: yarn dev

visit: http://localhost:3000/changedbits

code: [./pages/changedbits.js](./pages/changedbits.js)
