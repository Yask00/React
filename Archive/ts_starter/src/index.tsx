import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';
// languageName: string;
// enthusiasmLevel: number;
import './index.css';


const store = createStore<StoreState>(enthusiasm,  {
  enthusiasmLevel: 10,
  languageName: 'TypeScript',
},compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
