import { useRef, useMemo, useEffect } from 'react';
import { getIn } from 'immutable';
import { connect } from 'react-redux';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getAttrFromClosest } from 'helpers/util';
import { actions, getStorePaths } from './store';
import themes from './themes';

// jsx, styles
import template from './theme-dropdown.component.pug';

function getSelected(prevRotate = 0, nextRotate, duration = 0.35) {
  let delta = (nextRotate - prevRotate) % 360;
  if (delta > 180) {
    delta -= 360;
  } else if (delta <= -180) {
    delta += 360;
  }
  delta %= 360;
  const rotate = prevRotate + delta;  
  const transform1 = `rotate(${rotate}deg)`;
  const transform2 = `rotate(${-rotate}deg)`;
  const transitionDuration = `${Math.abs(delta) > 90 ? duration * 2 : duration}s`;
  return { 
    rotate, 
    spinnerStyle: { transform: transform1, transitionDuration },
    chooserStyle: { transform: transform2, transitionDuration },
  };
}

function ThemeDropdown({ theme, setTheme }) {
  const rotateRef = useRef();

  const selected = useMemo(() => {
    const selected = themes.find(({ name }) => name === theme) || themes[0];
    const { rotate, spinnerStyle, chooserStyle } = getSelected(rotateRef.current, selected.rotate);
    rotateRef.current = rotate;
    return { spinnerStyle, chooserStyle, className: selected.className };
  }, [theme]);

  const handleChooserClick = (event) => {
    event.stopPropagation();
    setTheme(getAttrFromClosest(event.target, 'data-theme-name'));
  };

  useEffect(() => {
    document.body.classList.add(selected.className);
    return () => {
      document.body.classList.remove(selected.className);
    };
  }, [selected.className]);

  return template({
    // variables
    handleChooserClick,
    selected,
    theme,
    themes,
    // components
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
  });
}

let storePaths = null;

const mapStateToProps = (state) => {
  storePaths = storePaths || getStorePaths(state);
  return {
    theme: getIn(state, [...storePaths, 'theme'], ''),
  };
};

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(actions.setTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeDropdown);
