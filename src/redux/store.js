import {Provider} from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const DataProvider = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
