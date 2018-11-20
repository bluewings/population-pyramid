/* eslint-disable no-restricted-globals */
import { Map, List } from 'immutable';
// import entries from 'object.entries';
// import stringify from 'json-stable-stringify';
import { IS_APP_SENTINEL } from './constants';
import themes from '../themes';
import {
  SET_COLUMN_SET,
  REMOVE_COLUMN_SET,
  SELECT_COLUMN_SET,
  SET_COLUMN_WIDTH,
  CLEAR_COLUMN_WIDTH,
  SET_THEME,
} from './action-types';

const initialState = Map({
  [IS_APP_SENTINEL]: true,
  columnSetId: Map(),
  columnSets: Map(),
  columnWidths: Map(),
  theme: themes[0].name,
});

const getSuggestedName = (name = '', names = List(), language) => {
  let trimmed = name.trim();
  const defaults = {
    'en-US': 'Custom',
    'ko-KR': '사용자 지정',
    'ja-JP': 'カスタム',
  };
  if (!trimmed) {
    trimmed = defaults[language] || defaults['en-US'];
  }
  if (names.indexOf(trimmed) !== -1) {
    const indexes = [
      ...names.filter(e => e.indexOf(trimmed) === 0)
        .map(e => parseInt(e.replace(trimmed, ''), 10))
        .filter(e => !isNaN(e)),
      0,
    ];
    const max = Math.max(...indexes);
    trimmed = `${trimmed} ${max + 1}`;
  }
  return trimmed;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME: {
      const { theme } = payload;
      console.log(theme);
      return state.set('theme', theme);
    }

    case SET_COLUMN_SET: {
      const {
        namespace, id, name, columns, language, 
      } = payload;
      let nextState = state;
      const items = nextState.getIn(['columnSets', namespace], List());
      const index = items.findIndex(e => e.get('id') === id);
      const names = items.filter((e, i) => i !== index).map(e => e.get('name'));
      const suggestedName = getSuggestedName(name, names, language);
      if (index !== -1) {
        nextState = nextState.setIn(['columnSets', namespace, index], Map({
          id, name: suggestedName, columns,
        }));
      } else {
        const newId = Math.random().toString(36).substr(-6);
        nextState = nextState.setIn(['columnSets', namespace], items.push(Map({
          id: newId, name: suggestedName, columns,
        })));
        nextState = nextState.setIn(['columnSetId', namespace], newId);
      }
      return nextState;
    }

    case REMOVE_COLUMN_SET: {
      const { namespace, id } = payload;
      const columnSetId = state.getIn(['columnSetId', namespace]);
      const items = state.getIn(['columnSets', namespace], List());
      const index = items.findIndex(e => e.get('id') === id);
      if (index === -1) {
        return state;
      } 
      let nextState = state;
      nextState = nextState.setIn(['columnSets', namespace], items.delete(index));
      if (id && id === columnSetId) {
        nextState = nextState.deleteIn(['columnSetId', namespace]);
      }
      return nextState;
    }

    case SELECT_COLUMN_SET: {
      const { namespace, id } = payload;
      if (id.search(/^@/) === -1) {
        const items = state.getIn(['columnSets', namespace], []);
        const index = items.findIndex(e => e.get('id') === id);
        if (index === -1) {
          return state;
        }
      }
      return state.setIn(['columnSetId', namespace], id);
    }

    case SET_COLUMN_WIDTH: {
      const { namespace, name, width } = payload;
      return state.setIn(['columnWidths', namespace, name], width);
    }

    case CLEAR_COLUMN_WIDTH: {
      const { namespace } = payload;
      return state.deleteIn(['columnWidths', namespace]);
    }

    default:
      return state;
  }
};
