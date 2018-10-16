import createContext from '../src/index'

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
