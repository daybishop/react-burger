import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { Provider } from 'react-redux'
import { saveState } from './utils/local-storage';

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    constructor: store.getState().constructor,
  })
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
