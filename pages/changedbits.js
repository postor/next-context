import createContext from '../src/index'

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
