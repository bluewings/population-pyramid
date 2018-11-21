import React, { Fragment, PureComponent } from 'react';

import entries from 'object.entries';
import memoizeOne from 'memoize-one';
import imgSrc from './sample2.png';
import al1 from 'data/population';
import template from './pyramid.component.pug';

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CONSTANT = {
  WIDTH: 930,
  HEIGHT: 930,
  MARGIN: 80,
  BAR_HEIGHT: 5,
}

CONSTANT.HEIGHT = CONSTANT.MARGIN * 2 + CONSTANT.BAR_HEIGHT * 100 + 300;

const viewBox = [0, 0, CONSTANT.WIDTH, CONSTANT.HEIGHT].join(' ');

// var height = 1000;

const alData = al1.low;

var inner = {
  top: CONSTANT.MARGIN,
  left: CONSTANT.MARGIN,
  right: CONSTANT.WIDTH - CONSTANT.MARGIN,
  bottom: CONSTANT.MARGIN + CONSTANT.BAR_HEIGHT * 100,
};

let paths = {
  yAxis1: [

    [inner.left, inner.top],
    [inner.left, inner.bottom],
  ],
  yAxis2: [

    [inner.right, inner.top],
    [inner.right, inner.bottom],
  ],
  xAxis1: [

    [inner.left, inner.top],
    [inner.right, inner.top],
  ],
  xAxis2: [

    [inner.left, inner.bottom],
    [inner.right, inner.bottom],
  ],
};
paths = entries(paths).map(([name, value]) => {
  return {
    name,
    d: value
      .map(([x, y], i) => {
        return (i === 0 ? 'M' : 'L ') + x + ' ' + y;
      })
      .join(' '),
  };
});

var gens = [
  {
    from: 1954,
    name: '베이비부머',
  },
  {
    from: 1963,
    name: '386 세대',
  },
  {
    from: 1970,
    name: 'X 세대',
  },
  {
    from: 1980,
    name: '에코',
  },
  {
    from: 1990,
    name: 'N GEN',
  },
  {
    from: 1995,
    name: 'M GEN',
  },
];

const getValue = maxCount => {
  var tV1 = Math.pow(10, maxCount.toString().length - 1);
  var _maxCount = Math.ceil(maxCount / tV1) * tV1;

  var divide = 0;
  if (_maxCount % 3 === 0) {
    divide = 3;
  } else if (_maxCount % 4 === 0) {
    divide = 4;
  } else if (_maxCount % 4 === 0) {
    divide = 5;
  }
  return {
    _maxCount,
    divide,
  };
};

class Pyramid extends PureComponent {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {

    };

    this.curr = props.year || 1960;
    
  }

  censusData = memoizeOne((width, height) => {
    var gap = 0;
    
    let chartHeight = CONSTANT.MARGIN + CONSTANT.BAR_HEIGHT * 100;
    var centerBoxW = 180;
    
    let center = CONSTANT.WIDTH / 2;

    if (CONSTANT.BAR_HEIGHT - gap < 3) {
      gap = CONSTANT.BAR_HEIGHT - 3;
    }

    const maxCount = Math.max(
      ...entries(alData).reduce((prev, [, { max }]) => {
        return [...prev, max.men, max.women];
      }, []),
    );

    this.maxCount = maxCount;

    this._maxCount = getValue(maxCount);

    center = CONSTANT.WIDTH / 2;
    var halfW = center - inner.left - centerBoxW / 2;

    var widthWeight = halfW / this._maxCount._maxCount;

    var womenX = center + centerBoxW / 2;
    var menX = center - centerBoxW / 2;

    var xALW = menX - inner.left;
    var xALEach = xALW / this._maxCount.divide;
    var xEachCnt = this._maxCount._maxCount / this._maxCount.divide / 1000;

    var axisTick = [...Array(11)].map((e, i) => i * 10);

      this.center = center;
    return {
      center,

      years: entries(alData).reduce((prev, [year, { average, total, max, data }]) => {
        return {
          ...prev,
          [year]: {
            average: {
              men: {
                y: inner.bottom - average.men * CONSTANT.BAR_HEIGHT,
                text: average.men
              },
              women: {
                y: inner.bottom - average.women * CONSTANT.BAR_HEIGHT,
                text: average.women
              },
            },
            generations: gens
              .filter(e => {
                return true;
              })
              .map(e => {
                return {
                  x: center,
                  y: chartHeight - (year - e.from) * CONSTANT.BAR_HEIGHT,
                  text: e.name,
                };
              }),
            maxCount: this._maxCount._maxCount,
            divCount: this._maxCount.divide,
            xAxis: {
              tickL: [...Array(this._maxCount.divide + 1)].map((e, i) => {
                var x = menX - xALEach * i;
                var y = inner.bottom;
                return {
                  tick: ['M' + x + ' ' + y, 'L' + x + ' ' + (y + 5)].join(' '),
                  text: {
                    x,
                    y: y + 35,
                    text: xEachCnt * i + 'K',
                  },
                };
              }),
              tickR: [...Array(this._maxCount.divide + 1)].map((e, i) => {
                var x = womenX + xALEach * i;
                var y = inner.bottom;
                return {
                  tick: ['M' + x + ' ' + y, 'L' + x + ' ' + (y + 5)].join(' '),
                  text: {
                    x,
                    y: y + 35,
                    text: xEachCnt * i + 'K',
                  },
                };
              }),
            },
            label: {
              yAxis1: {
                x: inner.left - 20,
                y: inner.bottom - 108 * CONSTANT.BAR_HEIGHT,
                
                text: '나이',
              },
              yAxis2: {
                x: inner.right + 17,
                y: inner.bottom - 108 * CONSTANT.BAR_HEIGHT,
                
                text: '출생년도',
              },
            },
            yAxis1: axisTick.map(e => {
              return {
                x: inner.left - 20,
                y: inner.bottom - e * CONSTANT.BAR_HEIGHT,
                tick: {
                  d: ['M', inner.left, inner.bottom - e * CONSTANT.BAR_HEIGHT, 'L', inner.left - 5, inner.bottom - e * CONSTANT.BAR_HEIGHT].join(
                    ' ',
                  ),
                },
                text: e,
              };
            }),
            yAxis2: axisTick.map(e => {
              return {
                tick: {
                  d: ['M', inner.right, inner.bottom - e * CONSTANT.BAR_HEIGHT, 'L', inner.right + 5, inner.bottom - e * CONSTANT.BAR_HEIGHT].join(
                    ' ',
                  ),
                },
                x: inner.right + 20,
                y: inner.bottom - e * CONSTANT.BAR_HEIGHT,
                text: year - e,
              };
            }),
            total: {
              ...total,
              menChars: numberWithCommas(total.men).split(''),
              womenChars: numberWithCommas(total.women).split(''),
              allChars: [...(total.all / 1000000).toFixed(1).split(''), 'M'],
            },
            women: data
              .map(({ age, women }) => {
                return {
                  age,
                  d: [
                    'M ' + womenX + ' ' + (chartHeight - age * CONSTANT.BAR_HEIGHT),
                    'L ' + (womenX + women * widthWeight) + ' ' + (chartHeight - age * CONSTANT.BAR_HEIGHT),
                    'L ' + (womenX + women * widthWeight) + ' ' + (chartHeight - (age + 1) * CONSTANT.BAR_HEIGHT + gap),
                    'L ' + womenX + ' ' + (chartHeight - (age + 1) * CONSTANT.BAR_HEIGHT + gap),
                  ].join(' '),
                };
              }),

            men: data
              .map(({ age, men }) => {
                return {
                  age,
                  d: [
                    'M ' + menX + ' ' + (chartHeight - age * CONSTANT.BAR_HEIGHT),
                    'L ' + (menX - men * widthWeight) + ' ' + (chartHeight - age * CONSTANT.BAR_HEIGHT),
                    'L ' + (menX - men * widthWeight) + ' ' + (chartHeight - (age + 1) * CONSTANT.BAR_HEIGHT + gap),
                    'L ' + menX + ' ' + (chartHeight - (age + 1) * CONSTANT.BAR_HEIGHT + gap),
                  ].join(' '),
                };
              })

          },
        };
      }, {}),
    };
  });

  update = years => {

    var censusData = this.censusData(null, null);
    var data = censusData.years[years];

    this.setState({
      year: years,
      d: data.men,
      d2: data.women,
      ...data,
    });
  };

  ticked = () => {
    var from = 1960;
    
    var to = 2065;
    
    let delay = 100;
    if (this.curr > to) {
      this.curr = from;
      
    }
    if (this.curr === to) {
      delay = 2000;
    }

    this.update(this.curr);
    this.curr++;
    clearTimeout(this.timerId);

  };

  componentDidMount() {
    this.ticked();
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {

    const { d, d2, total, year, xAxis, average, yAxis1, yAxis2, generations, label } = this.state;
    const { maxCount, _maxCount } = this;

    return template.call(this, {
      // variables
      average,
      d,
      d2,
      generations,
      imgSrc,
      inner,
      label,
      paths,
      total,
      viewBox,
      width: CONSTANT.WIDTH,
      xAxis,
      yAxis1,
      yAxis2,
      unused_year: year,
      yearChars: (year || '').toString().split(''),
      // components
      Fragment,
    });
  }
}

export default Pyramid;
