# react-context-store

use new context api as store

## features

- simple store (methods only allowed in top level)
- persist data after reload (if you want)

## basic useage

```
import createContext from 'react-context-store'

const { Provider, Consumer } = createContext({
  count: 0,
  add: function () {
    this.count++
  }, sub: function () {
    this.count--
  }
})

export default () => (<Provider>
  <Consumer>{({ count, add, sub }) => {
    return (<p>
      <a onClick={sub}>-</a>
      <span>{count}</span>
      <a onClick={add}>+</a>
    </p>)
  }}</Consumer>
</Provider>)

```

## advanced

### persist store data



### use `calculateChangedBits` and `unstable_observedBits`