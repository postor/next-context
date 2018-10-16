import { Component, createContext } from 'react'
import isFunction from 'lodash.isfunction'

export default (defaultState = {}, config = {}) => {

  const { calculateChangedBits } = config
  const functions = {}
  const states = {}

  const context = createContext({}, calculateChangedBits)
  const { Provider, Consumer } = context

  Object.keys(defaultState).forEach(x => {
    if (isFunction(defaultState[x])) {
      functions[x] = defaultState[x]
      return
    }
    states[x] = defaultState[x]
  })


  class StoreComponent extends Component {
    state = states
    functions = {}

    constructor(props) {
      super(props)
      Object.keys(functions).forEach(x => {
        this.functions[x] = (...args) => {
          const state = { ...this.state }
          functions[x].apply(state, args)
          this.setState(state)
        }
      })
    }

    render() {
      return (<Provider value={{
        ...this.state,
        ...this.functions,
      }}>{this.props.children}</Provider>)
    }
  }

  return {
    context,
    Provider: StoreComponent,
    Consumer,
  }
}