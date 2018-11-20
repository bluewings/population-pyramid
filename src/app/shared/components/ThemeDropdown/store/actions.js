import { createAction } from 'redux-actions';
import {
  SET_COLUMN_SET,
  REMOVE_COLUMN_SET,
  SELECT_COLUMN_SET,
  SET_COLUMN_WIDTH,
  CLEAR_COLUMN_WIDTH,
  SET_THEME,
} from './action-types';

// export const setColumns = createAction(
//   SET_COLUMNS,
//   columns => ({ columns }),
// );

export const setColumnSet = createAction(
  SET_COLUMN_SET,
  ({
    namespace, id, name, columns, language, 
  }) => ({
    namespace, id, name, columns, language, 
  }),
);

export const removeColumnSet = createAction(
  REMOVE_COLUMN_SET,
  ({ namespace, id }) => ({ namespace, id }),
);

export const selectColumnSet = createAction(
  SELECT_COLUMN_SET,
  ({ namespace, id }) => ({ namespace, id }),
);

export const setColumnWidth = createAction(
  SET_COLUMN_WIDTH,
  ({ namespace, name, width }) => ({ namespace, name, width }),
);

export const clearColumnWidth = createAction(
  CLEAR_COLUMN_WIDTH,
  ({ namespace }) => ({ namespace }),
);

export const setTheme = createAction(
  SET_THEME, 
  theme => ({ theme }),
);

// export const setColumns = createAction(SET_COLUMNS,
//   columns => ({ columns }));

// export const setColumnSet = createAction(SET_COLUMN_SET,
//   ({ namespace, id, name, columns, language }) => ({ namespace, id, name, columns, language }));


// export const removeColumnSet = createAction(REMOVE_COLUMN_SET,
//   ({ namespace, id }) => ({ namespace, id }));

// export const selectColumnSet = createAction(SELECT_COLUMN_SET,
//   ({ namespace, id }) => ({ namespace, id }));

// export const setColumnWidth = createAction(SET_COLUMN_WIDTH,
//   ({ namespace, name, width }) => ({ namespace, name, width }));

// export const clearColumnWidth = createAction(CLEAR_COLUMN_WIDTH,
//   ({ namespace }) => ({ namespace }));
