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

export default () => (<Provider>
  <Consumer>{({ data, methods }) => {
    return (<p>
      <button onClick={methods.sub}>-</button>
      <span>{data.count}</span>
      <button onClick={methods.add}>+</button>
    </p>)
  }}</Consumer>
  <p>refresh and data will persist|刷新后数据会保持</p>
</Provider>)
