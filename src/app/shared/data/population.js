import entries from 'object.entries';
import principal from './population.principal.json';
import high from './population.high.json';
import low from './population.low.json';

function sortAgeDesc(a, b) {
  if (a.age === b.age) {
    return 0;
  }
  return a.age > b.age ? 1 : -1;
}

function refineData(all) {
  return entries(all).reduce((prev, [year, data]) => {
    const { total, accumulate, max } = data.reduce(
      ({ total, accumulate, max }, { age, men: men, women: women }) => {
        const all = men + women;
        return {
          accumulate: {
            all: accumulate.all + age * all,
            men: accumulate.men + age * men,
            women: accumulate.women + age * women,
          },
          total: {
            all: total.all + all,
            men: total.men + men,
            women: total.women + women,
          },
          max: {
            all: max.all > all ? max.all : all,
            men: max.men > men ? max.men : men,
            women: max.women > women ? max.women : women,
          },
        };
      },
      {
        accumulate: { all: 0, men: 0, women: 0 },
        total: { all: 0, men: 0, women: 0 },
        max: { all: 0, men: 0, women: 0 },
      },
    );
  
    return {
      ...prev,
      [year]: {
        data: data.sort(sortAgeDesc),
        total,
        max,
        average: {
          all: Math.round((accumulate.all / total.all + 0.5) * 10) / 10,
          men: Math.round((accumulate.men / total.men + 0.5) * 10) / 10,
          women: Math.round((accumulate.women / total.women + 0.5) * 10) / 10,
        },
      },
    };
  }, {});
}

export default {
  principal: refineData(principal),
  high: refineData({ ...principal, ...high, }),
  low: refineData({ ...principal, ...low, }),
}
