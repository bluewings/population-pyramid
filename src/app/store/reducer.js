import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from '../shared/stores/app.reducer';
import recentlyUsed from '../shared/stores/recently-used.reducer';
import { reducers } from '../shared/components/ThemeDropdown/store';

const rootReducer = combineReducers({
  routing: routerReducer,
  app,
  recentlyUsed,
  theme: reducers,
});

export default rootReducer;
