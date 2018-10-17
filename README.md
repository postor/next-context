# react-context-store

use new context api as store

## features

- simple store (methods only allowed in top level)
- persist data after reload (if you want)

## basic useage

```
import createContext from 'react-context-store'

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
})

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

## advanced

### persist store data

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


### use `calculateChangedBits` and `unstable_observedBits`