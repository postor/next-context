import { Consumer } from '../comps/ctx1'

export default () => (<Consumer>{({ data, dispatch }) => {
  return (<p>
    <span>second consumer, with reducer</span>
    <hr />
    <button onClick={() => dispatch({ type: 'half' })}>/2</button>
    <span>{data.count}</span>
    <button onClick={() => dispatch({ type: 'double' })}>*2</button>
  </p>)
}}</Consumer>)
