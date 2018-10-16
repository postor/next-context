# react-context-store

use new context api as store

## features

- simple store
- persist data after reload (if you want)

## useage

```
iimport { createContext } from 'react-context-store'

const { Provider, Consumer } = createContext({
  count: 0,
  add: function () {
    this.count++
  }
})

export default (<Provider>
  <Consumer>{({ count, add }) => {
    return (<p>
      <span>{count}</span>
      <a onClick={add}>+</a>
    </p>)
  }}</Consumer>
</Provider>)

```
