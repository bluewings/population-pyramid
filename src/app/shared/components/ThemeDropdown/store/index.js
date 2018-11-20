import { Map } from 'immutable';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import { IS_APP_SENTINEL } from './constants';
import customize from './reducers';
import { setTheme } from './actions';

const actions = { setTheme };

const persistConfig = {
  transforms: [immutableTransform()],
  key: '@widgettable',
  storage,
};

const reducers = persistReducer(persistConfig, combineReducers({
  customize,
}));

const getStorePaths = (state, path = []) => {
  if (!state || (!Map.isMap(state) && typeof state !== 'object')) {
    return false;
  }
  const isMap = Map.isMap(state);
  const keys = isMap ? state.keySeq().toArray() : Object.keys(state);
  if (keys.indexOf(IS_APP_SENTINEL) !== -1) {
    return path;  
  }
  return keys.reduce((prev, key) => 
    (prev || getStorePaths(isMap ? state.get(key) : state[key], [...path, key])), false);
};

export default {
  actions,
  reducers,
  getStorePaths,
};

export {
  actions,
  reducers,
  getStorePaths,
};
