import { createAction } from 'redux-actions';
import {
  SET_THEME,
  REMOVE_ITEM,
  CLEAR,
} from './theme-dropdown.store.action-type';

// export const setTheme = createAction(
//   SET_THEME,
//   (namespace, item, count) => ({ namespace, item, count }),
// );
export const setTheme = createAction(
  SET_THEME, 
  theme => ({ theme }),
);

export const removeItem = createAction(
  REMOVE_ITEM,
  (namespace, item) => ({ namespace, item }),
);

export const clear = createAction(CLEAR, namespace => ({ namespace }));
