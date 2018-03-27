import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import mainReducer from '../reducers/mainReducer';
import yardReducer from '../reducers/yardReducer';
import createGoalReducer from '../reducers/createGoalReducer';
import incubatorReducer from '../reducers/incubatorReducer';
import squaddieReducer from '../reducers/squaddieReducer';

const reducer = combineReducers({ // combines reducers from reducer folder
  main: mainReducer,
  yard: yardReducer,
  goals: createGoalReducer,
  incubator: incubatorReducer,
  squad: squaddieReducer,
  routing: routerReducer,
  squaddies: squaddieReducer,
});

// const router = routerMiddleware(browserHistory);
const middleware = applyMiddleware(
  thunk,
  routerMiddleware(browserHistory),
);
// creates store and allows for chrome redux plugin
const store = createStore(
  reducer,
  middleware,
);

export default store;
