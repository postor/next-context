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
  reducer: (state, action = {}) => {
    const { type = 'double' } = action
    switch (type) {
      case 'double': return {
        ...state,
        count: state.count * 2
      }
      case 'half': return {
        ...state,
        count: state.count / 2
      }
    }
  }
})

export default () => (<Provider>
  <Consumer>{({ data, methods }) => {
    return (<p>
      <span>first consumer, with methods</span>
      <hr />
      <button onClick={methods.sub}>-</button>
      <span>{data.count}</span>
      <button onClick={methods.add}>+</button>
    </p>)
  }}</Consumer>
  <Consumer>{({ data, dispatch }) => {
    return (<p>
      <span>second consumer, with reducer</span>
      <hr />
      <button onClick={() => dispatch({ type: 'half' })}>/2</button>
      <span>{data.count}</span>
      <button onClick={() => dispatch({ type: 'double' })}>*2</button>
    </p>)
  }}</Consumer>
</Provider>)
