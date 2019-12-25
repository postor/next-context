import createContext from 'next-context-store'

export const { Provider, Consumer } = createContext({
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


