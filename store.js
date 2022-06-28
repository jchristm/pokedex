import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { compose } from 'recompose';
import thunk from 'redux-thunk';


import rootReducer from  './src/rootReducer';

const configureStore = (extraArgument) => {
  const middleware = [thunk.withExtraArgument(extraArgument)];
  const enhancers = compose(
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );

  return createStore(rootReducer, undefined, enhancers);
};


export default configureStore;
