import React, { Fragment, PureComponent } from 'react';
import { css } from 'emotion';
import entries from 'object.entries';
import memoizeOne from 'memoize-one';
import imgSrc from './sample.gif';
import al1 from 'data/population';
import template from './pyramid.component.pug';

const bodyClass = css({
  /* ... */
});

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

var width = 865;
var height = 1000;

const alData = al1.principal;

console.log(alData);

var pad = {
  top: 225,
  left: 80,
  right: 80,
  
};

var tWidth = 865;
var tHeight = 1000;

var barHeight = 6;

var box = {
  top: pad.top,
  left: pad.left,
  right: tWidth - pad.right,
  bottom: pad.top + barHeight * 100,
};

let paths = {
  yAxis1: [

    [box.left, box.top],
    [box.left, box.bottom],
  ],
  yAxis2: [

    [box.right, box.top],
    [box.right, box.bottom],
  ],
  xAxis1: [

    [box.left, box.top],
    [box.right, box.top],
  ],
  xAxis2: [

    [box.left, box.bottom],
    [box.right, box.bottom],
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
    name: '베이비붐 세대',
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
    let chartHeight = height;
    var centerBoxW = 180;
    
    let center = width / 2;

    var barHeight = Math.ceil(chartHeight / 101) - 1;

    barHeight = 6;
    chartHeight = chartHeight - 175;
    if (barHeight - gap < 3) {
      gap = barHeight - 3;
    }

    const maxCount = Math.max(
      ...entries(alData).reduce((prev, [, { max }]) => {
        return [...prev, max.men, max.women];
      }, []),
    );

    const maxTotalCount = Math.max(
      ...entries(alData).reduce((prev, [, { total }]) => {
        return [...prev, total.men, total.women];
      }, []),
    );

    // console.log(numberWithCommas(maxTotalCount));

    this.maxCount = maxCount;

    this._maxCount = getValue(maxCount);

    center = tWidth / 2;
    var halfW = center - box.left - centerBoxW / 2;

    var widthWeight = halfW / this._maxCount._maxCount;

    var womenX = center + centerBoxW / 2;
    var menX = center - centerBoxW / 2;

    var xALW = menX - box.left;
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
                y: box.bottom - average.men * barHeight,
                text: average.men
              },
              women: {
                y: box.bottom - average.women * barHeight,
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
                  y: chartHeight - (year - e.from) * barHeight,
                  text: e.name,
                };
              }),
            maxCount: this._maxCount._maxCount,
            divCount: this._maxCount.divide,
            xAxis: {
              tickL: [...Array(this._maxCount.divide + 1)].map((e, i) => {
                var x = menX - xALEach * i;
                var y = box.bottom;
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
                var y = box.bottom;
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
                x: box.left - 20,
                y: box.bottom - 108 * barHeight,
                text: 'AGE',
              },
              yAxis2: {
                x: box.right + 17,
                y: box.bottom - 108 * barHeight,
                text: 'BORN',
              },
            },
            yAxis1: axisTick.map(e => {
              return {
                x: box.left - 20,
                y: box.bottom - e * barHeight,
                tick: {
                  d: ['M', box.left, box.bottom - e * barHeight, 'L', box.left - 5, box.bottom - e * barHeight].join(
                    ' ',
                  ),
                },
                text: e,
              };
            }),
            yAxis2: axisTick.map(e => {
              return {
                tick: {
                  d: ['M', box.right, box.bottom - e * barHeight, 'L', box.right + 5, box.bottom - e * barHeight].join(
                    ' ',
                  ),
                },
                x: box.right + 20,
                y: box.bottom - e * barHeight,
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
                    'M ' + womenX + ' ' + (chartHeight - age * barHeight),
                    'L ' + (womenX + women * widthWeight) + ' ' + (chartHeight - age * barHeight),
                    'L ' + (womenX + women * widthWeight) + ' ' + (chartHeight - (age + 1) * barHeight + gap),
                    'L ' + womenX + ' ' + (chartHeight - (age + 1) * barHeight + gap),
                  ].join(' '),
                };
              }),

            men: data
              .map(({ age, men }) => {
                return {
                  age,
                  d: [
                    'M ' + menX + ' ' + (chartHeight - age * barHeight),
                    'L ' + (menX - men * widthWeight) + ' ' + (chartHeight - age * barHeight),
                    'L ' + (menX - men * widthWeight) + ' ' + (chartHeight - (age + 1) * barHeight + gap),
                    'L ' + menX + ' ' + (chartHeight - (age + 1) * barHeight + gap),
                  ].join(' '),
                };
              })

          },
        };
      }, {}),
    };
  });

  update = years => {

    var censusData = this.censusData(width, height);
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
      
      unused__maxCount: _maxCount,
      average,
      box,
      d,
      d2,
      generations,
      height,
      unused_imgSrc: imgSrc,
      label,
      unused_maxCount: maxCount,
      paths,
      total,
      width,
      xAxis,
      yAxis1,
      yAxis2,
      unused_year: year,
      yearChars: (year || '').toString().split(''),
      
      Fragment,
    });
  }
}

Pyramid.propTypes = {
  
};

export default Pyramid;
