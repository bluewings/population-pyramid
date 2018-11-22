/* eslint-disable no-unused-vars */
import { useMemo, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { getIn } from 'immutable';
import memoize from 'memoize-one';
import ThemeDropdown from 'components/ThemeDropdown';
import flagKor from 'media/flag-kor.png';

// jsx, styles
import template from './header.component.pug';

// class Header extends PureComponent {
//   fixed = memoize((fixed) => {
//     if (!fixed) {
//       return null;  
//     }
//     return fixed === 'bottom' ? 'fixed-bottom' : 'fixed-top';
//   })

//   render() {
//     const fixed = this.fixed(this.props.fixed);

//     return template({
//     });
//   }
// }

function Header ({ fixed, theme = '' }) {

  const fixedClass = useMemo(() => {
    if (!fixed) {
      return null;  
    }
    return fixed === 'bottom' ? 'fixed-bottom' : 'fixed-top';
  }, [fixed])

  const navbarClass = useMemo(() => {

    if (theme.search(/dark/) !== -1) {
      return ['navbar-dark', theme];
    }
    return ['navbar-dark',  'bg-dark', theme];

    // navbar-dark.bg-dark

  }, [theme])
  return template({
    // variables
    unused_fixedClass: fixedClass,
    unused_flagKor: flagKor,
    navbarClass,
    unused_theme: theme,
    // components
    Fragment,
    unused_Link: Link,
    ThemeDropdown,
  }); 
}

Header.propTypes = {
  fixed: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top', 'bottom']),
  ]),
};

Header.defaultProps = {
  fixed: false,
};

const mapStateToProps = state => {
  return {
    theme: getIn(state,['theme', 'customize', 'theme'])
  }
};

const mapDispatchToProps = dispatch => ({ });

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Header);
