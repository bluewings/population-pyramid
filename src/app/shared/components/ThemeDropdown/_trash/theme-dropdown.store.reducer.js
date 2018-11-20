import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import { Map, List } from 'immutable';
import {
  SET_THEME,
  REMOVE_ITEM,
} from './theme-dropdown.store.action-type';

const initialState = Map({
  theme: '',
});

const maxCount = 3;

const reducer = (state, { type, payload = {} }) => {
  switch (type) {
    case SET_THEME: {
      const { theme } = payload;
      console.log(theme);
      return state.set('theme', theme);
    }

    // case SET_THEME: {
    //   const { item, count } = payload;
    //   return state.filter(e => e !== item).unshift(item).slice(0, count || maxCount);
    // }
    case REMOVE_ITEM: {
      return state;
      // const { key, value } = payload;
      // return state.set(key, value);
    }
    default:
      return state;
  }
};

const persistConfig = {
  transforms: [immutableTransform()],
  key: '@theme',
  storage,
};

export default persistReducer(persistConfig, combineReducers({
  stored: (rootState = initialState, action) => {

    return reducer(rootState, action);
    // const { payload = {} } = action;
    // const { namespace } = payload;
    // if (!namespace) {
    //   return rootState;
    // }
    // return rootState.set(namespace, reducer(rootState.get(namespace, List()), action));
  },
}));
