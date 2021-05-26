import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { userReducer } from './reducers/user.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    userModule: userReducer,
    toyModule: toyReducer
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

