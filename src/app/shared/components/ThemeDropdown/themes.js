import { css } from 'emotion';
import brownBg from 'media/brown-bg.jpg';
import beigeBg from 'media/beige-bg.jpg';

const defined = [
  {
    name: 'theme1',
    color: '#343a40',
    background: 'yellow',
    className: css({
      // background: '#343a40',
      // backgroundImage: 'url(' + brownBg + ')',
      // color: '#fff'
    })
  },
  {
    name: 'theme2',
    color: '#eee',
    background: 'blue',
    className: css({
      background: '#343a40',
      // backgroundImage: 'url(' + brownBg + ')',
      color: '#fff'
    })
  },
  {
    name: 'theme3',
    color: '#ede0cd',
    background: 'cyan',
    // background: brownBg,
    className: css({
      backgroundImage: 'url(' + brownBg + ')',
      color: '#fff'
    })
  },
  {
    name: 'theme4',
    color: '#3d5741',
    background: 'silver',
    className: css({
      background: '#ffeb3b'
      // backgroundImage: 'url(' + beigeBg + ')'
    })
  },
];

const rotates = [90, 0, -180, -90];

const themes = defined.map((e, i) => {
  return {

    rotate: rotates[i],
    className: css({
      background: e.color,
    }),
    ...e,
  };
});

export default themes;
