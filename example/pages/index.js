import { Provider, Consumer } from '../comps/ctx1'
import Nested from '../comps/Nested'

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
  <Nested />
</Provider>)
